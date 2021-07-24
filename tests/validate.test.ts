import { validate } from '../dist';

describe('validate', () => {
	it('should return true', () => {
		const valid = validate('94f4badc-7926-4a47-8429-027da7c9ebf1');

		expect(valid).toBe(true);
	});

	it('should return false', () => {
		const notValid = validate('hello');

		expect(notValid).toBe(false);
	});
});
