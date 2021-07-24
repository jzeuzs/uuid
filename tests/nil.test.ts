import { NIL } from '../dist';

describe('nil', () => {
	it('should be a nil uuid', () => {
		expect('00000000-0000-0000-0000-000000000000').toBe(NIL);
	});
});
