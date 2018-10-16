const { assert } = require("chai");
const JSDOM = require("jsdom").JSDOM;
const { CoreUtilities } = require("../dist/teronis-js-core");

describe("CoreUtilities", () => {
    describe("#findParentElement()", () => {
        const jsdom = new JSDOM(`<div data-graph-section-template name="container" style="display:none;">
        <h5 data-graph-section-name class="subhead">A Headline Text</h5>
        <div data-graph-section-anchor-end name="anchor" style="display:none;"></div>
        </div>`);

        const { window } = jsdom;
        const { document } = window;


        global.window = window;
        global.document = document;

        const $ = require("jquery");


        const $dataGraphSectionTemplate = $("[data-graph-section-template]");
        const $dataGraphSectionName = $("[data-graph-section-name]");
        const $dataGraphSectionAnchorEnd = $("[data-graph-section-anchor-end]");

        it("element should be found by tag name", () => {
            const element = CoreUtilities.findParentElement($dataGraphSectionName[0], {
                successibleConditions: {
                    tagName: "div"
                },
                verbose: true
            });

            assert.instanceOf(element, HTMLElement, "valid element was expected");
            assert.strictEqual(element.getAttribute("name"), $dataGraphSectionTemplate.attr("name"), "element missmatch");
        });

        it("element should be found by custom evaluation handler", () => {
            const element = CoreUtilities.findParentElement($dataGraphSectionAnchorEnd[0], {
                successibleConditions: {
                    customEvaluationHandler: (element) => {
                        if (element.tagName.toLowerCase() === "div")
                            return true;
                    }
                },
                verbose: true
            });

            assert.instanceOf(element, HTMLElement, "valid element was expected");
            assert.strictEqual(element.getAttribute("name"), $dataGraphSectionAnchorEnd.attr("name"), "element missmatch");
        });

        it("should throw an error because of no giving conditions", () => {
            assert.throw(() => CoreUtilities.findParentElement($dataGraphSectionName[0], {
                successibleConditions: {}
            }), Error);
        });
    })

    describe("#modifyObject", () => {
        var rootObj = null;

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