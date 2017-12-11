const assert = require("chai").assert;
const app = require("./index.js");

const startTime = require("./index.js").startTime;
const endTime = require("./index.js").endTime;
const timeRange = require("./index.js").timeRange;
const bedtimeCheck = require("./index.js").bedtimeCheck;
const payGrade1 = require("./index.js").payGrade1;
const payGrade2 = require("./index.js").payGrade2;
const payGrade3 = require("./index.js").payGrade3;
const calculatePay = require("./index.js").calculatePay;
const wholeNight = require("./index.js").wholeNight;

describe("Test", function() {
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
    //  Not concerned with allowable start/end times
    describe("timeRange()", function() {
        it("Start time cannot be after end time", function() {
            let result = timeRange(2, 18);
            assert.equal(result, false);
        });
        it("Start time cannot be equal to end time", function() {
            let result = timeRange(18, 18);
            assert.equal(result, false);
        });
        it("Start time is before end time with rollover", function() {
            let result = timeRange(18, 2);
            assert.equal(result, true);
        });
    });
    describe("bedtimeCheck()", function() {
        it("Bedtime must be before midnight", function() {
            let result = bedtimeCheck(17);
            assert.equal(result, true);
        });
        it("Bedtime cannot be after midnight", function() {
            let result = bedtimeCheck(2);
            assert.equal(result, false);
        });
    });
    describe("payGrade1()", function() {
        it("Time worked at $12/hr should be 5", function() {
            let result = payGrade1(17, 22);
            assert.equal(result, 5);
        });
        it("Time worked at $12/hr should be 4", function() {
            let result = payGrade1(18, 22);
            assert.equal(result, 4);
        });
        it("Time worked at $12/hr should be 2", function() {
            let result = payGrade1(20, 22);
            assert.equal(result, 2);
        });
        it("Time worked at $12/hr should round up.", function() {
            let result = payGrade1(19.5, 24);
            assert.equal(result, 5);
        });
    });
    describe("payGrade3()", function() {
        it("Time worked at $12/hr should be 4", function() {
            let result = payGrade3(4);
            assert.equal(result, 4);
        });
        it("Time worked at $16/hr should be 0", function() {
            let result = payGrade3(12);
            assert.equal(result, 0);
        });
        it("Time worked at $16/hr should be 2", function() {
            let result = payGrade3(1.5);
            assert.equal(result, 2);
        });
    });
    describe("calculatePay()", function() {
        it("Pay for 1 hour before bedtime should be 12", function() {
            let result = calculatePay(1, 0, 0);
            assert.equal(result, 12);
        });
        it("Pay for 1 hour after bedtime and before midnight should be 8", function() {
            let result = calculatePay(0, 1, 0);
            assert.equal(result, 8);
        });
        it("Pay for 1 hour after midnight should be 16", function() {
            let result = calculatePay(0, 0, 1);
            assert.equal(result, 16);
        });
        it("Pay for 2 hours before bedtime, 2 hours after bedtime but before midnight, and 4 hours after midnight should be 104", function() {
            let result = calculatePay(2, 2, 4);
            assert.equal(result, 104);
        });
    });
    describe("wholeNight()", function() {
        it("Function works properly", function() {
            let result = wholeNight(18, 20, 2);
            assert.equal(result, 88);
        });
        it("Bad Start starttime should return a false", function() {
            let result = wholeNight(16, 20, 23);
            assert.equal(result, false);
        });
        it("Bad Endtimer should return a false", function() {
            let result = wholeNight(17, 20, 5);
            assert.equal(result, false);
        });
        it("Bad Bedtime should return a false", function() {
            let result = wholeNight(18, 1, 2);
            assert.equal(result, false);
        });
        it("Conflicting Start/End times", function() {
            let result = wholeNight(20, 23, 19);
            assert.equal(result, false);
        });
        it("Round hour up", function() {
            let result = wholeNight(20.5, 23, 2.4);
            assert.equal(result, 92);
        });
    });
});
