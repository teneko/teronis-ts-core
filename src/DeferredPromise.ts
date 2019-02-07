export class DeferredPromise<T = any> {
    public promise: Promise<T>;
    // @ts-ignore It will be initialized while constructering
    public resolve: ((value: T) => void);
    // @ts-ignore It will be initialized while constructering
    public reject: ((value: any) => void);

    constructor() {
        this.promise = new Promise<T>((rs, rj) => {
            this.resolve = rs;
            this.reject = rj;
        });
    }
}