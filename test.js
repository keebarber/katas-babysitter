const  assert = require("chai").assert;
const sayHello = require("./index.js").sayHello;
const addNumber = require("./index.js").addNumber;
const startTime = require("./index.js").startTime;
const app = require("./index.js");


describe ("App", function() {
    it("App should return hello", function() {
        let result = sayHello();
        assert.equal(result, "hello");
    });
     it("App should return a string", function() {
        let result = sayHello();
        assert.typeOf(result, "string");
    });
      it("function should return a string", function() {
        let result = addNumber(4, 2);
        assert.equal(result, 6);
    });
       it("addNumber should return a number", function() {
        let result = addNumber();
        assert.typeOf(result, "number");
    });
       it("Start time should be between 5pm and 4am", function() {
        let result = startTime(12);
        assert.equal(result, false);
        it("Start time should be between 5pm and 4am", function() {
        result = startTime(18);
        assert.equal(result, true);
    });
    });
});