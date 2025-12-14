# convert-case-ts

A TypeScript library for type-safe string case conversion. Each function returns a properly typed result using TypeScript's template literal types, for example `capitalize("hello")` returns `Capitalize<"hello">` (literal type `"Hello"`).

Suitable for dynamically transforming programmatic identifiers in a type-safe way.

## Installation

```bash
npm install convert-case-ts
```

## Features

- 🔒 **Type-safe**: Functions return typed results (e.g., `Capitalize<T>`, `Uppercase<T>`)
- 📦 **Lightweight**: No dependencies
- 🎯 **Simple API**: Easy to use with intuitive function names
- 💪 **TypeScript First**: Built with TypeScript for TypeScript projects

## Basic Usage

```typescript
import { 
  uppercase, 
  lowercase, 
  capitalize, 
  uncapitalize,
  camelCase,
  pascalCase,
  snakeCase,
  kebabCase,
  screamingSnakeCase,
  pluralize,
  singularize
} from 'convert-case-ts';

// Simple conversions
const upper = uppercase("hello");
//    ^? const upper: "HELLO" = "HELLO"

const lower = lowercase("HELLO");
//    ^? const lower: "hello" = "hello"

const cap = capitalize("hello world");
//    ^? const cap: "Hello world" = "Hello world"

const uncap = uncapitalize("Hello World");
//    ^? const uncap: "hello World" = "hello World"

// Complex case conversions
const camel = camelCase("hello-world");
//    ^? const camel: "helloWorld" = "helloWorld"

const pascal = pascalCase("hello world");
//    ^? const pascal: "HelloWorld" = "HelloWorld"

const snake = snakeCase("helloWorld");
//    ^? const snake: "hello_world" = "hello_world"

const kebab = kebabCase("HelloWorld");
//    ^? const kebab: "hello-world" = "hello-world"

const screamingSnake = screamingSnakeCase("helloWorld");
//    ^? const screamingSnake: "HELLO_WORLD" = "HELLO_WORLD"

// Pluralization
const plural = pluralize("property");
//    ^? const plural: "properties" = "properties"

const singular = singularize("items");
//    ^? const singular: "item" = "item"

```

## Practical Example

Because the conversion methods and returns types are kept in sync, you can use them to easily create mapped APIs based on source keys. 

```ts
// Create type-safe API methods and constants from a key
function createAccessors<K extends string>(key: K) {
  const camel = camelCase(key);
  const pascal = pascalCase(key);
  const screaming = screamingSnakeCase(key);
  
  return {
    getter: `get${pascal}` as const,
    setter: `set${pascal}` as const,
    constant: screaming,
    property: camel,
  };
}

const userApi = createAccessors("user-profile");
//    ^? const userApi: {
//         getter: "getUserProfile";
//         setter: "setUserProfile";
//         constant: "USER_PROFILE";
//         property: "userProfile";
//       }

// Use the type-safe names
const handlers = {
  [userApi.getter]: () => ({ name: "John" }),
  [userApi.setter]: (data: unknown) => console.log(data),
};
//    ^? const handlers: {
//         getUserProfile: () => { name: string; };
//         setUserProfile: (data: unknown) => void;
//       }
```
## Type Usage Example

The complex case conversion types can be used to accurately map types coming from other systems, like CSS-in-JS systems, without directly using the conversion functions.

```ts
import type { CamelCase, KebabCase } from 'convert-case-ts';

// Convert CSS kebab-case properties to JavaScript camelCase
type CSSPropsToJS<T> = {
  [K in keyof T as CamelCase<K & string>]: T[K];
};

// Define CSS custom properties (CSS variables)
interface CSSCustomProperties {
  '--primary-color': string;
  '--background-color': string;
  '--font-family': string;
  '--border-radius': string;
  '--max-width': string;
  '--z-index': number;
}

// Automatically get camelCase JavaScript property names
type ThemeProps = CSSPropsToJS<CSSCustomProperties>;
//   ^? type ThemeProps = {
//        primaryColor: string;
//        backgroundColor: string;
//        fontFamily: string;
//        borderRadius: string;
//        maxWidth: string;
//        zIndex: number;
//      }

// Use in a typed theme configuration
const theme: ThemeProps = {
  primaryColor: '#007bff',
  backgroundColor: '#ffffff',
  fontFamily: 'Inter, sans-serif',
  borderRadius: '8px',
  maxWidth: '1200px',
  zIndex: 1000,
};

// Convert back to CSS variable names for style injection
type ToCSSVars<T> = {
  [K in keyof T as `--${KebabCase<K & string>}`]: T[K];
};

type CSSVars = ToCSSVars<ThemeProps>;
//   ^? type CSSVars = {
//        "--primary-color": string;
//        "--background-color": string;
//        "--font-family": string;
//        "--border-radius": string;
//        "--max-width": string;
//        "--z-index": number;
//      }
```

## API

### Simple Case Conversions

#### `uppercase<T>(str: T): Uppercase<T>`

Converts a string to uppercase.

**Example:**
```typescript
uppercase("hello"); // "HELLO"
```

#### `lowercase<T>(str: T): Lowercase<T>`

Converts a string to lowercase.

**Example:**
```typescript
lowercase("HELLO"); // "hello"
```

#### `capitalize<T>(str: T): Capitalize<T>`

Capitalizes the first character of a string.

**Example:**
```typescript
capitalize("hello"); // "Hello"
```

#### `uncapitalize<T>(str: T): Uncapitalize<T>`

Uncapitalizes the first character of a string.

**Example:**
```typescript
uncapitalize("Hello"); // "hello"
```

### Complex Case Conversions

#### `camelCase<T>(str: T): CamelCase<T>`

Converts a string to camelCase. Handles space, hyphen, and underscore-separated words, as well as PascalCase input.

**Examples:**
```typescript
camelCase("hello world");   // "helloWorld"
camelCase("hello-world");   // "helloWorld"
camelCase("hello_world");   // "helloWorld"
camelCase("HelloWorld");    // "helloWorld"
```

#### `pascalCase<T>(str: T): PascalCase<T>`

Converts a string to PascalCase. Handles space, hyphen, and underscore-separated words, as well as camelCase input.

**Examples:**
```typescript
pascalCase("hello world");  // "HelloWorld"
pascalCase("hello-world");  // "HelloWorld"
pascalCase("hello_world");  // "HelloWorld"
pascalCase("helloWorld");   // "HelloWorld"
```

#### `snakeCase<T>(str: T): SnakeCase<T>`

Converts a string to snake_case. Handles space, hyphen-separated words, camelCase, and PascalCase input.

**Examples:**
```typescript
snakeCase("hello world");   // "hello_world"
snakeCase("hello-world");   // "hello_world"
snakeCase("helloWorld");    // "hello_world"
snakeCase("HelloWorld");    // "hello_world"
```

#### `kebabCase<T>(str: T): KebabCase<T>`

Converts a string to kebab-case. Handles space, underscore-separated words, camelCase, and PascalCase input.

**Examples:**
```typescript
kebabCase("hello world");   // "hello-world"
kebabCase("hello_world");   // "hello-world"
kebabCase("helloWorld");    // "hello-world"
kebabCase("HelloWorld");    // "hello-world"
```

#### `screamingSnakeCase<T>(str: T): ScreamingSnakeCase<T>`

Converts a string to SCREAMING_SNAKE_CASE. Handles space, hyphen, and underscore-separated words, as well as camelCase and PascalCase input.

**Examples:**
```typescript
screamingSnakeCase("hello world");   // "HELLO_WORLD"
screamingSnakeCase("hello-world");   // "HELLO_WORLD"
screamingSnakeCase("helloWorld");    // "HELLO_WORLD"
screamingSnakeCase("HelloWorld");    // "HELLO_WORLD"
```
### Pluralization

#### `pluralize<T>(str: T): Pluralize<T>`

Converts a string to its plural form using simple pluralization rules suitable for programmatic identifiers.

**Rules:**
- Words ending in `y` → `ies` (property → properties)
- Words ending in `s`, `x`, `z`, `ch`, `sh` → add `es` (class → classes, index → indexes)
- Default → add `s` (item → items)

**Examples:**
```typescript
pluralize("property");  // "properties"
pluralize("index");     // "indexes"
pluralize("item");      // "items"
pluralize("class");     // "classes"
pluralize("batch");     // "batches"
```

#### `singularize<T>(str: T): Singularize<T>`

Converts a string to its singular form using simple singularization rules suitable for programmatic identifiers.

**Rules:**
- Words ending in `ies` → `y` (properties → property)
- Words ending in `ses`, `xes`, `zes`, `ches`, `shes` → remove `es` (classes → class, indexes → index)
- Words ending in `s` → remove `s` (items → item)

**Examples:**
```typescript
singularize("properties");  // "property"
singularize("indexes");     // "index"
singularize("items");       // "item"
singularize("classes");     // "class"
singularize("batches");     // "batch"
```
## Building

```bash
npm run build
```

## License

MIT
