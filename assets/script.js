let counter = 0;

/**
 * Check if the game ends
 */
const isDone = () => {
	const success = document.querySelectorAll('.success');
	if (success.length === 12) {
		success.forEach(element => {
			if (element.hasAttribute('data-card')) {
				return;
			}
		});
		// do some animation for future
		alert('YOUUUUUUU ARE AAA WINNER')
	}
};

/**
 * Check if the pair are equal
 * @param {HTMLElement} rotatedCards 
 */
const checkRotateCard = (rotatedCards) => {
	const [firstCard, secondCard] = rotatedCards;
	const counterElem = document.querySelector('.result');
	const firstCardAttr = firstCard.getAttribute('data-card');
	const secondCardAttr = secondCard.getAttribute('data-card');

	counterElem.value = ++counter;
	if (firstCardAttr === secondCardAttr) {
		rotatedCards.forEach((rotatedCard) => {
			rotatedCard.classList.add('success');
			rotatedCard.classList.remove('rotate');
			rotatedCard.removeAttribute('data-card');
		})

		isDone();

		return;
	}

	rotatedCards.forEach((rotatedCard) => {
		rotatedCard.classList.remove('rotate');
		rotatedCard.classList.remove('pointer-events');
	}) 
};

/**
 * Rotate card
 * @param {HTMLElement} card 
 */
const handleCardRotate = (card = {}) => {
	if (!card.getAttribute('data-card')) return;

	const rotatedCard = Array.from(document.querySelectorAll('.rotate'));
	const rotatedCardNum = rotatedCard.length;
	switch (rotatedCardNum) {
		case 0:
			card.classList.add('rotate');
			card.classList.add('pointer-events');
			break;
		case 1:
			card.classList.add('rotate');
			card.classList.add('pointer-events');
			rotatedCard.push(card)
			setTimeout(() => checkRotateCard(rotatedCard), 1500);
			break;
		default:
			// Nothing
	}
};

/**
 * Set random pair
 * @param {HTMLElement} card 
 */
const randomPair = (cards) => {
	const pair = [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6];

	cards.forEach((card) => {
		const index = Math.floor(Math.random() * pair.length);
		const random = pair[index];
	
		card.setAttribute('data-card', random);
		pair.splice(index, 1);

		card.classList.remove('rotate');
		card.classList.remove('pointer-events');
		card.classList.remove('success');
	});
};

/**
 * 
 * @param {HTMLElement} card 
 */
const hintClick = (cards) => {
	cards.forEach((card) => {
		card.classList.add('rotate');
		card.classList.add('pointer-events');
	});

	cards.forEach((card) => {
		setTimeout(() => {
			card.classList.remove('rotate');
			card.classList.remove('pointer-events');
		}, 1250);
	});
};

document.addEventListener('DOMContentLoaded', () => {
	const cards = document.querySelectorAll('.flip-card');
	const tryAgain = document.querySelector('.try-again');
	const counterElem = document.querySelector('.result');
	const hintButton = document.querySelector('.hint');

	cards.forEach((card) => {
		card.addEventListener('click', () => handleCardRotate(card, counterElem));
	});

	tryAgain.addEventListener('click', () => {
		counter = 0;
		counterElem.value = null;
		randomPair(cards, counterElem);
	});

	hintButton.addEventListener('click', () => {
		hintClick(cards);
	});

	randomPair(cards);
});
