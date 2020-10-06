/* -------------------------------------------------------------------------- */
/*                           Mars Rover Coding Test                           */
/* -------------------------------------------------------------------------- */
/* ------------------- comments placed above relevant line ------------------ */

/* -------------------------------------------------------------------------- */
/*                           HTML Element Assignment                          */
/* -------------------------------------------------------------------------- */

const roverDiv = document.getElementById('roverFinal');
const gridSizeHtml = document.getElementById('gridSize');
const errorHtml = document.getElementById('error');
const numRoversHtml = document.getElementById('numRovers');
const textAreaInput = document.getElementById('instructionInput');

/* ------------------------------ HTML Helpers ------------------------------ */

const resetVals = () => {
	// Reset common values helper
	roverDiv.innerHTML = '';
	gridSizeHtml.innerHTML = '';
	numRoversHtml.innerHTML = '';
};

/* ---------------------------- Helper functions ---------------------------- */
const withinGrid = (roverCord, platCord) => {
	return roverCord >= 0 && roverCord <= platCord;
};

/* -------------------------------------------------------------------------- */
/*                              Compass Handling                              */
/* -------------------------------------------------------------------------- */

const setDirection = (initial, change) => {
	try {
		const COMPASS = [
			'N',
			'E',
			'S',
			'W'
		];
		let startIndex = COMPASS.indexOf(initial);
		const helperCondition = () => {
			if (startIndex > 3) {
				startIndex = 0;
			} else if (startIndex < 0) {
				startIndex = 3;
			}
		};
		switch (change) {
			case 'R':
				startIndex++;
				helperCondition();
				return COMPASS[startIndex];
				break;
			case 'L':
				startIndex--;
				helperCondition();
				return COMPASS[startIndex];
				break;
			default:
				throw 'Invalid orientation change or Cardinal point supplied';
		}
	} catch (err) {
		document.getElementById('error').innerHTML = err.message;
	}
};

/* -------------------------------------------------------------------------- */
/*                            Instruction Handling                            */
/* -------------------------------------------------------------------------- */

const moveRover = (position, instruction, gridSize) => {
	try {
		// Remove white space from instructions change to uppercase string and convert to array
		let instructionArray = instruction.toUpperCase().split('');
		// initialise rover position convert to uppercase and transform into array in format [X,Y,Orientation]
		let positionArray = position.toUpperCase().replace(/\s/g, '').split('');
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
		if (withinGrid(positionArray[0], gridSize[0]) && withinGrid(positionArray[1], gridSize[1])) {
			return positionArray.join(' ');
		} else {
			return 'The rover left the plateau! (Thats going to be an expensive mistake)';
		}
	} catch (err) {
		errorHtml.innerHTML = 'Instructions appear to be invalid! Please check and try again.';

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
	// Assign Grid size from first line, remove all white space
	let gridSize = arrayInput[0].replace(/ /g, '').split(/(?!$)/u);
	//Check if a valid grid size has been given before proceeding
	if (gridSize.length !== 2 || isNaN(gridSize[0]) || isNaN(gridSize[1])) {
		errorHtml.innerHTML =
			'Your Grid Size appears to be invalid! (Please check to make sure you are suppling 2 coordinate numbers as the first line)';
	} else {
		// Break down input into individual rovers
		let roverArray = [];
		for (let i = 1; i < arrayInput.length; i + 2) {
			let tempArray = arrayInput.splice(i, 2);
			roverArray.push(tempArray);
		}

		/* -------------------------- HTML Helpers -------------------------- */
		// Clears data from html incase new data submitted
		errorHtml.innerHTML = '';
		resetVals();
		/* --------------------------------- Html tertiary info -------------------------------- */

		gridSizeHtml.innerHTML = 'Grid Size: ' + gridSize;
		document.getElementById('numRovers').innerHTML = 'Number of Rovers: ' + roverArray.length;

		/* -------------------------- Instructions dispatch ------------------------- */
		for (let i = 0; i < roverArray.length; i++) {
			let roverP = document.createElement('h3');
			let roverFinalPos = document.createTextNode(
				// use moveRover function to fetch final position
				`Rover  ${i + 1}  final position: ${moveRover(roverArray[i][0], roverArray[i][1], gridSize)}`
			);

			/* ------------------------ Append Rover data to html ----------------------- */
			roverP.appendChild(roverFinalPos);
			roverDiv.appendChild(roverP);
		}
		if (errorHtml.innerHTML) {
			resetVals();
		}
		// Clear Input ready for new data
		textAreaInput.value = null;
	}
};

module.exports = { moveRover };
