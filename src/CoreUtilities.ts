import * as _ from "lodash";
import * as $ from "jquery";

export type FindParentElementConditionsType = {
    tagName?: string,
    customEvaluationHandler?: (element: HTMLElement) => boolean,
};

export type FindParentElementOptionsType = {
    successibleConditions: FindParentElementConditionsType,
    cancellableConditions?: FindParentElementConditionsType,
    verbose?: boolean
};

export type GetObjValByPathTravelType = {
    /** 
     * The path by string or array. The array gets filtered for truthy values.
     */
    path: string | string[];
    /** 
     * If a path part does not exist, the path will be auto-created. 
     * @default true
    */
    autoPath?: boolean,
    /**
     * If a path part is not an object, it will be replaced by an object.
     * @default false
     */
    forcePath?: boolean;
};

export type SetObjValByPathTravelType = {
    /** 
     * Replace the value. Only relevant if you pass an value. 
     * @default true
     */
    overwriteValue?: boolean;
} & GetObjValByPathTravelType;

export type SetObjValByPathReturnType<T> = {
    rootObj: {}
    lastObj: {}
    value?: T;
}

export class CoreUtilities {
    private constructor() { }

    /**
     * The request timeout is not valid if the type is not integer or has the value 0.
     */
    public static isRequestTimeoutValid(timeout: any) {
        return _.isInteger(timeout) && timeout !== 0;
    }

    /**
     * Outputs for example "#name".
     * @param id For example "name".
     */
    public static ensureHashIdFormat(id: string) {
        if (id.length > 0 && id.charAt(0) !== "#")
            id = "#" + id;

        return id;
    }

    /**
     * Waits synchronously.
     * @param ms milliseconds
     */
    public static Wait(ms: number) {
        let start = Date.now(),
            now = start;

        while (now - start < ms) {
            now = Date.now();
        }
    }

    public static findParentElement(subElement: HTMLElement, options: FindParentElementOptionsType): HTMLElement | null {
        const successibleConditions = options.successibleConditions;

        if (!("tagName" in successibleConditions) && !("customEvaluationHandler" in successibleConditions))
            throw new Error("At least a tag name or a pass-if-condition-handler have to be defined.");

        let element: HTMLElement | null = subElement;

        // When calling this method, it is ensured that the element is not null.
        const hasTruthyCondition = (element: HTMLElement, conditions: FindParentElementConditionsType) => {
            if (typeof conditions.tagName !== "undefined" && conditions.tagName.toLowerCase() === element.tagName.toLowerCase())
                return true;
            else if (typeof conditions.customEvaluationHandler !== "undefined" && conditions.customEvaluationHandler(element))
                return true;
            else
                return false;
        }

        const verbose = typeof options.verbose !== "undefined" && options.verbose;
        let depth: number = 0;

        while (element && !hasTruthyCondition(element, successibleConditions)) {
            element = element!.parentElement;

            if (verbose)
                depth++;

            if (!element) {
                break;
            } else if (typeof options.cancellableConditions !== "undefined" && hasTruthyCondition(element, options.cancellableConditions)) {
                element = null;
            }
        }

        if (verbose) {
            if (element)
                console.log("The parent has been successfully found.", element);
            else
                console.log("No parent element has been found. A depth of " + depth + " has been reached.");
        }

        return element;
    }

    public static isStatusCode2XX = function (status: number): boolean {
        return status >= 200 && status < 300;
    };

    public static getOnlyObject(rootObj: {}, travelObj: GetObjValByPathTravelType | string | string[]) {
        return this.getObject(rootObj, travelObj).value;
    }

    public static getObject(rootObj: {}, travelObj: GetObjValByPathTravelType | string | string[]) {
        return this.modifyObject(rootObj, travelObj);
    };

    public static setOnlyObject<T>(rootObj: {}, travelObj: SetObjValByPathTravelType | string | string[], value: T): T | undefined {
        return this.modifyObject(rootObj, travelObj, value).value;
    }

    public static modifyObject<T>(rootObj: {}, travelObj: SetObjValByPathTravelType | string | string[], value?: T): SetObjValByPathReturnType<T> {
        if (Array.isArray(travelObj) || typeof travelObj === "string") {
            travelObj = {
                path: travelObj
            } as SetObjValByPathTravelType
        }

        travelObj = {
            autoPath: true,
            forcePath: false,
            overwriteValue: true,
            ...travelObj
        } as SetObjValByPathTravelType;

        const buildOnlyPath = arguments.length == 2;
        // parts of path
        const parts = this.getPathParts(travelObj.path);
        let lastObj: any = rootObj;
        var buildLastOnlyPathPart = false;
        var returnValue = undefined;

        const setLastObjectValue = (part: string | null, value: any = {}, isReturnValue?: boolean) => {
            if (part)
                lastObj[part] = value;

            if (isReturnValue || buildLastOnlyPathPart)
                returnValue = value;
            else
                lastObj = value;
        }

        for (let index = 0, max = parts.length - 1; index <= max; index++) {
            const part = parts[index];

            // smaller than max because the last part is used for value assignment
            if (index < max || (buildLastOnlyPathPart = (buildOnlyPath && index <= max))) {
                const doesPathPartExist = part in lastObj;

                if (!doesPathPartExist || travelObj.forcePath) {
                    if (travelObj.autoPath)
                        setLastObjectValue(part);
                    else
                        break;
                } else {
                    const _lastObj = lastObj[part];

                    if (typeof _lastObj !== "object") {
                        if (travelObj.forcePath)
                            setLastObjectValue(part);
                        else
                            break;
                    } else
                        setLastObjectValue(null, _lastObj);
                }
            } else if (part in lastObj ? travelObj.overwriteValue : true)
                setLastObjectValue(part, value, true);
            else if (!travelObj.overwriteValue)
                setLastObjectValue(null, lastObj[part], true);
        }

        return {
            rootObj: rootObj,
            lastObj: lastObj,
            value: returnValue
        } as SetObjValByPathReturnType<T>;
    }

    public static getPathParts(path?: string | string[]): string[] {
        if (typeof path === "undefined")
            return [];
        if (typeof path === "string")
            return path.split(".");
        else
            return path.filter((part) => typeof part === "string" && part !== "");
    }

    /**
     * This function adds the ability to change its content via input and vice versa
     * @param target The element that will be toggled.
     * @param nameChangedCallback 
     * @param keydown 
     * @param focusout 
     */
    public static ToggleContentEditabilityOfElement(target: HTMLElement, nameChangedCallback: (newName: string, setTdText: (text?: string) => void) => boolean, keydown: JQuery.EventHandler<HTMLElement>, focusout: JQuery.EventHandler<HTMLElement>) {
        var $target = $(target);

        const _toggleContentEditabilityOfElement = () => {
            this.ToggleContentEditabilityOfElement(target, nameChangedCallback, keydown, focusout);
        }

        keydown = keydown || function (e) {
            if (e.keyCode === 13) { // enter
                e.preventDefault();
                _toggleContentEditabilityOfElement();
            }
        } as JQuery.EventHandler<HTMLElement>;

        focusout = focusout || function (e) {
            e.preventDefault();
            target.textContent = oldText;
            _toggleContentEditabilityOfElement();
        } as JQuery.EventHandler<HTMLElement>;

        if (target.dataset.view !== "rw") {
            target.dataset.view = "rw";
            var oldText = $target.text();

            $target
                .data("old-name", oldText)
                .attr("contenteditable", "true")
                .on("keydown", keydown)
                .on("focusout", focusout)
        } else if (target.dataset.view === "rw") {
            var oldText: string = $target.data("old-name");
            var newText = $target.text();

            var setTdText = (text: string) => {
                target.dataset.view = "ro";
                $target
                    .off("keydown", keydown)
                    .off("focusout", focusout)
                    .attr("contenteditable", "false")
                    .text(text);
            }

            if (oldText !== newText) {
                nameChangedCallback(newText, function (text?: string) {
                    setTdText(text || newText);
                });
            } else
                setTdText(oldText);
        }
    }
}