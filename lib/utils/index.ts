// lib/utils/index.ts
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import clsx, { type ClassValue } from "clsx";
import pLimit from "p-limit";
import { twMerge } from "tailwind-merge";

type SchedulerLike = {
  yield?: () => Promise<void>;
};

/**
 * 合并 className，并处理 Tailwind 类冲突。
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * 格式化字节大小为人类可读格式。
 */
export function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
}

/**
 * 将日期字符串格式化为中文日期。
 */
export const formatDateZN = (dateStr: string): string => {
  try {
    return format(new Date(dateStr), "yyyy年MM月dd日", { locale: zhCN });
  } catch {
    return dateStr;
  }
};

/**
 * 异步重试工具。
 */
export async function retry<T>(
  fn: () => Promise<T>,
  times = 2,
  delay = 500
): Promise<T> {
  let error: unknown;
  for (let i = 0; i <= times; i++) {
    try {
      return await fn();
    } catch (e) {
      error = e;
      if (i < times) {
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }
  throw error;
}

/**
 * 并发 I/O 处理器。
 */
export async function processBatchIO<T>(
  items: T[],
  worker: (item: T, index: number) => Promise<void>,
  onProgress?: (done: number, total: number) => void,
  concurrency = 6
): Promise<void> {
  const total = items.length;
  if (!total) return;
  const limit = pLimit(concurrency);
  let done = 0;

  await Promise.all(
    items.map((item, index) =>
      limit(async () => {
        await worker(item, index);
        onProgress?.(++done, total);
      })
    )
  );
}

/**
 * 让出主线程，不受后台标签页 rAF 节流影响。
 */
const yieldToMain = (): Promise<void> => {
  const scheduler = (
    globalThis as typeof globalThis & {
      scheduler?: SchedulerLike;
    }
  ).scheduler;

  if (typeof scheduler?.yield === "function") {
    return scheduler.yield();
  }

  return new Promise<void>((resolve) => {
    const channel = new MessageChannel();
    channel.port1.onmessage = () => resolve();
    channel.port2.postMessage(null);
  });
};

/**
 * 节流函数。
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let lastCall = 0;
  return function (this: unknown, ...args: Parameters<T>) {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      fn.apply(this, args);
    }
  };
}

/**
 * CPU 密集型分帧处理器。
 */
export async function processBatchCPU<T>(
  items: T[],
  worker: (item: T, index: number) => void | Promise<void>,
  onProgress?: (done: number, total: number) => void,
  slice = 50
): Promise<void> {
  const total = items.length;
  if (!total) return;
  let done = 0;

  for (let i = 0; i < total; i += slice) {
    const chunk = items.slice(i, i + slice);
    for (const [idx, item] of chunk.entries()) {
      await worker(item, i + idx);
    }
    done += chunk.length;
    onProgress?.(done, total);
    await yieldToMain();
  }
}

/**
 * 在新标签页打开外部链接。
 */
export function openExternalLink(url: string): void {
  window.open(url, "_blank", "noopener,noreferrer");
}
