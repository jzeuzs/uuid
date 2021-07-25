#!/usr/bin/env node

import uuid, { validate, parse, blob } from '.';
import consola from 'consola';
import prog from 'caporal';

const logger = consola.create({ level: 5 });

prog.version('1.1.1')
	.name('@tomiocodes/uuid')
	.logger(logger)
	.command('v1', 'Generates a timestamp UUID.')
	.action((_, __, l) => l.log(uuid.v1()))
	.command('v3', 'Generates a MD5 UUID.')
	.argument('<namespace>', 'The namespace.', prog.STRING)
	.argument('<name>', 'The name.', prog.STRING)
	.action(({ namespace, name }, _, l) => l.log(uuid.v3(namespace, name)))
	.command('v4', 'Generates a random UUID.')
	.action((_, __, l) => l.log(uuid.v4()))
	.command('v5', 'Generates a SHA-1 UUID.')
	.argument('<namespace>', 'The namespace.', prog.STRING)
	.argument('<name>', 'The name.', prog.STRING)
	.action(({ namespace, name }, _, l) => l.log(uuid.v3(namespace, name)))
	.command('validate', 'Validates a UUID.')
	.alias('valid')
	.alias('is-valid')
	.argument('<uuid>', 'The UUID.', prog.STRING)
	.action(({ uuid }, _, l) => {
		const isValid = validate(uuid);

		l.info(isValid ? 'That UUID is valid!' : 'The UUID that you provided is invalid.');
	})
	.command('parse', 'Provides information about a UUID.')
	.alias('info')
	.alias('information')
	.argument('<uuid>', 'The UUID.', prog.STRING)
	.action(({ uuid }, _, l) => {
		const parsed = parse(uuid);

		l.info(`Version: ${parsed.version}`);
		l.info(`NIL: ${parsed.isNil ? 'Yes' : 'No'}`);
	})
	.command('blob', 'Converts a UUID to a 22 character URL-friendly blob.')
	.argument('<uuid>', 'The UUID.', prog.STRING)
	.action(({ uuid }, _, l) => l.log(blob(uuid)))
	.command('generate', 'Generates either a 8, 16, 32 byte UUID.')
	.alias('gen')
	.argument('<type>', 'The type.', prog.INT)
	.action(({ type }, _, l) => l.log(uuid.generate(type)));

prog.parse(process.argv);
