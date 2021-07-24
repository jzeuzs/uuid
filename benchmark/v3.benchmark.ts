import { suite, add, complete, cycle } from 'benny';
import { Namespace, v3 as native } from '../dist';
import { v3 } from 'uuid';

suite(
	'UUID v3',
	add('uuid', () => v3('https://tomio.codes', v3.URL)),
	add('@tomiocodes/uuid', () => native(Namespace.URL, 'https://tomio.codes')),
	cycle(),
	complete()
);
