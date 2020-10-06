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

/* ---------------------------- Helper functions ---------------------------- */

const withinGrid = (roverCord, platCord) => {
	//finds true if value lands within the bounds of that axis
	return roverCord >= 0 && roverCord <= platCord;
};

const resetVals = () => {
	// Reset common values helper
	roverDiv.innerHTML = '';
	gridSizeHtml.innerHTML = '';
	numRoversHtml.innerHTML = '';
};

/* -------------------------------------------------------------------------- */
/*                              Direction Handling                              */
/* -------------------------------------------------------------------------- */

const setDirection = (initial, change) => {
	try {
		// Define compass so we can loop through
		const COMPASS = [
			'N',
			'E',
			'S',
			'W'
		];
		//Find index of starting direction
		let startIndex = COMPASS.indexOf(initial);

		//helper conditional to loop back round if we leave the bounds of the array
		const helperCondition = () => {
			if (startIndex > 3) {
				startIndex = 0;
			} else if (startIndex < 0) {
				startIndex = 3;
			}
		};
		//switch to determine to loop through clockwise or anti-clockwise
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
		//Handle a movement based off facing direction
		const handleMove = () => {
			//Assign temp holders for array values
			let tempX = parseInt(positionArray[0]);
			let tempY = parseInt(positionArray[1]);
			//run through switch to make appropriate coordinate change
			switch (positionArray[2]) {
				case 'W':
					positionArray[0] = tempX - 1;
					break;
				case 'E':
					positionArray[0] = tempX + 1;
					break;
				case 'N':
					positionArray[1] = tempY + 1;
					break;
				case 'S':
					positionArray[1] = tempY - 1;
					break;
			}
		};
		//loop through Instructions deciding whether to move or change direction
		for (let i = 0; i < instructionArray.length; i++) {
			instructionArray[i] !== 'M'
				? (positionArray[2] = setDirection(positionArray[2], instructionArray[i]))
				: handleMove();
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

/* ------------------------- Export for Jest testing ------------------------ */

module.exports = { moveRover };
