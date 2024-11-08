async function fetchCharacter() {
	const randomNumber = Math.floor(Math.random() * 2100) + 1;
	try {
		const response = await fetch(
			`https://www.anapioficeandfire.com/api/characters/${randomNumber}`
		);

		const data = await response.json();
		if (data.name !== '') {
			displayCharacter(data);
			displayDeath(data);
			displayGender(data);
		} else {
			fetchCharacter();
		}
	} catch (error) {
		console.error(error);
	}
	resumePlayState();
}

function displayCharacter(data) {
	const divName = document.getElementById('characterName');
	divName.textContent = data.name;
}

function displayDeath(data) {
	const divDeath = document.getElementById('isDead');
	if (data.died != '') {
		divDeath.textContent = 'dead';
	} else {
		divDeath.textContent = 'alive';
	}
	divDeath.style.visibility = 'hidden';
}

function displayGender(data) {
	const divGender = document.getElementById('gender');
	divGender.textContent = data.gender;
	divGender.style.visibility = 'hidden';
}

function playDead() {
	showDeath();
	const divDeath = document.getElementById('isDead');
	const divGender = document.getElementById('gender');

	if (divDeath.textContent === 'dead') {
		markAsDead();
	} else if (divDeath.textContent === 'alive') {
		markAsAlive();
	}
	generateMessageDead(divDeath, divGender.textContent);
}

function playAlive() {
	showDeath();
	const divDeath = document.getElementById('isDead');
	const divGender = document.getElementById('gender');

	if (divDeath.textContent === 'dead') {
		markAsDead();
	} else if (divDeath.textContent === 'alive') {
		markAsAlive();
	}
	generateMessageAlive(divDeath, divGender.textContent);
}

function showDeath() {
	const divDeath = document.getElementById('isDead');
	divDeath.style.visibility = 'visible';
}

function markAsDead() {
	const circle = document.getElementById('circle');
	circle.style.transition = 'background-color 0.5s ease, color 0.5s ease';
	circle.style.backgroundColor = '#350707';
	circle.style.color = 'white';
	drawCross();
}

function markAsAlive() {
	const circle = document.getElementById('circle');
	circle.style.transition = 'background-color 0.5s ease, color 0.5s ease';
	circle.style.backgroundColor = '#D6C896';
}

function drawCross() {
	const cross = document.querySelector('.cross');
	cross.classList.add('animate');
}

function generateMessageDead(divDeath, gender) {
	if (divDeath.textContent === 'dead') {
		divDeath.textContent =
			gender === 'Male' ? 'Indeed, he is dead.' : 'Indeed, she is dead.';
	} else if (divDeath.textContent === 'alive') {
		divDeath.textContent =
			gender === 'Male'
				? 'Wrong, he is still alive!'
				: 'Wrong, she is still alive!';
	}
}

function generateMessageAlive(divDeath, gender) {
	if (divDeath.textContent === 'dead') {
		divDeath.textContent =
			gender === 'Male' ? 'Wrong, he is dead.' : 'Wrong, she is dead.';
	} else if (divDeath.textContent === 'alive') {
		divDeath.textContent =
			gender === 'Male'
				? 'Well done, he is still alive!'
				: 'Well done, she is still alive!';
	}
}

function resumePlayState() {
	const cross = document.querySelector('.cross');
	const circle = document.getElementById('circle');
	circle.style.backgroundColor = '#7dbdf1';
	circle.style.color = 'black';

	if (cross !== null) {
		cross.classList.remove('animate');
	}

	const check = document.querySelector('.check');
	if (check !== null) {
		check.classList.remove('animate');
	}
}

fetchCharacter();

// function drawCheck() {
// 	const check = document.querySelector('.check');
// 	check.classList.add('animate');
// }

// function hideBtns() {
// 	const aliveBtn = document.getElementById('aliveBtn');
// 	const diedBtn = document.getElementById('deadBtn');
// 	aliveBtn.style.visibility = 'hidden';
// 	diedBtn.style.visibility = 'hidden';
// }

// function showBtns() {
// 	const aliveBtn = document.getElementById('aliveBtn');
// 	const diedBtn = document.getElementById('deadBtn');
// 	aliveBtn.style.visibility = 'visible';
// 	diedBtn.style.visibility = 'visible';
// }
