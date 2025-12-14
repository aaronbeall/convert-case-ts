import { describe, it, expect } from 'vitest';
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
} from './index';

describe('uppercase', () => {
  it('should convert lowercase string to uppercase', () => {
    const result: "HELLO" = uppercase('hello');
    expect(result).toBe('HELLO');
  });

  it('should handle already uppercase string', () => {
    const result: "HELLO" = uppercase('HELLO');
    expect(result).toBe('HELLO');
  });

  it('should handle mixed case string', () => {
    const result: "HELLO WORLD" = uppercase('HeLLo WoRLd');
    expect(result).toBe('HELLO WORLD');
  });

  it('should handle empty string', () => {
    const result: "" = uppercase('');
    expect(result).toBe('');
  });

  it('should handle strings with numbers and symbols', () => {
    const result: "HELLO123!@#" = uppercase('hello123!@#');
    expect(result).toBe('HELLO123!@#');
  });
});

describe('lowercase', () => {
  it('should convert uppercase string to lowercase', () => {
    const result: "hello" = lowercase('HELLO');
    expect(result).toBe('hello');
  });

  it('should handle already lowercase string', () => {
    const result: "hello" = lowercase('hello');
    expect(result).toBe('hello');
  });

  it('should handle mixed case string', () => {
    const result: "hello world" = lowercase('HeLLo WoRLd');
    expect(result).toBe('hello world');
  });

  it('should handle empty string', () => {
    const result: "" = lowercase('');
    expect(result).toBe('');
  });

  it('should handle strings with numbers and symbols', () => {
    const result: "hello123!@#" = lowercase('HELLO123!@#');
    expect(result).toBe('hello123!@#');
  });
});

describe('capitalize', () => {
  it('should capitalize first character of lowercase string', () => {
    const result: "Hello" = capitalize('hello');
    expect(result).toBe('Hello');
  });

  it('should handle already capitalized string', () => {
    const result: "Hello" = capitalize('Hello');
    expect(result).toBe('Hello');
  });

  it('should capitalize only first character', () => {
    const result: "Hello world" = capitalize('hello world');
    expect(result).toBe('Hello world');
  });

  it('should handle single character string', () => {
    const result: "H" = capitalize('h');
    expect(result).toBe('H');
  });

  it('should handle empty string', () => {
    const result: "" = capitalize('');
    expect(result).toBe('');
  });

  it('should handle string starting with number', () => {
    const result: "123hello" = capitalize('123hello');
    expect(result).toBe('123hello');
  });

  it('should handle uppercase string', () => {
    const result: "HELLO" = capitalize('HELLO');
    expect(result).toBe('HELLO');
  });
});

describe('uncapitalize', () => {
  it('should uncapitalize first character of capitalized string', () => {
    const result: "hello" = uncapitalize('Hello');
    expect(result).toBe('hello');
  });

  it('should handle already uncapitalized string', () => {
    const result: "hello" = uncapitalize('hello');
    expect(result).toBe('hello');
  });

  it('should uncapitalize only first character', () => {
    const result: "hello World" = uncapitalize('Hello World');
    expect(result).toBe('hello World');
  });

  it('should handle single character string', () => {
    const result: "h" = uncapitalize('H');
    expect(result).toBe('h');
  });

  it('should handle empty string', () => {
    const result: "" = uncapitalize('');
    expect(result).toBe('');
  });

  it('should handle string starting with number', () => {
    const result: "123Hello" = uncapitalize('123Hello');
    expect(result).toBe('123Hello');
  });

  it('should handle lowercase string', () => {
    const result: "hello" = uncapitalize('hello');
    expect(result).toBe('hello');
  });
});

describe('camelCase', () => {
  it('should convert space-separated words to camelCase', () => {
    const result: "helloWorld" = camelCase('hello world');
    expect(result).toBe('helloWorld');
  });

  it('should convert hyphen-separated words to camelCase', () => {
    const result: "helloWorld" = camelCase('hello-world');
    expect(result).toBe('helloWorld');
  });

  it('should convert underscore-separated words to camelCase', () => {
    const result: "helloWorld" = camelCase('hello_world');
    expect(result).toBe('helloWorld');
  });

  it('should convert PascalCase to camelCase', () => {
    const result: "helloWorld" = camelCase('HelloWorld');
    expect(result).toBe('helloWorld');
  });

  it('should handle already camelCase string', () => {
    const result: "helloWorld" = camelCase('helloWorld');
    expect(result).toBe('helloWorld');
  });

  it('should handle multiple words', () => {
    const result: "helloWorldFooBar" = camelCase('hello world foo bar');
    expect(result).toBe('helloWorldFooBar');
  });

  it('should handle empty string', () => {
    const result: "" = camelCase('');
    expect(result).toBe('');
  });

  it('should handle single word', () => {
    const result: "hello" = camelCase('hello');
    expect(result).toBe('hello');
  });
});

describe('pascalCase', () => {
  it('should convert space-separated words to PascalCase', () => {
    const result: "HelloWorld" = pascalCase('hello world');
    expect(result).toBe('HelloWorld');
  });

  it('should convert hyphen-separated words to PascalCase', () => {
    const result: "HelloWorld" = pascalCase('hello-world');
    expect(result).toBe('HelloWorld');
  });

  it('should convert underscore-separated words to PascalCase', () => {
    const result: "HelloWorld" = pascalCase('hello_world');
    expect(result).toBe('HelloWorld');
  });

  it('should convert camelCase to PascalCase', () => {
    const result: "HelloWorld" = pascalCase('helloWorld');
    expect(result).toBe('HelloWorld');
  });

  it('should handle already PascalCase string', () => {
    const result: "HelloWorld" = pascalCase('HelloWorld');
    expect(result).toBe('HelloWorld');
  });

  it('should handle multiple words', () => {
    const result: "HelloWorldFooBar" = pascalCase('hello world foo bar');
    expect(result).toBe('HelloWorldFooBar');
  });

  it('should handle empty string', () => {
    const result: "" = pascalCase('');
    expect(result).toBe('');
  });

  it('should handle single word', () => {
    const result: "Hello" = pascalCase('hello');
    expect(result).toBe('Hello');
  });
});

describe('snakeCase', () => {
  it('should convert space-separated words to snake_case', () => {
    const result: "hello_world" = snakeCase('hello world');
    expect(result).toBe('hello_world');
  });

  it('should convert hyphen-separated words to snake_case', () => {
    const result: "hello_world" = snakeCase('hello-world');
    expect(result).toBe('hello_world');
  });

  it('should convert camelCase to snake_case', () => {
    const result: "hello_world" = snakeCase('helloWorld');
    expect(result).toBe('hello_world');
  });

  it('should convert PascalCase to snake_case', () => {
    const result: "hello_world" = snakeCase('HelloWorld');
    expect(result).toBe('hello_world');
  });

  it('should handle already snake_case string', () => {
    const result: "hello_world" = snakeCase('hello_world');
    expect(result).toBe('hello_world');
  });

  it('should handle multiple words', () => {
    const result: "hello_world_foo_bar" = snakeCase('hello world foo bar');
    expect(result).toBe('hello_world_foo_bar');
  });

  it('should handle empty string', () => {
    const result: "" = snakeCase('');
    expect(result).toBe('');
  });

  it('should handle single word', () => {
    const result: "hello" = snakeCase('hello');
    expect(result).toBe('hello');
  });
});

describe('kebabCase', () => {
  it('should convert space-separated words to kebab-case', () => {
    const result: "hello-world" = kebabCase('hello world');
    expect(result).toBe('hello-world');
  });

  it('should convert underscore-separated words to kebab-case', () => {
    const result: "hello-world" = kebabCase('hello_world');
    expect(result).toBe('hello-world');
  });

  it('should convert camelCase to kebab-case', () => {
    const result: "hello-world" = kebabCase('helloWorld');
    expect(result).toBe('hello-world');
  });

  it('should convert PascalCase to kebab-case', () => {
    const result: "hello-world" = kebabCase('HelloWorld');
    expect(result).toBe('hello-world');
  });

  it('should handle already kebab-case string', () => {
    const result: "hello-world" = kebabCase('hello-world');
    expect(result).toBe('hello-world');
  });

  it('should handle multiple words', () => {
    const result: "hello-world-foo-bar" = kebabCase('hello world foo bar');
    expect(result).toBe('hello-world-foo-bar');
  });

  it('should handle empty string', () => {
    const result: "" = kebabCase('');
    expect(result).toBe('');
  });

  it('should handle single word', () => {
    const result: "hello" = kebabCase('hello');
    expect(result).toBe('hello');
  });
});

describe('screamingSnakeCase', () => {
  it('should convert space-separated words to SCREAMING_SNAKE_CASE', () => {
    const result: "HELLO_WORLD" = screamingSnakeCase('hello world');
    expect(result).toBe('HELLO_WORLD');
  });

  it('should convert hyphen-separated words to SCREAMING_SNAKE_CASE', () => {
    const result: "HELLO_WORLD" = screamingSnakeCase('hello-world');
    expect(result).toBe('HELLO_WORLD');
  });

  it('should convert camelCase to SCREAMING_SNAKE_CASE', () => {
    const result: "HELLO_WORLD" = screamingSnakeCase('helloWorld');
    expect(result).toBe('HELLO_WORLD');
  });

  it('should convert PascalCase to SCREAMING_SNAKE_CASE', () => {
    const result: "HELLO_WORLD" = screamingSnakeCase('HelloWorld');
    expect(result).toBe('HELLO_WORLD');
  });

  it('should convert snake_case to SCREAMING_SNAKE_CASE', () => {
    const result: "HELLO_WORLD" = screamingSnakeCase('hello_world');
    expect(result).toBe('HELLO_WORLD');
  });

  it('should handle already SCREAMING_SNAKE_CASE string', () => {
    const result: "HELLO_WORLD" = screamingSnakeCase('HELLO_WORLD');
    expect(result).toBe('HELLO_WORLD');
  });

  it('should handle multiple words', () => {
    const result: "HELLO_WORLD_FOO_BAR" = screamingSnakeCase('hello world foo bar');
    expect(result).toBe('HELLO_WORLD_FOO_BAR');
  });

  it('should handle empty string', () => {
    const result: "" = screamingSnakeCase('');
    expect(result).toBe('');
  });

  it('should handle single word', () => {
    const result: "HELLO" = screamingSnakeCase('hello');
    expect(result).toBe('HELLO');
  });
});

// Type safety tests - these should compile without errors
describe('Type safety', () => {
  it('should allow assignment to string type', () => {
    // Results should be assignable to broader string type
    const upper: string = uppercase("hello");
    const lower: string = lowercase("HELLO");
    const cap: string = capitalize("hello");
    const uncap: string = uncapitalize("Hello");
    const camel: string = camelCase("hello-world");
    const pascal: string = pascalCase("hello-world");
    const snake: string = snakeCase("helloWorld");
    const kebab: string = kebabCase("helloWorld");
    const screamingSnake: string = screamingSnakeCase("helloWorld");
    
    expect(upper).toBe("HELLO");
    expect(lower).toBe("hello");
    expect(cap).toBe("Hello");
    expect(uncap).toBe("hello");
    expect(camel).toBe("helloWorld");
    expect(pascal).toBe("HelloWorld");
    expect(snake).toBe("hello_world");
    expect(kebab).toBe("hello-world");
    expect(screamingSnake).toBe("HELLO_WORLD");
  });

  it('should infer correct literal types', () => {
    // TypeScript should infer exact literal types
    const upper = uppercase("hello");
    const lower = lowercase("HELLO");
    const cap = capitalize("hello");
    const uncap = uncapitalize("Hello");
    
    // These type assertions prove the inferred type is correct
    const upperCheck: "HELLO" = upper;
    const lowerCheck: "hello" = lower;
    const capCheck: "Hello" = cap;
    const uncapCheck: "hello" = uncap;
    
    expect(upperCheck).toBe("HELLO");
    expect(lowerCheck).toBe("hello");
    expect(capCheck).toBe("Hello");
    expect(uncapCheck).toBe("hello");
  });

  it('should infer correct types for complex conversions', () => {
    const camel = camelCase("hello-world");
    const pascal = pascalCase("hello-world");
    const snake = snakeCase("helloWorld");
    const kebab = kebabCase("helloWorld");
    const screamingSnake = screamingSnakeCase("helloWorld");
    
    // These type assertions prove the transformations work at type level
    const camelCheck: "helloWorld" = camel;
    const pascalCheck: "HelloWorld" = pascal;
    const snakeCheck: "hello_world" = snake;
    const kebabCheck: "hello-world" = kebab;
    const screamingSnakeCheck: "HELLO_WORLD" = screamingSnake;
    
    expect(camelCheck).toBe("helloWorld");
    expect(pascalCheck).toBe("HelloWorld");
    expect(snakeCheck).toBe("hello_world");
    expect(kebabCheck).toBe("hello-world");
    expect(screamingSnakeCheck).toBe("HELLO_WORLD");
  });

  // Negative tests - these should NOT compile if uncommented
  // Uncomment to verify TypeScript catches type errors
  it('should not allow incorrect literal type assignments (negative test)', () => {
    // These would cause TypeScript compilation errors if uncommented:
    
    // @ts-expect-error - wrong literal type
    const wrongUpper: "hello" = uppercase("hello");
    
    // @ts-expect-error - wrong literal type
    const wrongLower: "HELLO" = lowercase("HELLO");
    
    // @ts-expect-error - wrong literal type
    const wrongCap: "hello" = capitalize("hello");
    
    // @ts-expect-error - wrong literal type
    const wrongCamel: "HelloWorld" = camelCase("hello-world");
    
    // @ts-expect-error - wrong literal type
    const wrongPascal: "helloWorld" = pascalCase("hello-world");
    
    // @ts-expect-error - wrong literal type
    const wrongSnake: "hello-world" = snakeCase("helloWorld");
    
    // @ts-expect-error - wrong literal type
    const wrongKebab: "hello_world" = kebabCase("helloWorld");
    
    // @ts-expect-error - wrong literal type
    const wrongScreamingSnake: "hello_world" = screamingSnakeCase("helloWorld");
    
    // Verify runtime values are still correct
    expect(wrongUpper).toBe("HELLO");
    expect(wrongLower).toBe("hello");
    expect(wrongCap).toBe("Hello");
    expect(wrongCamel).toBe("helloWorld");
    expect(wrongPascal).toBe("HelloWorld");
    expect(wrongSnake).toBe("hello_world");
    expect(wrongKebab).toBe("hello-world");
    expect(wrongScreamingSnake).toBe("HELLO_WORLD");
  });
});
describe('pluralize', () => {
  it('should add s to regular words', () => {
    const result: "items" = pluralize('item');
    expect(result).toBe('items');
  });

  it('should change y to ies', () => {
    const result: "properties" = pluralize('property');
    expect(result).toBe('properties');
  });

  it('should change y to ies for city', () => {
    const result: "cities" = pluralize('city');
    expect(result).toBe('cities');
  });

  it('should add es to words ending in s', () => {
    const result: "classes" = pluralize('class');
    expect(result).toBe('classes');
  });

  it('should add es to words ending in x', () => {
    const result: "indexes" = pluralize('index');
    expect(result).toBe('indexes');
  });

  it('should add es to words ending in z', () => {
    const result: "quizes" = pluralize('quiz');
    expect(result).toBe('quizes');
  });

  it('should add es to words ending in ch', () => {
    const result: "batches" = pluralize('batch');
    expect(result).toBe('batches');
  });

  it('should add es to words ending in sh', () => {
    const result: "hashes" = pluralize('hash');
    expect(result).toBe('hashes');
  });

  it('should handle empty string', () => {
    const result = pluralize('');
    expect(result).toBe('');
  });
});

describe('singularize', () => {
  it('should remove s from regular plural words', () => {
    const result: "item" = singularize('items');
    expect(result).toBe('item');
  });

  it('should change ies back to y', () => {
    const result: "property" = singularize('properties');
    expect(result).toBe('property');
  });

  it('should change cities back to city', () => {
    const result: "city" = singularize('cities');
    expect(result).toBe('city');
  });

  it('should remove es from words ending in xes', () => {
    const result: "index" = singularize('indexes');
    expect(result).toBe('index');
  });

  it('should remove es from words ending in zes', () => {
    const result: "quiz" = singularize('quizes');
    expect(result).toBe('quiz');
  });

  it('should remove es from words ending in ches', () => {
    const result: "batch" = singularize('batches');
    expect(result).toBe('batch');
  });

  it('should remove es from words ending in shes', () => {
    const result: "hash" = singularize('hashes');
    expect(result).toBe('hash');
  });

  it('should remove es from words ending in sses', () => {
    const result: "class" = singularize('classes');
    expect(result).toBe('class');
  });

  it('should handle empty string', () => {
    const result: "" = singularize('');
    expect(result).toBe('');
  });
});