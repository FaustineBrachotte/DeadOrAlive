function drawCross() {
	const cross = document.querySelector('.cross');
	cross.classList.add('animate');
}

function isDead() {
	const container = document.getElementById('isDead');
	container.style.visibility = 'visible';
}

async function fetchCharacter() {
	const randomNumber = Math.floor(Math.random() * 500) + 1;

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
	const container = document.getElementById('character-container');
	const div = document.createElement('div');
	div.textContent = data.name;
	container.appendChild(div);
}

function displayDeath(data) {
	const div = document.getElementById('isDead');
	div.textContent = 'OW';

	if (data.died != '') {
		div.textContent = 'Mort';
	} else {
		div.textContent = 'Pas mort';
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
