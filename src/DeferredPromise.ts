export interface IDeferredPromise<T = any> {
    promise: Promise<T>;
    resolve: (value: T) => void;
    reject: (value: any) => void;
}

export class DeferredPromise<T> {
    public promise: Promise<T>;
    public resolve: ((value: T) => void) | undefined;
    public reject: ((value: any) => void) | undefined;

    constructor() {
        this.promise = new Promise<T>((rs, rj) => {
            this.resolve = rs;
            this.reject = rj;
        });
    }
}