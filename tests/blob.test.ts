import { blob } from '../dist';

describe('blob', () => {
	it('should convert a uuid into a blob', () => {
		const converted = blob('8ef65ee9-a039-4bf2-a4b3-687fcc1f3cc3');

		expect(converted).toBe('jvZe6aA5S_Kks2h_zB88ww');
	});
});
