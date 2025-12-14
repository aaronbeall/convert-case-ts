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
          // Have accumulated text
          : Rest extends `${infer Next}${string}`
            ? Next extends Lowercase<Next>
              ? Lowercase<Next> extends Next
                // Next is lowercase letter - split before this capital
                // e.g., "helloWorld" → split at W, "XMLParser" → split at P
                ? [Acc, ...SplitCamelCase<`${Char}${Rest}`>]
                : SplitCamelCase<Rest, `${Acc}${Char}`>
              // Next is also uppercase - check if Acc is all uppercase
              : Acc extends Lowercase<Acc>
                // Acc is lowercase, split here (e.g., "helloWORLD" → ["hello", "WORLD"])
                ? [Acc, ...SplitCamelCase<`${Char}${Rest}`>]
                // Acc is uppercase, keep accumulating (e.g., "HELLO" stays together)
                : SplitCamelCase<Rest, `${Acc}${Char}`>
            // End of string - combine Acc with Char
            : Acc extends ''
              ? [Char]
              : [`${Acc}${Char}`]
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

/**
 * Converts a string to SCREAMING_SNAKE_CASE type
 */
export type ScreamingSnakeCase<S extends string> = 
  Words<S> extends [infer First extends string, ...infer Rest extends string[]]
    ? `${Uppercase<First>}${ScreamingSnakeCaseRest<Rest>}`
    : Uppercase<S>;

type ScreamingSnakeCaseRest<T extends string[]> = 
  T extends [infer First extends string, ...infer Rest extends string[]]
    ? `_${Uppercase<First>}${ScreamingSnakeCaseRest<Rest>}`
    : '';

/**
 * Converts a string to its plural form
 */
export type Pluralize<S extends string> = 
  S extends `${infer Rest}y`
    ? `${Rest}ies`
    : S extends `${string}${'s' | 'x' | 'z' | 'ch' | 'sh'}`
      ? `${S}es`
      : `${S}s`;

/**
 * Converts a string to its singular form
 */
export type Singularize<S extends string> = 
  S extends `${infer Rest}ies`
    ? `${Rest}y`
    : S extends `${infer Rest}ses`
      ? `${Rest}s`
      : S extends `${infer Rest}xes`
        ? `${Rest}x`
        : S extends `${infer Rest}zes`
          ? `${Rest}z`
          : S extends `${infer Rest}ches`
            ? `${Rest}ch`
            : S extends `${infer Rest}shes`
              ? `${Rest}sh`
              : S extends `${infer Rest}s`
                ? Rest
                : S;

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

/**
 * Converts a string to SCREAMING_SNAKE_CASE with type-safe return type
 * @param str - The string to convert
 * @returns The SCREAMING_SNAKE_CASE version of the string
 * 
 * @example
 * const result = screamingSnakeCase("hello world"); // Type: "HELLO_WORLD"
 * const result2 = screamingSnakeCase("helloWorld"); // Type: "HELLO_WORLD"
 * const result3 = screamingSnakeCase("HelloWorld"); // Type: "HELLO_WORLD"
 */
export function screamingSnakeCase<T extends string>(str: T): ScreamingSnakeCase<T> {
  const words = splitWords(str);
  if (words.length === 0) return '' as ScreamingSnakeCase<T>;
  
  return words
    .map(word => word.toUpperCase())
    .join('_') as ScreamingSnakeCase<T>;
}
/**
 * Converts a string to its plural form with type-safe return type
 * Applies simple pluralization rules suitable for programmatic identifiers
 * 
 * @param str - The string to convert
 * @returns The plural version of the string
 * 
 * @example
 * const result = pluralize("property"); // "properties"
 * const result2 = pluralize("index"); // "indexes"
 * const result3 = pluralize("item"); // "items"
 */
export function pluralize<T extends string>(str: T): Pluralize<T> {
  if (str.length === 0) return '' as any;
  
  // Words ending in y: change to ies
  if (str[str.length - 1] === 'y') {
    return `${str.slice(0, -1)}ies` as Pluralize<T>;
  }
  
  // Words ending in s, x, z, ch, sh: add "es"
  const last = str[str.length - 1];
  const last2 = str.slice(-2);
  if (last === 's' || last === 'x' || last === 'z' || last2 === 'ch' || last2 === 'sh') {
    return `${str}es` as Pluralize<T>;
  }
  
  // Default: add s
  return `${str}s` as Pluralize<T>;
}

/**
 * Converts a string to its singular form with type-safe return type
 * Applies simple singularization rules suitable for programmatic identifiers
 * 
 * @param str - The string to convert
 * @returns The singular version of the string
 * 
 * @example
 * const result = singularize("properties"); // "property"
 * const result2 = singularize("indexes"); // "index"
 * const result3 = singularize("items"); // "item"
 */
export function singularize<T extends string>(str: T): Singularize<T> {
  if (str.length === 0) return str as Singularize<T>;
  
  const s = str as string;
  
  // Words ending in ies: change to y
  if (s.endsWith('ies') && s.length > 3) {
    return `${s.slice(0, -3)}y` as Singularize<T>;
  }
  
  // Words ending in ses, xes, zes, ches, shes: remove es
  if (s.endsWith('es') && s.length > 2) {
    const before = s.slice(-4, -2);
    if (before === 'ch' || before === 'sh' || before === 'ss') {
      return s.slice(0, -2) as Singularize<T>;
    }
    const charBefore = s[s.length - 3];
    if (charBefore === 's' || charBefore === 'x' || charBefore === 'z') {
      return s.slice(0, -2) as Singularize<T>;
    }
  }
  
  // Words ending in s: remove s
  if (s.endsWith('s') && s.length > 1) {
    return s.slice(0, -1) as Singularize<T>;
  }
  
  // Default: return as-is
  return s as Singularize<T>;
}