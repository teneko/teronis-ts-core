function getMessage(message?: string | Error) {
    return typeof message === "string" ? message : (message instanceof Error ? message.message : undefined);
}

export abstract class ExtendableError extends Error {
    public constructor(message?: string | Error) {
        super(getMessage(message));

        Object.defineProperty(this, "name", {
            configurable: true,
            enumerable: false,
            value: this.constructor.name,
            writable: true
        });

        Object.defineProperty(this, "message", {
            configurable: true,
            enumerable: false,
            value: getMessage(message),
            writable: true
        });

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor); // nodejs relevant
        } else {
            Object.defineProperty(this, "stack", {
                configurable: true,
                enumerable: false,
                value: (new Error(this.message)).stack,
                writable: true,
            });
        }
    }
}