import { parse } from '../dist';

describe('parse', () => {
	it('should parse a uuid', () => {
		const parsed = parse('67dd7b4a-6634-48ed-bc60-c4c3b9f62f29');

		expect(parsed).toEqual({ isNil: false, version: '4' });
	});

	it('should parse a nil uuid', () => {
		const parsed = parse('00000000-0000-0000-0000-000000000000');

		expect(parsed).toEqual({ isNil: true, version: '0' });
	});

	it('should throw an error', () => {
		expect(() => parse('hi')).toThrow('Invalid UUID.');
	});
});
