import { hc } from "hono/client";
import { API_URL } from "./config";
import { AppType } from "@functions/app";

type AuthClient = {
  auth: {
    login: {
      $post: (args: { json: { password: string } }) => Promise<Response>;
    };
    logout: {
      $post: () => Promise<Response>;
    };
  };
};

/**
 * 包装 fetch，确保请求携带 Cookie，并统一处理未授权跳转。
 */
const customFetch: typeof fetch = async (input, init) => {
  // 确保请求携带 Cookie
  const requestInit: RequestInit = {
    ...init,
    credentials: init?.credentials || "include",
  };

  const res = await fetch(input, requestInit);

  if (res.status === 401) {
    if (
      typeof window !== "undefined" &&
      !window.location.pathname.startsWith("/login")
    ) {
      // 保存当前 URL 作为重定向目标
      const currentUrl = window.location.href;
      const redirectUrl = `/login?redirect=${encodeURIComponent(currentUrl)}`;
      window.location.href = redirectUrl;
    }
  }

  return res;
};

export const client = hc<AppType>(API_URL, {
  fetch: customFetch,
}) as AuthClient;
