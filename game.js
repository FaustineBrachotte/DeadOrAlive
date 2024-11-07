function drawCross() {
	const cross = document.querySelector('.cross');
	cross.classList.add('animate');
}

function drawCheck() {
	const check = document.querySelector('.check');
	check.classList.add('animate');
}

function playDead() {
	showDeath();
	const isDead = document.getElementById('isDead');
	isDead.style.visibility = 'visible';
	if (isDead.textContent == 'Vivant') {
		isDead.textContent = 'Faux, il est vivant !';
	} else if (isDead.textContent == 'Mort') {
		isDead.textContent = 'En effet, il est mort.';
		markAsDead();
	}
}

function markAsDead() {
	const circle = document.getElementById('circle');
	circle.style.transition = 'background-color 0.5s ease, color 0.5s ease';
	circle.style.backgroundColor = '#350707';
	circle.style.color = 'white';
	drawCross();
}

function showDeath() {
	const isDead = document.getElementById('isDead');
	isDead.style.visibility = 'visible';
}

function hideBtns() {
	const aliveBtn = document.getElementById('aliveBtn');
	const diedBtn = document.getElementById('deadBtn');
	aliveBtn.style.visibility = 'hidden';
	diedBtn.style.visibility = 'hidden';
}

function showBtns() {
	const aliveBtn = document.getElementById('aliveBtn');
	const diedBtn = document.getElementById('deadBtn');
	aliveBtn.style.visibility = 'visible';
	diedBtn.style.visibility = 'visible';
}

function isAlive() {
	hideBtns();
	const isDead = document.getElementById('isDead');
	const sexe = document.getElementById('sexe');

	isDead.style.visibility = 'visible';
	if (isDead.textContent == 'Mort' && sexe.textContent == 'Male') {
		isDead.textContent = 'Et non, il est mort !';
		drawCross();
	} else if (isDead.textContent == 'Vivant' && sexe.textContent == 'Female') {
		isDead.textContent = 'Et non, elle est morte !';
		drawCross();
	} else if (isDead.textContent == 'Vivant' && sexe.textContent == 'Male') {
		isDead.textContent = 'Bravo, il est vivant !';
	} else if (isDead.textContent == 'Vivant' && sexe.textContent == 'Female') {
		isDead.textContent = 'Bravo, elle est vivante !';
	}
}

async function fetchCharacter() {
	resumePlayState();
	const randomNumber = Math.floor(Math.random() * 2100) + 1;
	try {
		const response = await fetch(
			`https://www.anapioficeandfire.com/api/characters/${randomNumber}`
		);

		const data = await response.json();
		displayCharacter(data);
		displayDeath(data);
		displaySexe(data);
	} catch (error) {
		console.error(error);
	}
	showBtns();
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

function displayCharacter(data) {
	const div = document.getElementById('characterName');
	div.textContent = data.name;
}

function displaySexe(data) {
	const div = document.getElementById('sexe');
	div.textContent = data.gender;
	div.style.visibility = 'hidden';
}

function displayDeath(data) {
	const div = document.getElementById('isDead');
	if (data.died != '') {
		div.textContent = 'Mort';
	} else {
		div.textContent = 'Vivant';
	}
	div.style.visibility = 'hidden';
}

function hasName(data) {
	const hasName = false;
	if (data.name !== '') {
		hasName = true;
	}
}

fetchCharacter();
