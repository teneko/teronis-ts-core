const HandlerMerger = require("../dist/teronis-ts-core.js").HandlerMerger;
const { assert } = require("chai");

describe("HandlerMerger", function () {
    let merger;

    beforeEach(() => {
        merger = new HandlerMerger();
    });

    it("should trigger pre-interception event", function (done) {
        merger.getPreInterceptionEvent().subscribe(() => done());
        const proxy = merger.mergeWith(() => { }, "test");
        proxy();
    })

    it("should trigger post-interception event", function (done) {
        merger.getPostInterceptionEvent().subscribe(() => done());
        const proxy = merger.mergeWith(() => { }, "test");
        proxy();
    })

    describe("#mergeWith()", () => {
        it("normal function should be called through proxy", function (done) {
            const proxy = merger.mergeWith(() => {
                assert.equal(merger.getCounter(), 1, "counter did not increase by one");
                done();
            }, "test");
            proxy();
        });

        it("named function should be called through proxy", function (done) {
            const proxy = merger.mergeWith(() => {
                assert.equal(merger.getCounter(), 1, "counter did not increase by one");
                done();
            }, "test");
            proxy();
        });

        it("arrow function with custom name passed as argument should be called through proxy", function (done) {
            const proxy = merger.mergeWith(() => {
                assert.equal(merger.getCounter(), 1, "counter did not increase by one");
                done();
            }, "test");
            proxy();
        });
    });

    context("#replaceWith()", () => {
        it("replaced named function should be called through proxy", function (done) {
            merger.mergeWith(function test() {
                done(new Error("This function should be replaced and not be called."));
            });
            const proxy = merger.replaceMerge(() => {
                assert.equal(merger.getCounter(), 1, "counter did not increase by one");
                done();
            }, "test");
            proxy();
        });
    });
});