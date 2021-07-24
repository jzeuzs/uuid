import { v5, Namespace } from '../dist';

describe('v5', () => {
	it('should generate a SHA-1 uuid with a url namespace', () => {
		const uuid = v5(Namespace.URL, 'https://tomio.codes');

		expect(uuid).toBe(uuid);
	});

	it('should generate a SHA-1 uuid with a dns namespace', () => {
		const uuid = v5(Namespace.DNS, 'https://google.com');

		expect(uuid).toBe(uuid);
	});

	it('should generate a SHA-1 uuid with a custom namespace', () => {
		const uuid = v5('67dd7b4a-6634-48ed-bc60-c4c3b9f62f29', 'https://tomio.codes');

		expect(uuid).toBe(uuid);
	});
});
