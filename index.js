const earliestStart = 17;
const latestEnd = 4;
const midnight = 24;

module.exports = {
    startTime: start => {
        let goodStartTime = false;

        if (start >= earliestStart && start <= midnight) {
            return !goodStartTime;
        }

        return goodStartTime;
    },
    endTime: end => {
        let goodEndTime = false;

        if (
            (end > 0 && end <= latestEnd) ||
            (end > earliestStart && end <= midnight)
        ) {
            return !goodEndTime;
        }

        return goodEndTime;
    },
    timeRange: (start, end) => {
        let goodTimeRange = false;
        let lateStart = start;
        let lateEnd = end;

        //  Adds 24 if time is after midnight to account for rollover
        if (start > 0 && start <= latestEnd) {
            lateStart = start + 24;
        }
        if (end > 0 && end <= latestEnd) {
            lateEnd = end + 24;
        }

        if (lateStart < lateEnd) {
            return !goodTimeRange;
        }

        return goodTimeRange;
    },
    bedtimeCheck: bedtime => {
        //  Bedtime has to be before or equal to midnight but could be before babysitter arrives
        let goodBedtime = false;

        if (bedtime > 0 && bedtime <= latestEnd) {
            bedtime += 24;
        }
        if (bedtime <= 24) {
            return !goodBedtime;
        }
        return goodBedtime;
    },
    payGrade1: (start, bedtime) => {
        let hoursWorkedAtPayGrade1 = 0;
        if (start < midnight && start >= earliestStart) {
            if (bedtime > start) {
                hoursWorkedAtPayGrade1 = bedtime - start;
            }
        }

        return Math.ceil(hoursWorkedAtPayGrade1);
    },
    payGrade2: (start, bedtime, end) => {
        let hoursWorkedAtPayGrade2 = 0;
        if (end > 0 && end <= latestEnd) {
            end += 24;
        }

        if (end <= midnight && bedtime < start) {
            hoursWorkedAtPayGrade2 = end - start;
        } else if (end <= midnight && bedtime > start) {
            hoursWorkedAtPayGrade2 = end - bedtime;
        } else if (end >= midnight && bedtime > start) {
            hoursWorkedAtPayGrade2 = 24 - bedtime;
        } else if (end >= midnight && bedtime < start) {
            hoursWorkedAtPayGrade2 = 24 - start;
        } else {
            hoursWorkedAtPayGrade2 = bedtime - start;
        }

        return Math.ceil(hoursWorkedAtPayGrade2);
    },
    payGrade3: end => {
        let hoursWorkedAtPayGrade3 = 0;
        if (end > 0 && end <= latestEnd) {
            hoursWorkedAtPayGrade3 = end;
        }

        return Math.ceil(hoursWorkedAtPayGrade3);
    },
    calculatePay: (pay1, pay2, pay3) => {
        return pay1 * 12 + pay2 * 8 + pay3 * 16;
    },
    wholeNight: (start, bedtime, end) => {
        let totalForNight, a, b, c;
        let e = module.exports;

        //  Far from most efficient solution but provides specific feeback
        if (e.endTime(end)) {
            if (e.startTime(start)) {
                if (e.bedtimeCheck(bedtime)) {
                    if (e.timeRange(start, end)) {
                        let a = e.payGrade1(start, bedtime);
                        let b = e.payGrade2(start, bedtime, end);
                        let c = e.payGrade3(end);
                        totalForNight = e.calculatePay(a, b, c);
                    } else {
                        console.log("Your Start and End times conflict.");
                        totalForNight = false;
                    }
                } else {
                    console.log("Bedtime should be before midnight.");
                    totalForNight = false;
                }
            } else {
                console.log("Your Start time is invalid.");
                totalForNight = false;
            }
        } else {
            console.log("Your End time is invalid.");
            totalForNight = false;
        }

        return totalForNight;
    }
};
