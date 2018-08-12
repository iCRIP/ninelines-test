import './vendor';

(() => {
	const $folds = $('.fold');
	const foldDuration = 500;
	const $meterCounter = $('.meter__counter');

	$(window).on('load', () => {
		$folds.each((index, fold) => {
			$(fold).css({ // show all folds
				opacity: 1,
				transitionDuration: `${foldDuration}ms`,
				transitionDelay: `${foldDuration * index}ms`,
			});
		});

		const $meterFold = $meterCounter.parents('.fold');
		const meterFoldDelay = parseInt($meterFold.css('transitionDelay'), 10) * 1000 + foldDuration;
		const startMeter = (onEnded) => {
			const from = parseInt($meterCounter.data('from'), 10);
			const to = parseInt($meterCounter.data('to'), 10);
			const max = parseInt($meterCounter.data('max'), 10);
			let current = from;
			let meterInterval = setInterval(() => {
				if (current === to) { // interval end state
					clearInterval(meterInterval);
					onEnded(); // callback
				} else { // interval run state
					current++;
				}

				let numbers = current.toString().split('');
				let numberEl = '';

				for (let i in numbers) {
					if (i) {
						numberEl += `<span>${numbers[i]}</span>`;
					}
				}

				$meterCounter.html(numberEl);
			}, 4);
			const duration = 4 * to;
			const $meterArrow = $('.meter__arrow__path');
			const toPercent = 100 * (to / max);
			const toDeg = toPercent * (180 / 100);

			$meterArrow.attr('style', `
				transform: rotate(${toDeg}deg) translate(-190px, -621.969px);
				transition-duration: ${duration}ms;
			`);
		};
		const showApproved = () => {
			const $approved = $('.fold__approved');

			$approved.addClass('is-active');
		};

		setTimeout(() => startMeter(showApproved), meterFoldDelay);
	});
})();
