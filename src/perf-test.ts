// Quick test to verify the optimized types work correctly
import { camelCase, pascalCase, snakeCase, kebabCase } from './index';

// Test various patterns
const test1 = camelCase("hello-world-foo-bar-baz");
const test2 = pascalCase("some_really_long_variable_name");
const test3 = snakeCase("thisIsAVeryLongCamelCaseIdentifier");
const test4 = kebabCase("MixedCase-with_delimiters");

// Verify types are inferred correctly
type T1 = typeof test1; // Should be string with proper type
type T2 = typeof test2;
type T3 = typeof test3;
type T4 = typeof test4;

console.log('Test 1:', test1);
console.log('Test 2:', test2);
console.log('Test 3:', test3);
console.log('Test 4:', test4);

// Test edge case with lots of segments
const longTest = camelCase("one-two-three-four-five-six-seven-eight-nine-ten");
console.log('Long test:', longTest);
