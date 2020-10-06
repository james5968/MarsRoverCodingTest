/* -------------------------------------------------------------------------- */
/*                           Mars Rover Coding Test                           */
/* -------------------------------------------------------------------------- */
/* ------------------- comments placed above relevant line ------------------ */

const setGrid = () => {};

const compass = [
	'N',
	'W',
	'S',
	'E'
];

/* -------------------------- HTML Element Fetching ------------------------- */

let roverDiv = document.getElementById('roverFinal');
let gridSizeHtml = document.getElementById('gridSize');
let errorHtml = document.getElementById('error');

/* -------------------------------------------------------------------------- */
/*                              Compass Handling                              */
/* -------------------------------------------------------------------------- */

const setDirection = (initial, change) => {
	try {
		if (initial == 'N') {
			if (change == 'L') {
				return 'W';
			} else if (change == 'R') {
				return 'E';
			} else {
				throw 'Invalid orientation change';
			}
		} else if (initial == 'E') {
			if (change == 'L') {
				return 'N';
			} else if (change == 'R') {
				return 'S';
			} else {
				throw 'Invalid orientation change';
			}
		} else if (initial == 'S') {
			if (change == 'L') {
				return 'E';
			} else if (change == 'R') {
				return 'W';
			} else {
				throw 'Invalid orientation change';
			}
		} else if (initial == 'W') {
			if (change == 'L') {
				return 'S';
			} else if (change == 'R') {
				return 'N';
			} else {
				throw 'Invalid orientation change';
			}
		} else {
			throw 'Invalid Cardinal point supplied';
		}
	} catch (err) {
		document.getElementById('error').innerHTML = err.message;
	}
};

/* -------------------------------------------------------------------------- */
/*                            Instruction Handling                            */
/* -------------------------------------------------------------------------- */

const moveRover = (position, instruction) => {
	try {
		// Remove white space from instruction string and convert to array

		let instructionArray = instruction.split('');

		// initialise rover position and transform into array in format [X,Y,Orientation]
		let positionArray = position.replace(/\s/g, '').split('');
		for (let i = 0; i < instructionArray.length; i++) {
			if (instructionArray[i] !== 'M') {
				positionArray[2] = setDirection(positionArray[2], instructionArray[i]);
			} else if (instructionArray[i] == 'M') {
				if (positionArray[2] == 'W') {
					positionArray[0] = parseInt(positionArray[0]) - 1;
				} else if (positionArray[2] == 'E') {
					positionArray[0] = parseInt(positionArray[0]) + 1;
				} else if (positionArray[2] == 'N') {
					positionArray[1] = parseInt(positionArray[1]) + 1;
				} else if (positionArray[2] == 'S') {
					positionArray[1] = parseInt(positionArray[1]) - 1;
				}
			}
		}
		return positionArray.join();
	} catch (err) {
		errorHtml.innerHTML = 'Instructions appear to be invalid!';
		roverDiv.innerHTML = '';
		gridSizeHtml.innerHTML = '';
		document.getElementById('numRovers').innerHTML = '';
	}
};

/* -------------------------------------------------------------------------- */
/*                    Data formating and HTML Manipulation                    */
/* -------------------------------------------------------------------------- */

const handleSubmit = () => {
	/* --------------------------------- Inputs --------------------------------- */

	// Get Block Text input
	let instructionInput = document.getElementById('instructionInput').value;
	// Split lines into array
	let arrayInput = instructionInput.match(/[^\r\n]+/g);
	// Assign Grid size from first line
	let gridSize = arrayInput[0];
	// Break down input into individual rovers
	let roverArray = [];
	for (let i = 1; i < arrayInput.length; i + 2) {
		let tempArray = arrayInput.splice(i, 2);
		roverArray.push(tempArray);
	}

	/* -------------------------- HTML Helpers -------------------------- */
	// Clears data from html incase new data submitted
	roverDiv.innerHTML = '';
	errorHtml.innerHTML = '';
	gridSizeHtml.innerHTML = '';
	document.getElementById('numRovers').innerHTML = '';

	/* --------------------------------- Html tertiary info -------------------------------- */

	document.getElementById('gridSize').innerHTML = 'Grid Size: ' + gridSize;
	document.getElementById('numRovers').innerHTML = 'Number of Rovers: ' + roverArray.length;

	/* -------------------------- Instructions dispatch ------------------------- */
	for (let i = 0; i < roverArray.length; i++) {
		let roverP = document.createElement('h3');
		let roverFinalPos = document.createTextNode(
			// use moveRover function to fetch final position
			'Rover ' + (i + 1) + ' final position: ' + moveRover(roverArray[i][0], roverArray[i][1])
		);

		/* ------------------------ Append Rover data to html ----------------------- */
		roverP.appendChild(roverFinalPos);
		roverDiv.appendChild(roverP);
	}
	// Clear Input ready for new data
	document.getElementById('instructionInput').value = null;
};
