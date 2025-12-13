import { describe, it, expect } from 'vitest';
import { uppercase, lowercase, capitalize, uncapitalize } from './index';

describe('uppercase', () => {
  it('should convert lowercase string to uppercase', () => {
    const result = uppercase('hello');
    expect(result).toBe('HELLO');
  });

  it('should handle already uppercase string', () => {
    const result = uppercase('HELLO');
    expect(result).toBe('HELLO');
  });

  it('should handle mixed case string', () => {
    const result = uppercase('HeLLo WoRLd');
    expect(result).toBe('HELLO WORLD');
  });

  it('should handle empty string', () => {
    const result = uppercase('');
    expect(result).toBe('');
  });

  it('should handle strings with numbers and symbols', () => {
    const result = uppercase('hello123!@#');
    expect(result).toBe('HELLO123!@#');
  });
});

describe('lowercase', () => {
  it('should convert uppercase string to lowercase', () => {
    const result = lowercase('HELLO');
    expect(result).toBe('hello');
  });

  it('should handle already lowercase string', () => {
    const result = lowercase('hello');
    expect(result).toBe('hello');
  });

  it('should handle mixed case string', () => {
    const result = lowercase('HeLLo WoRLd');
    expect(result).toBe('hello world');
  });

  it('should handle empty string', () => {
    const result = lowercase('');
    expect(result).toBe('');
  });

  it('should handle strings with numbers and symbols', () => {
    const result = lowercase('HELLO123!@#');
    expect(result).toBe('hello123!@#');
  });
});

describe('capitalize', () => {
  it('should capitalize first character of lowercase string', () => {
    const result = capitalize('hello');
    expect(result).toBe('Hello');
  });

  it('should handle already capitalized string', () => {
    const result = capitalize('Hello');
    expect(result).toBe('Hello');
  });

  it('should capitalize only first character', () => {
    const result = capitalize('hello world');
    expect(result).toBe('Hello world');
  });

  it('should handle single character string', () => {
    const result = capitalize('h');
    expect(result).toBe('H');
  });

  it('should handle empty string', () => {
    const result = capitalize('');
    expect(result).toBe('');
  });

  it('should handle string starting with number', () => {
    const result = capitalize('123hello');
    expect(result).toBe('123hello');
  });

  it('should handle uppercase string', () => {
    const result = capitalize('HELLO');
    expect(result).toBe('HELLO');
  });
});

describe('uncapitalize', () => {
  it('should uncapitalize first character of capitalized string', () => {
    const result = uncapitalize('Hello');
    expect(result).toBe('hello');
  });

  it('should handle already uncapitalized string', () => {
    const result = uncapitalize('hello');
    expect(result).toBe('hello');
  });

  it('should uncapitalize only first character', () => {
    const result = uncapitalize('Hello World');
    expect(result).toBe('hello World');
  });

  it('should handle single character string', () => {
    const result = uncapitalize('H');
    expect(result).toBe('h');
  });

  it('should handle empty string', () => {
    const result = uncapitalize('');
    expect(result).toBe('');
  });

  it('should handle string starting with number', () => {
    const result = uncapitalize('123Hello');
    expect(result).toBe('123Hello');
  });

  it('should handle lowercase string', () => {
    const result = uncapitalize('hello');
    expect(result).toBe('hello');
  });
});

// Type safety tests - these should compile without errors
describe('Type safety', () => {
  it('should have correct return types', () => {
    // These assertions verify that TypeScript infers the correct types
    const upper: "HELLO" = uppercase("hello");
    const lower: "hello" = lowercase("HELLO");
    const cap: "Hello" = capitalize("hello");
    const uncap: "hello" = uncapitalize("Hello");
    
    expect(upper).toBe("HELLO");
    expect(lower).toBe("hello");
    expect(cap).toBe("Hello");
    expect(uncap).toBe("hello");
  });
});
