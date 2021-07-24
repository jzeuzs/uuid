import { suite, add, complete, cycle } from 'benny';
import { v4 as native } from '../dist';
import { v4 } from 'uuid';

suite('UUID v4', add('@tomiocodes/uuid', native), add('uuid', v4), cycle(), complete());
