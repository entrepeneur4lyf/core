import { RPCProxyBase } from './base';

const defaultReservedWordSet = new Set(['then']);

export class ProxyClient<T extends RPCProxyBase<any, any>> {
  protected original: T;
  protected proxied: any;
  protected reservedWordSet: Set<string>;

  constructor(original: T, reservedWords?: string[]) {
    this.original = original;
    this.reservedWordSet = new Set(reservedWords) || defaultReservedWordSet;
    const proxy = original.getRPCInvokeProxy();

    this.proxied = new Proxy(
      {},
      {
        get: (target, prop: string | symbol) => {
          if (this.reservedWordSet.has(prop as string) || typeof prop === 'symbol') {
            return Promise.resolve();
          } else {
            return proxy[prop];
          }
        },
      },
    );
  }

  public getOriginal(): T {
    return this.original;
  }

  public getProxied<K extends object>(): K {
    return this.proxied;
  }
}
