// Demo file to showcase type-safe case conversions
import { 
  uppercase, 
  lowercase, 
  capitalize, 
  uncapitalize,
  camelCase,
  pascalCase,
  snakeCase,
  kebabCase,
  type CamelCase,
  type PascalCase,
  type SnakeCase,
  type KebabCase
} from './index';

// Simple conversions with literal types preserved
const upper = uppercase("hello");  // Type: "HELLO"
const lower = lowercase("WORLD");  // Type: "world"
const cap = capitalize("typescript");  // Type: "Typescript"
const uncap = uncapitalize("Hello");  // Type: "hello"

console.log('Simple conversions:');
console.log('uppercase("hello"):', upper);
console.log('lowercase("WORLD"):', lower);
console.log('capitalize("typescript"):', cap);
console.log('uncapitalize("Hello"):', uncap);

// Complex case conversions
const camel = camelCase("hello-world");  // Type: CamelCase<"hello-world">
const pascal = pascalCase("hello_world");  // Type: PascalCase<"hello_world">
const snake = snakeCase("helloWorld");  // Type: SnakeCase<"helloWorld">
const kebab = kebabCase("HelloWorld");  // Type: KebabCase<"HelloWorld">

console.log('\nComplex conversions:');
console.log('camelCase("hello-world"):', camel);
console.log('pascalCase("hello_world"):', pascal);
console.log('snakeCase("helloWorld"):', snake);
console.log('kebabCase("HelloWorld"):', kebab);

// Converting between different formats
const apiEndpoint = "getUserProfile";
console.log('\nConverting API endpoint:', apiEndpoint);
console.log('  → snake_case:', snakeCase(apiEndpoint));  // "get_user_profile"
console.log('  → kebab-case:', kebabCase(apiEndpoint));  // "get-user-profile"
console.log('  → PascalCase:', pascalCase(apiEndpoint));  // "GetUserProfile"

// Using type utilities directly
type MyApiRoute = "user/get-profile";
type MyFunctionName = CamelCase<MyApiRoute>;  // Type-level transformation
// MyFunctionName is now the type "user/getProfile"

console.log('\nType utilities can be used directly in type definitions!');
