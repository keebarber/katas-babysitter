(() => {
	const earliestStart = 17;
	const latestEnd = 4;
	const midnight = 24;

	let totalPay = 0;
	document.getElementById("totalpay").innerHTML = totalPay;

	const calculate = document.getElementById("calculate");
	calculate.onclick = () => {
		let startTime = Number(document.getElementById("start").value);
		let bedTime = Number(document.getElementById("bed").value);
		let endTime = Number(document.getElementById("end").value);

		//  Sets midnight value to 24 to computing purposes
		if (startTime == 0) {
			startTime = midnight;
		}
		if (bedTime == 0) {
			bedTime = midnight;
		}
		if (endTime == 0) {
			endTime = midnight;
		}

		let totalPay = functions.wholeNight(startTime, bedTime, endTime);

		if (totalPay) {
			document.getElementById("totalpay").innerHTML = totalPay;
		} else {
			document.getElementById("totalpay").innerHTML = 0;
		}
	};
	//	Functions from index.js go here
	let functions = {
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
			let e = functions;

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
							alert("Your Start and End times conflict.");
							console.log("Your Start and End times conflict.");
							totalForNight = false;
						}
					} else {
						alert("Your bedtime is either after midnight or invalid.");
						console.log("Bedtime should be before midnight.");
						totalForNight = false;
					}
				} else {
					alert("Your Start time is either before 1700 or invalid.");
					console.log("Your Start time is invalid.");
					totalForNight = false;
				}
			} else {
				alert("Your End time is either after 0400 or invalid.");
				console.log("Your End time is invalid.");
				totalForNight = false;
			}

			return totalForNight;
		}
	};
})();
