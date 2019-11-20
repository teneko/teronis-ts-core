
export interface IDeferredPromise<T = any> {
    promise: Promise<T>;
    resolve: (value: T) => void;
    reject: (value: any) => void;
}

export class DeferredPromise<T = any> implements IDeferredPromise<T> {
    public promise: Promise<T>;
    // @ts-ignore It will be initialized while constructing
    public resolve: ((value: T) => void);
    // @ts-ignore It will be initialized while constructing
    public reject: ((value: any) => void);

    constructor() {
        this.promise = new Promise<T>((rs, rj) => {
            this.resolve = rs;
            this.reject = rj;
        });
    }
}