module.exports = {
    startTime: function(start) {
        let goodStartTime = false;

        if (start >= 0 && start <= 4) {
            return !goodStartTime;
        } else if (start >= 17 && start < 24) {
            return !goodStartTime;
        } 

        return goodStartTime;
    },
    endTime: function(end) {
        let goodEndTime =false;

        if (end >=0 && end<=4) {
            return !goodEndTime;
        } else if (end > 17 && end < 24) {
            return !goodEndTime;
        } 

        return goodEndTime;
    },
    timeRange: function(start, end) {
        let goodTimeRange = false;

//  Adds 24 if time is after midnight to account for rollover
        if(start >= 0 && start <= 4) {
            start+=24;
        } 
        if (end >= 0 && end <= 4) {
            end+= 24;
        }

        if(start === end) {
            return goodTimeRange;
        } else if(start < end) {
            return !goodTimeRange;
        } 

        return goodTimeRange;
    }
};