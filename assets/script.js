let counter = 0;


const gameFinished = () => {
	const success = document.querySelectorAll('.success');
	if (success.length === 12) {
		success.forEach(element => {
			if (element.hasAttribute('data-card')) {
				return;
			}
		});

		alert('HERE WE GO AGAIN!')
	}
};


const checkRotatedCard = (rotatedCards) => {
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

		gameFinished();

		return;
	}

	rotatedCards.forEach((rotatedCard) => {
		rotatedCard.classList.remove('rotate');
		rotatedCard.classList.remove('pointer-events');
	}) 
};

const handleCardRotation = (card = {}) => {
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
			setTimeout(() => checkRotatedCard(rotatedCard), 1500);
			break;
		default:
			// Nothing
	}
};


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

const hintClick = (cards) => {
	cards.forEach((card) => {
		card.classList.add('rotate');
		card.classList.add('pointer-events');
	});

	cards.forEach((card) => {
		setTimeout(() => {
			card.classList.remove('rotate');
			card.classList.remove('pointer-events');
		}, 1000);
	});
};

document.addEventListener('DOMContentLoaded', () => {
	const cards = document.querySelectorAll('.flip-card');
	const tryAgain = document.querySelector('.try-again');
	const counterElem = document.querySelector('.result');
	const hintButton = document.querySelector('.hint');

	cards.forEach((card) => {
		card.addEventListener('click', () => handleCardRotation(card, counterElem));
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
