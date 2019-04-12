const ChartjsNode = require('chartjs-node');

const util = require('./util');

if (global.CanvasGradient === undefined) {
	global.CanvasGradient = function () { };
}

module.exports = function (dat, labels, title) {
	let color = 'rgb(95, 226, 106)';
	labels = labels.map(l => util.formatDate(l));

	var chartNode = new ChartjsNode(600, 600);
	var chartConfig = {
		type: 'line',
		data: {
			labels: labels,
			datasets: [{
				data: dat,
				borderColor: color,
				borderWidth: 5,
				fill: false
			}]
		},
		options: {
			labels: {
				fontColor: "#000000"
			},
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero: false
					}
				}]
			},
			width: 400,
			height: 400,
			legend: {
				display: false
			},
			title: {
				display: true,
				text: title,
				fontSize: 24,
				fontColor: '#ffffff'
			},
			plugins: {
				afterDraw: (chart, easing) => {
					var chartInstance = chart.chart,
						ctx = chartNode._ctx;

					var imgData = ctx.getImageData(0, 0, 600, 600);
					chartNode._canvas.width += 20;
					ctx.putImageData(imgData, 0, 0);
					ctx.textAlign = 'center';
					ctx.textBaseline = 'bottom';

					ctx.font = "bold 16px 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif";
					chart.config.data.datasets.forEach(function (dataset, i) {
						var meta = chartInstance.controller.getDatasetMeta(i);
						var lastX = 0;
						var lastY = 0;
						meta.data.forEach(function (bar, index) {
							var data = dataset.data[index];
							var radius = 1;
							if ((index === meta.data.length - 1) || (index === 0) || (((bar._model.x - lastX > ctx.measureText(data).width) || Math.abs(bar._model.y - lastY) > 38.4) && (dataset.data[index - 1] !== dataset.data[index]))) {
								radius = 8;
								lastX = bar._model.x;
								lastY = bar._model.y;
							}
							ctx.beginPath();
							ctx.arc(bar._model.x, bar._model.y, radius, 0, 2 * Math.PI, false);
							ctx.fillStyle = color;
							if (index === meta.data.length - 1)
								ctx.fillStyle = '#ff0000';
							ctx.fill();
						});
						lastX = 0;
						meta.data.forEach(function (bar, index) {
							var data = dataset.data[index];
							ctx.fillStyle = '#000000';
							if (index === meta.data.length - 1)
								ctx.fillStyle = '#ff0000';
							if ((index === meta.data.length - 1) || (index === 0) || (((bar._model.x - lastX > ctx.measureText(data).width) || Math.abs(bar._model.y - lastY) > 38.4) && (dataset.data[index - 1] !== dataset.data[index]))) {
								ctx.fillText(data, bar._model.x, bar._model.y - 5);
								lastX = bar._model.x;
								lastY = bar._model.y;
							}
						});
					});
				}
			}
		}
	};

	return new Promise(function (resolve, reject) {
		chartNode.drawChart(chartConfig)
			.then(() => {

				// Draw logo
				let Canvas = require('canvas');
				let img = new Canvas.Image;
				img.src = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4gUQBAgmEnxv7wAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAD5ElEQVRYw+2Y204bVxSGv/GMDzP2eHzkTHCIoA3EpEqpqpZeVQpUxb2IiqVe9w3yFnmW0KuWqFVbiJpSKWrTqgoCFWgbo6QBDDFgfB57phdgc3AIEGLjC9bVaGa29qd/7bX2v7dw+878fSBEY0ZMAkKCIDQkoGmaWGjwuAC8ADzvkOquyCFJDKOBAJ2yyI0+lSudcuXd9KNl/ooVkCTb+ac4nS3xPJ7Hp0mEe11c63HiELfYWI+RTW82RooNw8QwQS8aSKIAQC6ziZ7PoOtNuNwtWPatg7oChtodDA/5URzw3f0FrnT5Kt9KpQJbiWcU9RwudzM2u7O+gKF2ByNDPgIeC3cnZpiaXqCvt5lS6WCVpLfXKeQzuNxNONVgfQBDbQ6Gh3z4PSLju3AAcwurWCxC1f96IcPG+hK5bPJsRWK3CSeGC3pEvpqYYXIXrrPNhyhaMAzzKKtAJvXi9QEH+1VGhvz4NfHIf7rKcN4d5cpw773TxWc3+5Ad1to06sF+lZGP/HhUCdlu8O2DFbbSVgRBqIILvAQuGgljmmZttrqycssrCSZ/+Yfrb3u5+YGG05akUMjswLXuwDVVwV0iGgkT6tBqs9UNXtuDG594zNxinJW1FNHRMALw9eQTvF6J4aG2CtzUIeVOA3cqwMF+lZEP/SyvJhi/N8PcYhyAb76fxTQhOhpGddmwWiUCvpen9bRwJwaspHV1T7mdKpbIF4pM/DCLaZpERwfI5XXuTjxmanoRgJ7LwdeGOxFgBS5+EO7WJ/08W0ny259PAbj34xzZXIliscSDh39XxrcEXVxqc9fGD17tVvYpt5fWsdEw0cgAAJpboae7GYCp6fkK3NWeVjS3AsLZmvwrAVsC1r20LqzugwtXJvZ7ZcZGw1zv66iMe//GzprTVEdtDeu/T7d49HvskHLh3X6318d6L3tRImEMw8DltDEWCaOp9to76qXnRTYSFgTBwuef9u+Dq463un18+cW72GwSQZ9CMpWvg+UXJDy+Tm4N9xD5uPNIuHK0t7h503HsTuKSBQYHAsfCneup7nzQLs7FdToXGyb8MZvA6YgfeF8qGSQ2s2QyOj//ulTl7dIZnWxOZ+1Fmp8exqqc8+paipJxvOUSbt+Zf3Lc9VtRz5JKxklvrx3wceXnowropN9fcf0WO5FZkKwymq8TUXKQ3o6jF7Knnaj2a1AQLKhaM95ACMXlb9y7GbtDxWpTsNkUUttrFPVc41WxxSKielrx+ruQFW/j3m45FA2rXcG6JZNKxjGMYuP1QVG0ovk68AZD2GV3TRSMnaXKyiErXiSrTHLzPzLbL94QnhD7Hy6eiKGq2NWBAAAAAElFTkSuQmCC', 'base64');
				chartNode._ctx.drawImage(img, 0, 0);

				// Fill background with white
				chartNode._ctx.globalCompositeOperation = "destination-over";
				chartNode._ctx.fillStyle = '#7289DA';
				chartNode._ctx.fillRect(0, 0, 620, 40);
				chartNode._ctx.fillStyle = '#ffffff';
				chartNode._ctx.fillRect(0, 0, 620, 600);
				return chartNode.getImageBuffer('image/png');
			})
			.then(buffer => {
				chartNode.destroy();
				resolve(buffer);
			});
	});
}