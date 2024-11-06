function drawCross() {
	const cross = document.querySelector('.cross');
	cross.classList.add('animate');
}

function drawCheck() {
	const check = document.querySelector('.check');
	check.classList.add('animate');
}

function isDead() {
	hideBtns();
	const container = document.getElementById('isDead');
	container.style.visibility = 'visible';
	if (container.textContent == 'Vivant') {
		drawCross();
	} else if (container.textContent == 'Mort') {
		drawCheck();
	}
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
	const container = document.getElementById('isDead');
	container.style.visibility = 'visible';
	if (container.textContent == 'Mort') {
		drawCross();
	} else if (container.textContent == 'Vivant') {
		drawCheck();
	}
}

async function fetchCharacter() {
	const cross = document.querySelector('.cross');
	if (cross !== null) {
		cross.classList.remove('animate');
	}

	const check = document.querySelector('.check');
	if (check !== null) {
		check.classList.remove('animate');
	}

	const randomNumber = Math.floor(Math.random() * 2100) + 1;

	try {
		const response = await fetch(
			`https://www.anapioficeandfire.com/api/characters/${randomNumber}`
		);

		const data = await response.json();
		console.log(data);
		displayCharacter(data);
		displayDeath(data);
	} catch (error) {
		console.error(error);
	}
	showBtns();
}

function displayCharacter(data) {
	const div = document.getElementById('characterName');
	div.textContent = data.name;
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
