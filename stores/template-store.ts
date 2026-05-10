import { create } from "zustand";
import { persist } from "zustand/middleware";
import { StoreKey } from ".";

/**
 * 模板 Store 的状态与操作类型
 */
interface TemplateState {
  /** 示例计数器 */
  count: number;
  /** 示例文本 */
  text: string;
  /** 增加计数 */
  increment: () => void;
  /** 设置文本 */
  setText: (text: string) => void;
  /** 重置所有字段到初始值 */
  reset: () => void;
}

/**
 * 模板 Store。
 * 使用 persist 中间件自动持久化到 localStorage，存储键名来自 StoreKey。
 * 创建新 Store 时复制此文件，替换类型定义与字段即可。
 */
export const useTemplateStore = create<TemplateState>()(
  persist(
    (set) => ({
      count: 0,
      text: "",
      increment: () => set((state) => ({ count: state.count + 1 })),
      setText: (text: string) => set({ text }),
      reset: () => set({ count: 0, text: "" }),
    }),
    {
      name: StoreKey.VibePagesViteData,
    }
  )
);
