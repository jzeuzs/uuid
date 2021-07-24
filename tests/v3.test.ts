import { v3, Namespace } from '../dist';

describe('v3', () => {
	it('should generate a MD5 uuid with a url namespace', () => {
		const uuid = v3(Namespace.URL, 'https://tomio.codes');

		expect(uuid).toBe(uuid);
	});

	it('should generate a MD5 uuid with a dns namespace', () => {
		const uuid = v3(Namespace.DNS, 'https://google.com');

		expect(uuid).toBe(uuid);
	});

	it('should generate a MD5 uuid with a custom namespace', () => {
		const uuid = v3('67dd7b4a-6634-48ed-bc60-c4c3b9f62f29', 'https://tomio.codes');

		expect(uuid).toBe(uuid);
	});
});
