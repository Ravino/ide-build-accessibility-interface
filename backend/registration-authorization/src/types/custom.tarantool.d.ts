import { EventEmitter } from "events";

declare namespace TarantoolConnection {
  interface TarantoolOptions {
    host?: string;
    port?: number;
    username?: string;
    password?: string;
    reserveHosts?: string[];
    beforeReserve?: number;
    timeout?: number;
    retryStrategy?: (times: number) => number;
    lazyConnect?: boolean;
  }
}

declare class TarantoolConnection extends EventEmitter {
  constructor(options: TarantoolConnection.TarantoolOptions);


  connect(): Promise<void>;

  flushQueue(cb: (err: Error) => void): void;

  destroy(): void;

  disconnect(reconnect?: boolean): void;


  select(spaceId: number | string,
                indexId: number | string,
                limit: number, offset: number,
                iterator: string, key: any[]): Promise<any>;

  delete(spaceId: number | string,
                indexId: number | string,
                key: any[]): Promise<any>;

  update(spaceId: number | string,
                indexId: number | string,
                key: any[], ops: any[]): Promise<any>;

  upsert(spaceId: number | string,
                ops: any[], tuple: any[]): Promise<any>;

  eval(expression: string, ...args: any[]): Promise<any>;

  call(functionName: string, ...args: any[]): Promise<any>;

  insert(spaceId: number | string, tuple: any[]): Promise<any>;

  replace(spaceId: number | string, tuple: any[]): Promise<any>;

  sql(query: string, bindParams?: any[]): Promise<any>;
}

export = TarantoolConnection;
