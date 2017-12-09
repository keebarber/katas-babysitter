const assert = require("chai").assert;
const app = require("./index.js");

const startTime = require("./index.js").startTime;
const endTime = require("./index.js").endTime;

describe("App", function() {
    describe("startTime()", function() {
        it("Start time should not be between 4am and 5pm", function() {
            let result = startTime(12);
            assert.equal(result, false);
        });
        it("Start time should be between 5pm and 4am", function() {
            let result = startTime(18);
            assert.equal(result, true);
        });
        it("Start time should not be less than 0 on 24-hour scale", function() {
            let result = startTime(-1);
            assert.equal(result, false);
        });
        it("Start time should not be greater than 24  on 24-hour scale", function() {
            let result = startTime(30);
            assert.equal(result, false);
        });
        it("Start time should be a number", function() {
            let result = startTime("String");
            assert.equal(result, false);
        });
    });
    describe("endTime()", function() {
        it("End time should not be between 4am and 5pm", function() {
            let result = endTime(12);
            assert.equal(result, false);
        });
        it("End time should be between 5pm and 4am", function() {
            let result = endTime(18);
            assert.equal(result, true);
        });
        it("End time should not be less than 0 on 24-hour scale", function() {
            let result = endTime(-1);
            assert.equal(result, false);
        });
        it("End time should not be greater than 24  on 24-hour scale", function() {
            let result = endTime(30);
            assert.equal(result, false);
        });
        it("End time should be a number", function() {
            let result = endTime("String");
            assert.equal(result, false);
        });
    });
});
