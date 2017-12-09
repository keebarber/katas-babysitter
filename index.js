module.exports = {
    startTime: function(start) {
        let goodStartTime = false;

        if (start >= 0 && start <= 4) {
            return !goodStartTime;
        } else if (start >= 17 && start < 24) {
            return !goodStartTime;
        } else {
            return goodStartTime;
        }
        
        return goodStartTime;
    },
    endTime: function(end) {
        let goodEndTime =false;

        if (end >=0 && end<=4) {
            return !goodEndTime;
        } else if (end > 17 && end < 24) {
            return !goodEndTime;
        } else {
            return goodEndTime;
        }

        return goodEndTime;
    }
};