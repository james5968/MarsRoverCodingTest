import { moveRover } from './script.js';

const testCase = (desc, input, expected) => {
	let pass = input === expected ? '%cPASS' : '%cFAIL';
	let css = input === expected ? 'color:green' : 'color:red';
	console.log(
		`%cTest case:%c\n${desc}\n%cResult: ${pass} `,
		'font-size:16px',
		'color:rgb(200,200,200); font-size:12px',
		'font-size:14px',
		`font-size:14px;${css}`
	);
};

const test = () => {
	testCase(
		'Move rover from initial position 1 2 N with instruction set LMLMLMLMM, expected output: 1 3 N',
		moveRover('1 2 N', 'LMLMLMLMM', [
			5,
			5
		]),
		'1 3 N'
	);
	testCase(
		'Move rover initial position 3 3 E with instruction set MMRMMRMRRM, expected output: 5 1 E',
		moveRover('3 3 E', 'MMRMMRMRRM', [
			5,
			5
		]),
		'5 1 E'
	);
	testCase(
		'Move rover initial position 1 2 N with instruction set LMLMLMRMM, expect the rover to go out of bounds',
		moveRover('1 2 N', 'LMLMLMRMM', [
			5,
			5
		]),
		'The rover left the plateau! (Thats going to be an expensive mistake)'
	);
};

test();
