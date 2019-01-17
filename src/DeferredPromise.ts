export interface IDeferredPromise<T = any> {
    promise: Promise<T>;
    resolve: (value: T) => void;
    reject: (value: any) => void;
}

export function createDeferredPromise<T = any>(): IDeferredPromise<T> {
    let resolve: ((value: T) => void) | undefined;
    let reject: ((value: any) => void) | undefined;

    const promise = new Promise<T>((rs, rj) => {
        resolve = rs;
        reject = rj;
    });

    return {
        promise,
        resolve: resolve!,
        reject: reject!
    };
}