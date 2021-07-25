import { loadBinding } from '@node-rs/helper';
import { join } from 'path';

const native = loadBinding(join(__dirname, '..'), 'uuid', '@tomiocodes/uuid');

/** The available namespaces. */
export const enum Namespace {
	URL = 'url',
	OID = 'oid',
	DNS = 'dns',
	X500 = 'x500'
}

/**
 * The UUID Regex.
 * @type {RegExp}
 * @raw `/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i`
 */
export const uuidRegex = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;

/**
 * The NIL uuid.
 * @type {string}
 * @raw `00000000-0000-0000-0000-000000000000`
 */
export const NIL = native.NIL as string;

/**
 * Generates a timestamp UUID.
 * @param {Date} [date] The date.
 * @returns {string} The uuid.
 * @example ```js
 * const { v1 } = require('@tomiocodes/uuid');
 *
 * console.log(v1());
 * ```
 */
export const v1 = (date: Date = new Date()): string => native.v1(date.getTime());

/**
 * Generates a MD5 UUID.
 * @param {string} namespace The namespace.
 * @param {string} name The name.
 * @returns {string} The uuid.
 * @example ```js
 * const { v3, Namespace } = require('@tomiocodes/uuid');
 *
 * console.log(v3(Namespace.URL, 'https://tomio.codes'));
 * ```
 */
export const v3 = (namespace: Namespace | string, name: string): string => native.v3(namespace, name);

/**
 * Generates a random UUID.
 * @returns {string} The uuid.
 * @example ```js
 * const { v4 } = require('@tomiocodes/uuid');
 *
 * console.log(v4());
 * ```
 */
export const v4 = (): string => native.v4();

/**
 * Generates a SHA-1 UUID.
 * @param {string} namespace The namespace.
 * @param {string} name The name.
 * @returns {string} The uuid.
 * @example ```js
 * const { v5, Namespace } = require('@tomiocdoes/uuid');
 *
 * console.log(v5(Namespace.URL, 'https://tomio.codes'));
 * ```
 */
export const v5 = (namespace: Namespace | string, name: string): string => native.v5(namespace, name);

/**
 * Validates a UUID.
 * @param {string} uuid The uuid to validate.
 * @returns {boolean} If the uuid is valid.
 */
export const validate = (uuid: string): boolean => uuidRegex.test(uuid);

/**
 * Provides information about a UUID.
 * @param {string} uuid The uuid.
 * @returns {ParseResponse} The information.
 */
export const parse = (uuid: string): ParseResponse => {
	if (!validate(uuid)) throw new Error('Invalid UUID.');

	return native.parse(uuid);
};

/**
 * Converts a UUID to a 22 character URL-friendly blob.
 * @param {string} uuid The uuid.
 * @returns {string} The blob.
 */
export const blob = (uuid: string): string => {
	if (!validate(uuid)) throw new Error('Invalid UUID.');

	return native.blob(uuid);
};

/**
 * Generates either a 8, 16, 32 byte UUID.
 * @param {8|16|32} type The type.
 * @returns {string} The uuid.
 */
export const generate = (type: 8 | 16 | 32): string => {
	switch (type) {
		case 8:
			return native.gen8b();
		case 16:
			return native.gen16b();
		case 32:
			return native.gen32b();
		default:
			throw new TypeError('Invalid type.');
	}
};

export type Nullable<T> = T | null;

export interface ParseResponse {
	/** If the uuid is NIL. */
	isNil: boolean;

	/** The version of the uuid. */
	version: string;

	/** The timestamp of the uuid. */
	timestamp: Nullable<number>;
}

export default {
	uuidRegex,
	NIL,
	v1,
	v3,
	v4,
	v5,
	parse,
	validate,
	blob,
	generate
};
