const HandlerMerger = require("../dist/teronis-js-core.js").HandlerMerger;

describe("HandlerMerger", function () {
    it("function gets called through proxy", function (done) {
        const merger = new HandlerMerger();
        const proxy = merger.mergeWith(() => done(), "test");
        proxy();
    });

    it("named function gets called through proxy", function (done) {
        const merger = new HandlerMerger();
        const proxy = merger.mergeWith(() => done(), "test");
        proxy();
    });

    it("arrow function with name as argument gets called through proxy", function (done) {
        const merger = new HandlerMerger();
        const proxy = merger.mergeWith(() => done(), "test");
        proxy();
    });

    it("replaced named function gets called through proxy", function (done) {
        const merger = new HandlerMerger();
        merger.mergeWith(function test() { done(new Error("This function should be replaced and not be called.")); });
        const proxy = merger.replaceMerge(() => { done() }, "test");
        proxy();
    });

    it("merger does trigger pre-interception event", function (done) {
        const merger = new HandlerMerger();
        merger.getPreInterceptionEvent().Add(() => done());
        const proxy = merger.mergeWith(() => { }, "test");
        proxy();
    })

    it("merger does trigger post-interception event", function (done) {
        const merger = new HandlerMerger();
        merger.getPostInterceptionEvent().Add(() => done());
        const proxy = merger.mergeWith(() => { }, "test");
        proxy();
    })
});