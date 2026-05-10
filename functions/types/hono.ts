export interface KVNamespace {
  get(key: string, options?: any): Promise<any>;
  put(key: string, value: any, options?: any): Promise<void>;
  delete(key: string): Promise<void>;
  list(options?: any): Promise<any>;
  getWithMetadata<T = unknown>(
    key: string
  ): Promise<{ value: any; metadata: T }>;
}

export interface D1Database {
  prepare(query: string): D1PreparedStatement;
}

export interface D1PreparedStatement {
  first<T = unknown>(): Promise<T | null>;
}

export interface Fetcher {
  fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
}

export interface DurableObjectId {
  toString(): string;
}

export interface DurableObjectStub {
  fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
}

export interface DurableObjectNamespace {
  idFromName(name: string): DurableObjectId;
  get(id: DurableObjectId): DurableObjectStub;
}

// 可以自己拓展 R2Bucket、D1、Durable Object 等绑定。

export type Env = {
  your_kv: KVNamespace; // TODO: 替换为自己的KVNamespace， 或者删除
  your_db: D1Database; // TODO: 替换为自己的D1Database， 或者删除
  ASSETS: Fetcher;
  your_do: DurableObjectNamespace; // TODO: 替换为自己的DurableObjectNamespace，或者删除
  PASSWORD?: string;
};
