# convert-case-ts

A TypeScript library for type-safe string case conversion. Each function returns a properly typed result using TypeScript's template literal types.

## Installation

```bash
npm install convert-case-ts
```

## Features

- 🔒 **Type-safe**: Functions return typed results (e.g., `Capitalize<T>`, `Uppercase<T>`)
- 📦 **Lightweight**: No dependencies
- 🎯 **Simple API**: Easy to use with intuitive function names
- 💪 **TypeScript First**: Built with TypeScript for TypeScript projects

## Usage

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
  screamingSnakeCase
} from 'convert-case-ts';

// Simple conversions
const upper = uppercase("hello");
// Type: "HELLO", Value: "HELLO"

const lower = lowercase("HELLO");
// Type: "hello", Value: "hello"

const cap = capitalize("hello world");
// Type: "Hello world", Value: "Hello world"

const uncap = uncapitalize("Hello World");
// Type: "hello World", Value: "hello World"

// Complex case conversions
const camel = camelCase("hello-world");
// Type: CamelCase<"hello-world">, Value: "helloWorld"

const pascal = pascalCase("hello world");
// Type: PascalCase<"hello world">, Value: "HelloWorld"

const snake = snakeCase("helloWorld");
// Type: SnakeCase<"helloWorld">, Value: "hello_world"

const kebab = kebabCase("HelloWorld");
// Type: KebabCase<"HelloWorld">, Value: "hello-world"

const screamingSnake = screamingSnakeCase("helloWorld");
// Type: ScreamingSnakeCase<"helloWorld">, Value: "HELLO_WORLD"
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

## Building

```bash
npm run build
```

## License

MIT
