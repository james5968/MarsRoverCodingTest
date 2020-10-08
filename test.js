import { moveRover } from './script.js';

let testResults = [];

const testCase = (input, expected) => {
	if (input === expected) {
		testResults.push('PASS');
	} else {
		testResults.push('FAIL');
	}
};

const test = () => {
	testResults = [];
	testCase(
		moveRover('1 2 N', 'LMLMLMLMM', [
			5,
			5
		]),
		'1 3 N'
	);
	testCase(
		moveRover('3 3 E', 'MMRMMRMRRM', [
			5,
			5
		]),
		'5 1 E'
	);
	testCase(
		moveRover('1 2 N', 'LMLMLMRMM', [
			5,
			5
		]),
		'The rover left the plateau! (Thats going to be an expensive mistake)'
	);

	console.log(`Test results = ${testResults}`);
};

test();
