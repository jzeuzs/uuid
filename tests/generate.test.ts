import { generate } from '../dist';

describe('generate', () => {
	it('should return a 8 byte uuid', () => {
		const uuid = generate(8);

		expect(uuid).toBe(uuid);
	});

	it('should return a 16 byte uuid', () => {
		const uuid = generate(16);

		expect(uuid).toBe(uuid);
	});

	it('should return a 32 byte uuid', () => {
		const uuid = generate(32);

		expect(uuid).toBe(uuid);
	});

	it('should throw an error', () => {
		expect(() => {
			// @ts-expect-error Testing
			generate(54);
		}).toThrow('Invalid type.');
	});
});
