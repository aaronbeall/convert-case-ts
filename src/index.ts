/**
 * Converts a string to uppercase with type-safe return type
 * @param str - The string to convert
 * @returns The uppercase version of the string
 * 
 * @example
 * const result = uppercase("hello"); // Type: "HELLO"
 */
export function uppercase<T extends string>(str: T): Uppercase<T> {
  return str.toUpperCase() as Uppercase<T>;
}

/**
 * Converts a string to lowercase with type-safe return type
 * @param str - The string to convert
 * @returns The lowercase version of the string
 * 
 * @example
 * const result = lowercase("HELLO"); // Type: "hello"
 */
export function lowercase<T extends string>(str: T): Lowercase<T> {
  return str.toLowerCase() as Lowercase<T>;
}

/**
 * Capitalizes the first character of a string with type-safe return type
 * @param str - The string to capitalize
 * @returns The capitalized version of the string
 * 
 * @example
 * const result = capitalize("hello"); // Type: "Hello"
 */
export function capitalize<T extends string>(str: T): Capitalize<T> {
  return `${ str.charAt(0).toUpperCase() }${ str.slice(1) }` as Capitalize<T>;
}

/**
 * Uncapitalizes the first character of a string with type-safe return type
 * @param str - The string to uncapitalize
 * @returns The uncapitalized version of the string
 * 
 * @example
 * const result = uncapitalize("Hello"); // Type: "hello"
 */
export function uncapitalize<T extends string>(str: T): Uncapitalize<T> {
  return `${ str.charAt(0).toLowerCase() }${ str.slice(1) }` as Uncapitalize<T>;
}
