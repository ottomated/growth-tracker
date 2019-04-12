module.exports = {
	formatTime: (str) => {
			var sec_num = parseInt(str, 10);
			var hours = Math.floor(sec_num / 3600);
			var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
			var seconds = sec_num - (hours * 3600) - (minutes * 60);

			if (hours < 10) {
					hours = "0" + hours;
			}
			if (minutes < 10) {
					minutes = "0" + minutes;
			}
			if (seconds < 10) {
					seconds = "0" + seconds;
			}
			var time = hours + ':' + minutes + ':' + seconds;
			return time;
	},
	formatRAM: (bytes) => {
			var i = -1;
			var byteUnits = [' kB', ' MB', ' GB', ' TB', 'PB', 'EB', 'ZB', 'YB'];
			do {
					bytes = bytes / 1024;
					i++;
			} while (bytes > 1024);

			return Math.max(bytes, 0.1).toFixed(1) + byteUnits[i];
	},
	filterOutliers: (array) => {

			if (array.length < 4)
					return array;

			let values, q1, q3, iqr, maxValue, minValue;

			values = array.slice().sort((a, b) => a - b); //copy array fast and sort

			if ((values.length / 4) % 1 === 0) { //find quartiles
					q1 = 1 / 2 * (values[(values.length / 4)] + values[(values.length / 4) + 1]);
					q3 = 1 / 2 * (values[(values.length * (3 / 4))] + values[(values.length * (3 / 4)) + 1]);
			} else {
					q1 = values[Math.floor(values.length / 4 + 1)];
					q3 = values[Math.ceil(values.length * (3 / 4) + 1)];
			}

			iqr = q3 - q1;
			maxValue = q3 + iqr * 1.5;
			minValue = q1 - iqr * 1.5;
			let ret = values.filter((x) => (x >= minValue) && (x <= maxValue));
			if (ret.length === 0) {
					return array;
			} else {
					return ret;
			}
	},
	arrMean: (arr) => {
			return arr.reduce((a, b) => a + b, 0) / arr.length;
	},
	formatDate: (date) => {
			var year = date.getFullYear().toString().substr(2);

			var month = (1 + date.getMonth()).toString();
			month = month.length > 1 ? month : '0' + month;

			var day = date.getDate().toString();
			day = day.length > 1 ? day : '0' + day;
			return month + '/' + day + '/' + year;
	}
}