import { SingleEvent } from "@teronis-js/event-dispatcher";

/**
 * This class can intercept the execution of passed functions. When you pass a function, you get a proxy
 * function in return that intercepts the execution of the function you passed in the first place.
 */
export class HandlerMerger {
    private preInterceptionEvent: SingleEvent;
    private postInterceptionEvent: SingleEvent;
    private triggerAtLimit?: number;
    private attachedHandlers: string[];
    private counter: number;

    /**
     * 
     * @param triggerAtLimit A predetermined length of proxy calls that must proceed to trigger the interception events.
     */
    public constructor(triggerAtLimit?: number) {
        this.preInterceptionEvent = new SingleEvent();
        this.postInterceptionEvent = new SingleEvent();
        this.triggerAtLimit = triggerAtLimit;
        this.attachedHandlers = [];
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

        if (name in this.attachedHandlers) {
            this.attachedHandlers[name].revocable.revoke();
            delete this.attachedHandlers[name];
        }

        const proxyHandler = this._mergeWith(handler, name);
        return proxyHandler;
    }

    private getFunctionName(handler: Function, name?: string): string {
        // the name of handler is by default === ""
        name || handler.name;

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

        if (typeof this.attachedHandlers[name] !== "undefined")
            throw "ArgumentException: @name exists already.";

        this.attachedHandlers[name] = {
            handler: handler
        };

        const proxyHandler = {
            get(target, propName) {
                return function (this: HandlerMerger, ...args) {
                    var handler = target[propName];
                    this.attachedHandlers[name].name = name;
                    this.attachedHandlers[name].arguments = args;
                    this.counter++;
                    const fireInterceptionCallbacks = this.getCanTriggerInterceptionEvents();

                    if (fireInterceptionCallbacks)
                        this.preInterceptionEvent.Invoke(args);

                    this.attachedHandlers[name].result = handler(...args)

                    if (fireInterceptionCallbacks)
                        this.postInterceptionEvent.Invoke(args);

                    return this.attachedHandlers[name].result;
                }.bind(this);
            }
        }

        // wrap handler up with proxy
        const revocable = Proxy.revocable({
            handler: handler
        }, proxyHandler);

        this.attachedHandlers[name].revocable = revocable
        // return proxy handler
        return revocable.proxy.handler;
    }

    private getCanTriggerInterceptionEvents(): boolean {
        if (this.triggerAtLimit == null)
            return this.counter === Object.keys(this.attachedHandlers).length;
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