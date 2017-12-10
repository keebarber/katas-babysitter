module.exports = {
    startTime: function(start) {
        let goodStartTime = false;

        if (start > 0 && start <= 4) {
            return !goodStartTime;
        } else if (start >= 17 && start <= 24) {
            return !goodStartTime;
        }

        return goodStartTime;
    },
    endTime: function(end) {
        let goodEndTime = false;

        if (end > 0 && end <= 4) {
            return !goodEndTime;
        } else if (end > 17 && end <= 24) {
            return !goodEndTime;
        }

        return goodEndTime;
    },
    timeRange: function(start, end) {
        let goodTimeRange = false;

        //  Adds 24 if time is after midnight to account for rollover
        if (start > 0 && start <= 4) {
            start += 24;
        }
        if (end > 0 && end <= 4) {
            end += 24;
        }

        if (start === end) {
            return goodTimeRange;
        } else if (start < end) {
            return !goodTimeRange;
        }

        return goodTimeRange;
    },
    bedtimeCheck: function(bedtime) {
        //  Bedtime has to be before midnight but could be before babysitter arrives
        let goodBedtime = false;

        if (bedtime > 0 && bedtime <= 4) {
            bedtime += 24;
        }

        if (bedtime < 24) {
            return !goodBedtime;
        }
        return goodBedtime;
    },
    payGrade1: function(start, bedtime) {
        let hoursWorkedAtPayGrade1 = 0;

        if (start < 24 && start >= 17) {
            if (bedtime < 17) {
                hoursWorkedAtPayGrade1 = 24 - start;
            } else {
                hoursWorkedAtPayGrade1 = bedtime - start;
            }
        }

        return Math.ceil(hoursWorkedAtPayGrade1);
    },
    payGrade2: function(bedtime, end) {
        let hoursWorkedAtPayGrade2 = 0;

        if (end > 0 && end <= 4) {
            end += 24;
        }

        if (end > 24) {
            hoursWorkedAtPayGrade2 = 24 - bedtime;
        } else {
            hoursWorkedAtPayGrade2 = end - bedtime;
        }

        return Math.ceil(hoursWorkedAtPayGrade2);
    },
    payGrade3: function(end) {
        let hoursWorkedAtPayGrade3 = 0;

        if (end > 0 && end <= 4) {
            hoursWorkedAtPayGrade3 = end;
        }

        return Math.ceil(hoursWorkedAtPayGrade3);
    }
};
