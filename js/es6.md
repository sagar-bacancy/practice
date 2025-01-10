# JavaScript ES6 Concepts Guide

## Table of Contents
- [JavaScript ES6 Concepts Guide](#javascript-es6-concepts-guide)
  - [Table of Contents](#table-of-contents)
  - [Let and Const](#let-and-const)
  - [Arrow Functions](#arrow-functions)
  - [Template Literals](#template-literals)
  - [Destructuring](#destructuring)
  - [Default Parameters](#default-parameters)
  - [Rest and Spread Operators](#rest-and-spread-operators)
  - [Classes](#classes)
  - [Modules](#modules)
  - [Promises](#promises)
  - [Symbol](#symbol)
  - [Iterators and Generators](#iterators-and-generators)
  - [Set and Map](#set-and-map)
  - [For...of Loop](#forof-loop)
  - [Array Methods](#array-methods)
  - [Object Methods](#object-methods)

---

## Let and Const

ES6 introduces `let` and `const` for declaring variables. These are block-scoped and offer better control over variable scoping compared to `var`.

- **`let`** is used to declare variables that can be reassigned.
- **`const`** is used to declare constants whose values cannot be reassigned.

```javascript
let name = "John";
name = "Jane"; // Reassigns successfully

const age = 30;
age = 25; // Error: Assignment to constant variable.
```

---

## Arrow Functions

Arrow functions provide a shorter syntax for writing functions and automatically bind the value of `this`.

```javascript
const add = (a, b) => a + b;
const greet = () => console.log("Hello, World!");
```

Arrow functions are especially useful in callbacks and higher-order functions, as they don’t have their own `this` context.

---

## Template Literals

Template literals allow for easier string interpolation and multi-line strings.

```javascript
const name = "Alice";
const greeting = `Hello, ${name}! Welcome to ES6.`;
```

You can also create multi-line strings without needing to concatenate.

```javascript
const message = `
  This is a multi-line
  template literal example.
`;
```

---

## Destructuring

Destructuring allows you to extract values from arrays or objects into variables.

- **Array Destructuring**:

```javascript
const numbers = [1, 2, 3];
const [a, b, c] = numbers;
```

- **Object Destructuring**:

```javascript
const person = { name: "John", age: 30 };
const { name, age } = person;
```

Destructuring makes it easier to work with complex data structures.

---

## Default Parameters

ES6 allows you to set default values for function parameters.

```javascript
function greet(name = "Guest") {
  console.log(`Hello, ${name}`);
}

greet(); // Output: Hello, Guest
greet("Alice"); // Output: Hello, Alice
```

---

## Rest and Spread Operators

- **Rest Operator** (`...`) collects arguments into an array (in functions) or collects remaining properties (in objects).

```javascript
// Function Rest Parameter
function sum(...numbers) {
  return numbers.reduce((a, b) => a + b, 0);
}

console.log(sum(1, 2, 3)); // Output: 6
```

- **Spread Operator** (`...`) is used to unpack elements from an array or object.

```javascript
// Spread in Arrays
const nums = [1, 2, 3];
const newNums = [...nums, 4, 5];

console.log(newNums); // Output: [1, 2, 3, 4, 5]
```

---

## Classes

ES6 introduces classes as syntactic sugar over traditional constructor functions.

```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    console.log(`Hello, I'm ${this.name}`);
  }
}

const person = new Person("John", 30);
person.greet(); // Output: Hello, I'm John
```

---

## Modules

ES6 modules allow you to export and import code from different files, making the code more modular.

- **Export**:

```javascript
// person.js
export const name = "John";
export function greet() {
  console.log("Hello!");
}
```

- **Import**:

```javascript
// app.js
import { name, greet } from './person';

console.log(name); // Output: John
greet(); // Output: Hello!
```

Modules improve code organization and readability.

---

## Promises

Promises provide a way to handle asynchronous operations more cleanly than callbacks.

```javascript
const fetchData = new Promise((resolve, reject) => {
  let success = true;
  if (success) {
    resolve("Data fetched successfully!");
  } else {
    reject("Error fetching data");
  }
});

fetchData.then(result => console.log(result))
         .catch(error => console.log(error));
```

---

## Symbol

Symbols are unique and immutable primitive values used primarily as object property keys.

```javascript
const uniqueId = Symbol('id');
const person = {
  [uniqueId]: 1,
  name: 'John',
};

console.log(person[uniqueId]); // Output: 1
```

Symbols help avoid naming collisions in object properties.

---

## Iterators and Generators

- **Iterators**: Objects that define a sequence of values and how to access them.

```javascript
const numbers = [1, 2, 3];
const iterator = numbers[Symbol.iterator]();
console.log(iterator.next().value); // Output: 1
```

- **Generators**: Functions that can be paused and resumed, allowing for lazy evaluation.

```javascript
function* generator() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = generator();
console.log(gen.next().value); // Output: 1
```

---

## Set and Map

- **Set**: A collection of unique values.

```javascript
const uniqueSet = new Set([1, 2, 2, 3]);
console.log(uniqueSet); // Output: Set {1, 2, 3}
```

- **Map**: A collection of key-value pairs.

```javascript
const map = new Map();
map.set('name', 'John');
map.set('age', 30);

console.log(map.get('name')); // Output: John
```

---

## For...of Loop

The `for...of` loop is used to iterate over iterable objects like arrays, strings, and maps.

```javascript
const arr = [1, 2, 3];

for (const num of arr) {
  console.log(num); // Output: 1, 2, 3
}
```

The `for...of` loop is more intuitive for working with arrays and other iterables compared to the traditional `for` loop.

---

## Array Methods

ES6 introduces several useful methods for working with arrays:

- **`find()`**: Returns the first element that satisfies a condition.
  
```javascript
const arr = [1, 2, 3, 4];
const result = arr.find(num => num > 2);
console.log(result); // Output: 3
```

- **`includes()`**: Checks if an array contains a certain element.
  
```javascript
const arr = [1, 2, 3];
console.log(arr.includes(2)); // Output: true
```

---

## Object Methods

ES6 introduces new methods for working with objects:

- **`Object.assign()`**: Copies values from one or more source objects to a target object. This method performs a shallow copy, not a deep copy.

```javascript
const target = { name: "John" };
const source = { age: 30 };
const result = Object.assign(target, source);
console.log(result); // Output: { name: "John", age: 30 }
```

- **`Object.entries()`**: Converts an object into an array of key-value pairs.

```javascript
const obj = { name: "John", age: 30 };
const entries = Object.entries(obj);
console.log(entries); // Output: [["name", "John"], ["age", 30]]
```

---

This concludes the ES6 JavaScript concepts guide. These features significantly improve the readability, maintainability, and performance of JavaScript code.
