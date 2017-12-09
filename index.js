module.exports = {
    startTime: function(start) {
        let goodStartTime = true;
        if (4 < start < 17) {
            return !goodStartTime;
        }
        return goodStartTime;
    },
    sayHello: function() {
        return "hello";
    },
    addNumber: function(num1, num2) {
        return num1 + num2;
    }
};
