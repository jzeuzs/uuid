import { suite, add, complete, cycle } from 'benny';
import { v1 as native } from '../dist';
import { v1 } from 'uuid';

suite('UUID v1', add('uuid', v1), add('@tomiocodes/uuid', native), cycle(), complete());
