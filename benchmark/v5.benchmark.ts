import { suite, add, complete, cycle } from 'benny';
import { Namespace, v5 as native } from '../dist';
import { v5 } from 'uuid';

suite(
	'UUID v5',
	add('uuid', () => v5('https://tomio.codes', v5.URL)),
	add('@tomiocodes/uuid', () => native(Namespace.URL, 'https://tomio.codes')),
	cycle(),
	complete()
);
