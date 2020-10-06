const { moveRover } = require('./script');

test('Moves rover from initial position based off string instruction set', () => {
	expect(
		moveRover('1 2 N', 'LMLMLMLMM', [
			5,
			5
		])
	).toBe('1 3 N');
	expect(
		moveRover('3 3 E', 'MMRMMRMRRM', [
			5,
			5
		])
	).toBe('5 1 E');
	expect(
		moveRover('1 2 N', 'LMLMLMRMM', [
			5,
			5
		])
	).toBe('The rover left the plateau! (Thats going to be an expensive mistake)');
});
