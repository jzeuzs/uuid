import { v4 } from '../dist';

describe('v4', () => {
	it('should return a random uuid', () => {
		const uuid = v4();

		expect(uuid).toBe(uuid);
	});
});
