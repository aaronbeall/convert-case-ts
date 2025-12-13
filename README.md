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
import { uppercase, lowercase, capitalize, uncapitalize } from 'convert-case-ts';

// Uppercase conversion
const upper = uppercase("hello");
// Type: "HELLO", Value: "HELLO"

// Lowercase conversion
const lower = lowercase("HELLO");
// Type: "hello", Value: "hello"

// Capitalize first character
const cap = capitalize("hello world");
// Type: "Hello world", Value: "Hello world"

// Uncapitalize first character
const uncap = uncapitalize("Hello World");
// Type: "hello World", Value: "hello World"
```

## API

### `uppercase<T>(str: T): Uppercase<T>`

Converts a string to uppercase.

**Example:**
```typescript
uppercase("hello"); // "HELLO"
```

### `lowercase<T>(str: T): Lowercase<T>`

Converts a string to lowercase.

**Example:**
```typescript
lowercase("HELLO"); // "hello"
```

### `capitalize<T>(str: T): Capitalize<T>`

Capitalizes the first character of a string.

**Example:**
```typescript
capitalize("hello"); // "Hello"
```

### `uncapitalize<T>(str: T): Uncapitalize<T>`

Uncapitalizes the first character of a string.

**Example:**
```typescript
uncapitalize("Hello"); // "hello"
```

## Building

```bash
npm run build
```

## License

MIT
