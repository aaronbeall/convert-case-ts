// ============================================================================
// Type Utilities
// ============================================================================

/**
 * Phase 1: Split string by delimiters (space, hyphen, underscore)
 * This is much faster than processing every character
 */
type SplitByDelimiters<S extends string> = 
  S extends `${infer Word}${' ' | '-' | '_'}${infer Rest}`
    ? Word extends ''
      ? SplitByDelimiters<Rest>  // Skip empty segments
      : [Word, ...SplitByDelimiters<Rest>]
    : S extends '' 
      ? [] 
      : [S];

/**
 * Phase 2: Split a single segment by camelCase/PascalCase boundaries
 * Only processes segments without delimiters, reducing total recursion
 */
type SplitCamelCase<S extends string, Acc extends string = ''> = 
  S extends `${infer Char}${infer Rest}`
    ? Char extends Uppercase<Char>
      ? Lowercase<Char> extends Char
        // Not a letter (number/symbol), accumulate it
        ? SplitCamelCase<Rest, `${Acc}${Char}`>
        // Uppercase letter
        : Acc extends ''
          // Start of segment with uppercase
          ? SplitCamelCase<Rest, Char>
          // Have accumulated lowercase word
          : Rest extends `${infer Next}${string}`
            ? Next extends Lowercase<Next>
              ? Lowercase<Next> extends Next
                // Next is lowercase letter - split before this capital
                // e.g., "helloWorld" → split at W
                ? [Acc, ...SplitCamelCase<`${Char}${Rest}`>]
                : SplitCamelCase<Rest, `${Acc}${Char}`>
              // Next is uppercase - split here
              // e.g., "XMLParser" → split between L and P
              : [Acc, ...SplitCamelCase<`${Char}${Rest}`>]
            : [Acc, Char]  // End of string
      // Lowercase or non-letter, accumulate
      : SplitCamelCase<Rest, `${Acc}${Char}`>
    : Acc extends ''
      ? []
      : [Acc];

/**
 * Apply camelCase splitting to each delimiter-split segment
 */
type SplitSegments<T extends string[]> = 
  T extends [infer First extends string, ...infer Rest extends string[]]
    ? [...SplitCamelCase<First>, ...SplitSegments<Rest>]
    : [];

/**
 * Two-phase word splitting: delimiters first, then camelCase
 * This reduces recursion depth significantly for typical strings
 */
type Words<S extends string> = SplitSegments<SplitByDelimiters<S>>;

/**
 * Converts a string to camelCase type
 */
export type CamelCase<S extends string> = 
  Words<S> extends [infer First extends string, ...infer Rest extends string[]]
    ? `${Lowercase<First>}${CamelCaseRest<Rest>}`
    : Lowercase<S>;

type CamelCaseRest<T extends string[]> = 
  T extends [infer First extends string, ...infer Rest extends string[]]
    ? `${Capitalize<Lowercase<First>>}${CamelCaseRest<Rest>}`
    : '';

/**
 * Converts a string to PascalCase type
 */
export type PascalCase<S extends string> = 
  Words<S> extends [infer First extends string, ...infer Rest extends string[]]
    ? `${Capitalize<Lowercase<First>>}${CamelCaseRest<Rest>}`
    : Capitalize<Lowercase<S>>;

/**
 * Converts a string to snake_case type
 */
export type SnakeCase<S extends string> = 
  Words<S> extends [infer First extends string, ...infer Rest extends string[]]
    ? `${Lowercase<First>}${SnakeCaseRest<Rest>}`
    : Lowercase<S>;

type SnakeCaseRest<T extends string[]> = 
  T extends [infer First extends string, ...infer Rest extends string[]]
    ? `_${Lowercase<First>}${SnakeCaseRest<Rest>}`
    : '';

/**
 * Converts a string to kebab-case type
 */
export type KebabCase<S extends string> = 
  Words<S> extends [infer First extends string, ...infer Rest extends string[]]
    ? `${Lowercase<First>}${KebabCaseRest<Rest>}`
    : Lowercase<S>;

type KebabCaseRest<T extends string[]> = 
  T extends [infer First extends string, ...infer Rest extends string[]]
    ? `-${Lowercase<First>}${KebabCaseRest<Rest>}`
    : '';

// ============================================================================
// Simple Case Conversions
// ============================================================================

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

// ============================================================================
// Complex Case Conversions
// ============================================================================

/**
 * Helper to split string into words based on delimiters and capital letters
 */
function splitWords(str: string): string[] {
  // Split by common delimiters and handle camelCase/PascalCase
  return str
    .replace(/([a-z])([A-Z])/g, '$1 $2') // Split camelCase
    .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2') // Split PascalCase
    .split(/[\s_-]+/) // Split by space, underscore, hyphen
    .filter(Boolean); // Remove empty strings
}

/**
 * Converts a string to camelCase with type-safe return type
 * @param str - The string to convert
 * @returns The camelCase version of the string
 * 
 * @example
 * const result = camelCase("hello world"); // Type: "helloWorld"
 * const result2 = camelCase("hello-world"); // Type: "helloWorld"
 * const result3 = camelCase("HelloWorld"); // Type: "helloWorld"
 */
export function camelCase<T extends string>(str: T): CamelCase<T> {
  const words = splitWords(str);
  if (words.length === 0) return '' as CamelCase<T>;
  
  return words
    .map((word, index) => 
      index === 0 
        ? word.toLowerCase() 
        : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join('') as CamelCase<T>;
}

/**
 * Converts a string to PascalCase with type-safe return type
 * @param str - The string to convert
 * @returns The PascalCase version of the string
 * 
 * @example
 * const result = pascalCase("hello world"); // Type: "HelloWorld"
 * const result2 = pascalCase("hello-world"); // Type: "HelloWorld"
 * const result3 = pascalCase("helloWorld"); // Type: "HelloWorld"
 */
export function pascalCase<T extends string>(str: T): PascalCase<T> {
  const words = splitWords(str);
  if (words.length === 0) return '' as PascalCase<T>;
  
  return words
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('') as PascalCase<T>;
}

/**
 * Converts a string to snake_case with type-safe return type
 * @param str - The string to convert
 * @returns The snake_case version of the string
 * 
 * @example
 * const result = snakeCase("hello world"); // Type: "hello_world"
 * const result2 = snakeCase("helloWorld"); // Type: "hello_world"
 * const result3 = snakeCase("HelloWorld"); // Type: "hello_world"
 */
export function snakeCase<T extends string>(str: T): SnakeCase<T> {
  const words = splitWords(str);
  if (words.length === 0) return '' as SnakeCase<T>;
  
  return words
    .map(word => word.toLowerCase())
    .join('_') as SnakeCase<T>;
}

/**
 * Converts a string to kebab-case with type-safe return type
 * @param str - The string to convert
 * @returns The kebab-case version of the string
 * 
 * @example
 * const result = kebabCase("hello world"); // Type: "hello-world"
 * const result2 = kebabCase("helloWorld"); // Type: "hello-world"
 * const result3 = kebabCase("HelloWorld"); // Type: "hello-world"
 */
export function kebabCase<T extends string>(str: T): KebabCase<T> {
  const words = splitWords(str);
  if (words.length === 0) return '' as KebabCase<T>;
  
  return words
    .map(word => word.toLowerCase())
    .join('-') as KebabCase<T>;
}
