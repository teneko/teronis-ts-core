import { assert } from "chai";
import { JSDOM } from "jsdom";
import { CoreUtilities } from "../dist/teronis-ts-core";

describe("CoreUtilities", () => {
    describe("#findParentElement()", () => {
        const jsdom = new JSDOM(`<div id="graph-section-template" name="container" style="display:none;">
        <h5 id="graph-section-name" class="subhead">A Headline Text</h5>
        <div id="graph-section-anchor-end" name="anchor" style="display:none;"></div>
        </div>`);

        const { window } = jsdom;
        const { document } = window;

        const dataGraphSectionTemplateElement = document.getElementById("graph-section-template")!;
        const dataGraphSectionNameElement = document.getElementById("graph-section-name")!;
        const dataGraphSectionAnchorEndElement = document.getElementById("graph-section-anchor-end")!;

        it("element should be found by tag name", () => {
            const element = CoreUtilities.findParentElement(dataGraphSectionNameElement, {
                successibleConditions: {
                    tagName: "div"
                },
                verbose: true
            })!;

            assert.instanceOf(element, HTMLElement, "valid element was expected");
            assert.strictEqual(element.getAttribute("name"), dataGraphSectionTemplateElement.getAttribute("name"), "element missmatch");
        });

        it("element should be found by custom evaluation handler", () => {
            const element = CoreUtilities.findParentElement(dataGraphSectionAnchorEndElement, {
                successibleConditions: { customEvaluationHandler: (element) => element.tagName.toLowerCase() === "div" },
                verbose: true
            })!;

            assert.instanceOf(element, HTMLElement, "valid element was expected");
            assert.strictEqual(element.getAttribute("name"), dataGraphSectionAnchorEndElement.getAttribute("name"), "element missmatch");
        });

        it("should throw an error because of no giving conditions", () => {
            assert.throw(() => CoreUtilities.findParentElement(dataGraphSectionNameElement, {
                successibleConditions: {}
            }), Error);
        });
    })

    describe("#modifyObject", () => {
        var rootObj : any = null;

        beforeEach(() => {
            rootObj = {
                a: {
                    b: {
                        c: {},
                        d: "e",
                    }
                },
            };
        });

        it("should be able to pick existing nested objects", () => {
            [
                ["a", "b", "c"],
                "a.b.c"
            ].forEach(element => {
                const result = CoreUtilities.modifyObject(rootObj, element);
                assert.deepStrictEqual(result.rootObj, rootObj, "result.rootObj is not equals to rootObj");
                assert.deepStrictEqual(result.lastObj, rootObj.a.b, "result.lastObj is not equals to rootObj.a.b");
                assert.deepStrictEqual(result.value, rootObj.a.b.c, "result.value is not equals to rootObj.a.b.c");
            });
        });

        it("should be able to set not existing nested values", () => {
            var result = CoreUtilities.modifyObject(rootObj, {
                path: "1.2",
                autoPath: false
            }, {});

            assert.deepStrictEqual(result.rootObj, rootObj, "result.rootObj is not equals to rootObj");
            assert.deepStrictEqual(result.lastObj, rootObj, "result.lastObj is not equals to rootObj");
            assert.isUndefined(result.value, "result.value should be undefined");

            result = CoreUtilities.modifyObject(rootObj, {
                path: "1.2",
                autoPath: true
            }, {});

            assert.deepStrictEqual(result.lastObj, rootObj["1"], "result.lastObj is not equals to rootObj");
            assert.deepStrictEqual(result.value, rootObj["1"]["2"], "result.value should be equals rootObj.1.2");
        });

        it("should be able to force pathes when properties aren't objects", () => {
            const e = {};

            var result = CoreUtilities.modifyObject(rootObj, {
                path: "a.b.d.e",
                forcePath: true,
            }, e);

            assert.deepStrictEqual(result.rootObj, rootObj, "result.rootObj is not equals to rootObj");
            assert.deepStrictEqual(result.value, e, "result.a.b.d.e is not equals to rootObj.a.b.d.e");
            assert.deepStrictEqual(result.lastObj, rootObj.a.b.d, "result.a.b.d is not equals to rootObj.a.b.d");
        });

        it("should not overwrite existing values", () => {
            const f = "f";

            var result = CoreUtilities.modifyObject(rootObj, {
                path: "a.b.d",
                overwriteValue: false,
            }, f);

            assert.deepStrictEqual(result.rootObj, rootObj, "result.rootObj is not equals to rootObj");
            assert.deepStrictEqual(result.value, "e", "result.a.b.d is not equals to rootObj.a.b.d");
            assert.deepStrictEqual(result.lastObj, rootObj.a.b, "result.a.b.d is not equals to rootObj.a.b.d");
        });
    });
});