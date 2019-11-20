import { ArgtiveEvent } from "@teronis/ts-event-dispatcher";

interface IHandlerProxy {
    handler: Function;
}

interface IHandlerNameRevocablePair {
    [handlerName: string]: {
        proxy: IHandlerProxy;
        revoke: () => void;
    };
}

/**
 * This class can intercept the execution of passed functions. When you pass a function, you get a proxy
 * function in return that intercepts the execution of the function you passed in the first place.
 */
export class HandlerMerger {
    private preInterceptionEvent: ArgtiveEvent;
    private postInterceptionEvent: ArgtiveEvent;
    private triggerAtLimit?: number;
    private proxies: IHandlerNameRevocablePair;
    private counter: number;

    /**
     * 
     * @param triggerAtLimit A predetermined length of proxy calls that must proceed to trigger the interception events.
     */
    public constructor(triggerAtLimit?: number) {
        this.preInterceptionEvent = new ArgtiveEvent();
        this.postInterceptionEvent = new ArgtiveEvent();
        this.triggerAtLimit = triggerAtLimit;
        this.proxies = {} as IHandlerNameRevocablePair;
        this.counter = 0;
    }

    // getter

    public getPreInterceptionEvent() {
        return this.preInterceptionEvent;
    }

    public getPostInterceptionEvent() {
        return this.postInterceptionEvent;
    }

    /**
     * Get the amount of proxy function calls that has been done so far.
     */
    public getCounter(): number {
        return this.counter;
    }

    /**
     * 
     * @param handler It can only be anonymous, if you pass a name, otherwise an exception will be thrown.
     * @param name When a name is passed, it will be preferred over the name of the passed handler.
     */
    private _mergeWith(handler: Function, name: string = ""): Function {
        if (!handler)
            throw "ArgumentException: @handler can not be null.";

        if (typeof this.proxies[name] !== "undefined")
            throw "ArgumentException: @name exists already.";

        // // provide 'this' as variable so that the user can bind 'this' on his own.
        // const self = this;

        const proxyHandler: ProxyHandler<IHandlerProxy> = {
            get: (target, property, receiver) => {
                return function (this: HandlerMerger, ...args: any[]) {
                    this.counter++;
                    const shouldIntercept = this.getCanTriggerInterceptionEvents();

                    if (shouldIntercept)
                        this.preInterceptionEvent.invoke(args);

                    const result = handler(...args);

                    if (shouldIntercept)
                        this.postInterceptionEvent.invoke(args);

                    return result;
                }.bind(this);
            }
        };

        // wrap handler up with proxy
        const revocable = Proxy.revocable({
            handler: handler
        } as IHandlerProxy, proxyHandler);

        this.proxies[name] = revocable

        // Return a wrapper function that points to the proxy function,
        // so that the original function gets called without being intercepted,
        // when the proxy got revoked.
        return function (...args: any[]) {
            revocable.proxy.handler(...args);
        };
    }

    private getFunctionName(handler: Function, name?: string): string {
        // the name of handler is by default === ""
        name = name || handler.name;

        if (!name)
            throw "ArgumentException: @name can not be empty.";

        return name;
    }

    /**
     * 
     * @param handler It can only be anonymous, if you pass a name, otherwise an exception will be thrown.
     * @param name When it is passed, it will be preferred over the name of the passed handler.
     */
    public mergeWith(handler: Function, name?: string) {
        name = this.getFunctionName(handler, name);
        const proxyHandler = this._mergeWith(handler, name);
        return proxyHandler;
    }

    /**
     * The function that has been added previously can be replaced by this method.
     * @param handler It can only be anonymous, if you pass a name, otherwise an exception will be thrown.
     * @param name When it is passed, it will be preferred over the name of the passed handler.
     */
    public replaceMerge(handler: Function, name?: string) {
        name = this.getFunctionName(handler, name);

        if (name in this.proxies) {
            this.proxies[name].revoke();
            delete this.proxies[name];
        }

        const proxyHandler = this._mergeWith(handler, name);
        return proxyHandler;
    }

    private getCanTriggerInterceptionEvents(): boolean {
        if (this.triggerAtLimit == null)
            return this.counter === Object.keys(this.proxies).length;
        else
            return this.counter === this.triggerAtLimit;
    }

    /**
     * If a proxy functions gets called, the counter will be increased.
     * With this function you can simply reset the counter to zero.
     */
    public resetCounter() {
        this.counter = 0;
    }
}