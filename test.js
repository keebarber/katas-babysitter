const  assert = require("chai").assert;
const sayHello = require("./index.js").sayHello;
const addNumber = require("./index.js").addNumber;
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
});