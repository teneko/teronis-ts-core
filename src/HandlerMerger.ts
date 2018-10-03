import { SingleEvent } from "@teronis-js/event-dispatcher";

interface IHandlerNameRevocablePair {
    [handlerName: string]: {
        proxy: IHandlerProxy;
        revoke: () => void;
    };
}

interface IHandlerProxy {
    handler: Function;
}

/**
 * This class can intercept the execution of passed functions. When you pass a function, you get a proxy
 * function in return that intercepts the execution of the function you passed in the first place.
 */
export class HandlerMerger {
    private preInterceptionEvent: SingleEvent;
    private postInterceptionEvent: SingleEvent;
    private triggerAtLimit?: number;
    private proxies: IHandlerNameRevocablePair;
    private counter: number;

    /**
     * 
     * @param triggerAtLimit A predetermined length of proxy calls that must proceed to trigger the interception events.
     */
    public constructor(triggerAtLimit?: number) {
        this.preInterceptionEvent = new SingleEvent();
        this.postInterceptionEvent = new SingleEvent();
        this.triggerAtLimit = triggerAtLimit;
        this.proxies = {} as IHandlerNameRevocablePair;
        this.counter = 0;
    }

    // getter

    public getPreInterceptionEvent(): SingleEvent {
        return this.preInterceptionEvent;
    }

    public getPostInterceptionEvent(): SingleEvent {
        return this.postInterceptionEvent;
    }

    /**
     * Get the amount of proxy function calls that has been done so far.
     */
    public getCounter(): number {
        return this.counter;
    }

    // methods

    /**
     * 
     * @param handler It can only be anonymous, if you pass a name, otherwise an exception will be thrown.
     * @param name When it is passed, it will be preferred over the name of the passed handler.
     */
    mergeWith(handler: Function, name?: string): Function {
        name = this.getFunctionName(handler, name);
        const proxyHandler = this._mergeWith(handler, name);
        return proxyHandler;
    }

    /**
     * The function that has been added previously can be replaced by this method.
     * @param handler It can only be anonymous, if you pass a name, otherwise an exception will be thrown.
     * @param name When it is passed, it will be preferred over the name of the passed handler.
     */
    replaceMerge(handler: Function, name?: string): Function {
        name = this.getFunctionName(handler, name);

        if (name in this.proxies) {
            this.proxies[name].revoke();
            delete this.proxies[name];
        }

        const proxyHandler = this._mergeWith(handler, name);
        return proxyHandler;
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
                return function (this: HandlerMerger, ...args) {
                    this.counter++;
                    const fireInterceptionCallbacks = this.getCanTriggerInterceptionEvents();

                    if (fireInterceptionCallbacks)
                        this.preInterceptionEvent.Invoke(args);

                    const result = handler(...args);

                    if (fireInterceptionCallbacks)
                        this.postInterceptionEvent.Invoke(args);

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
        return function (...args) {
            revocable.proxy.handler(...args);
        };
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