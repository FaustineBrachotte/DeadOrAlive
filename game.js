function drawCross() {
	const cross = document.querySelector('.cross');
	cross.classList.add('animate');
}

function drawCheck() {
	const check = document.querySelector('.check');
	check.classList.add('animate');
}

function isDead() {
	const container = document.getElementById('isDead');
	container.style.visibility = 'visible';
	drawCross();
}

function isAlive() {
	const container = document.getElementById('isDead');
	container.style.visibility = 'visible';
	drawCheck();
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
