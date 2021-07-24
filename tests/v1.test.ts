import { v1 } from '../dist';

describe('v1', () => {
	it('should return a timestamp uuid', () => {
		const uuid = v1();

		expect(uuid).toBe(uuid);
	});

	it('should generate a timestamp uuid with a custom date', () => {
		const uuid = v1(new Date());

		expect(uuid).toBe(uuid);
	});
});
