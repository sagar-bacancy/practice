# SCSS (Sassy CSS) Topics Guide

## Table of Contents
- [SCSS (Sassy CSS) Topics Guide](#scss-sassy-css-topics-guide)
  - [Table of Contents](#table-of-contents)
  - [Introduction to SCSS](#introduction-to-scss)
  - [Variables](#variables)
  - [Nesting](#nesting)
  - [Partials](#partials)
  - [Imports](#imports)
  - [Mixins](#mixins)
  - [Extend/Inheritance](#extendinheritance)
  - [Operators](#operators)
  - [Control Directives](#control-directives)
    - [`@if` and `@else`](#if-and-else)
    - [`@for`](#for)
  - [Functions](#functions)
  - [Placeholders](#placeholders)
  - [Loops](#loops)
    - [`@for` Loop](#for-loop)
    - [`@each` Loop](#each-loop)
    - [`@while` Loop](#while-loop)
  - [Maps](#maps)
  - [Lists](#lists)
  - [Math Functions](#math-functions)
  - [Color Functions](#color-functions)
  - [CSS3 Features](#css3-features)
  - [Best Practices](#best-practices)
  - [Compilation of SCSS](#compilation-of-scss)
  - [extend-mixin-function](#extend-mixin-function)

---

## Introduction to SCSS

SCSS (Sassy CSS) is a CSS preprocessor that extends CSS with variables, nested rules, mixins, inheritance, and more. SCSS files use the `.scss` extension, and they need to be compiled into standard CSS to be used in the browser.

---

## Variables

SCSS allows you to store values in variables, which can be reused throughout your stylesheet.

```scss
$primary-color: #3498db;
$font-stack: 'Helvetica', sans-serif;

body {
  color: $primary-color;
  font-family: $font-stack;
}
```

---

## Nesting

Nesting allows you to nest your CSS selectors in a hierarchical structure, making your code more readable and maintainable.

```scss
nav {
  ul {
    list-style-type: none;
  }
  
  li {
    display: inline-block;
  }
  
  a {
    color: $primary-color;
  }
}
```

---

## Partials

Partials are SCSS files that contain small pieces of code that can be imported into other SCSS files. Partials are named with an underscore prefix (`_`), and they are not compiled on their own.

Example: `_variables.scss`

```scss
$primary-color: #3498db;
$font-stack: 'Helvetica', sans-serif;
```

---

## Imports

You can import SCSS files into other SCSS files using the `@import` directive. This helps modularize your stylesheets.

```scss
@import 'variables';
@import 'mixins';
```

---

## Mixins

Mixins allow you to create reusable blocks of CSS code. You can also pass arguments to mixins to make them more dynamic.

```scss
@mixin border-radius($radius) {
  -webkit-border-radius: $radius;
     -moz-border-radius: $radius;
         border-radius: $radius;
}

.box { 
  @include border-radius(10px); 
}
```

---

## Extend/Inheritance

The `@extend` directive allows one selector to inherit the styles of another, making your code more maintainable and less repetitive.

```scss
.button {
  padding: 10px 15px;
  background-color: blue;
}

.primary-button {
  @extend .button;
  background-color: green;
}
```

---

## Operators

SCSS allows mathematical operators like addition, subtraction, multiplication, and division for dynamic styling.

```scss
$width: 100px;
$height: $width / 2;

box {
  width: $width;
  height: $height;
}
```

---

## Control Directives

SCSS provides control directives like `@if`, `@else`, and `@for` to manage logic in your styles.

### `@if` and `@else`

```scss
$theme: light;

.button {
  @if $theme == light {
    background-color: white;
  } @else {
    background-color: black;
  }
}
```

### `@for`

```scss
@for $i from 1 through 5 {
  .item-#{$i} {
    width: 10px * $i;
  }
}
```

---

## Functions

SCSS allows the creation of custom functions to manipulate values and return results.

```scss
@function calculate-rem($px) {
  @return $px / 16 + rem;
}

body {
  font-size: calculate-rem(32);
}
```

---

## Placeholders

Placeholders are used to define reusable styles that are not rendered directly but can be extended by other selectors.

```scss
%base {
  font-size: 16px;
  color: black;
}

h1 {
  @extend %base;
  font-weight: bold;
}
```

---

## Loops

Loops in SCSS allow you to generate repetitive styles efficiently.

### `@for` Loop

```scss
@for $i from 1 through 3 {
  .item-#{$i} {
    width: 10px * $i;
  }
}
```

### `@each` Loop

```scss
$colors: (red, blue, green);

@each $color in $colors {
  .#{$color}-text {
    color: $color;
  }
}
```

### `@while` Loop

```scss
$i: 1;

@while $i <= 5 {
  .item-#{$i} {
    width: 10px * $i;
  }
  $i: $i + 1;
}
```

---

## Maps

Maps are key-value pairs in SCSS, useful for organizing related values.

```scss
$colors: (
  primary: #3498db,
  secondary: #2ecc71
);

.button {
  background-color: map-get($colors, primary);
}
```

---

## Lists

Lists are ordered collections of values.

```scss
$font-sizes: 12px, 14px, 16px;

h1 {
  font-size: nth($font-sizes, 2);  // Outputs 14px
}
```

---

## Math Functions

SCSS provides several built-in math functions, such as `abs()`, `min()`, `max()`, `round()`, `ceil()`, `floor()`, etc.

```scss
$width: 100px;
$height: ceil($width / 3);
```

---

## Color Functions

SCSS has built-in functions for manipulating colors, such as `lighten()`, `darken()`, `saturate()`, `desaturate()`, etc.

```scss
$color: #3498db;

.button {
  background-color: lighten($color, 20%);
}
```

---

## CSS3 Features

SCSS supports advanced CSS3 features such as gradients, shadows, and media queries.

```scss
$background-color: #3498db;

body {
  background: linear-gradient(to right, $background-color, #2ecc71);
}
```

---

## Best Practices

1. **Use Variables**: For colors, fonts, and sizes to maintain consistency.
2. **Keep Code DRY**: Use mixins, extends, and functions to avoid repetitive code.
3. **Organize Files**: Split your code into smaller partials and use `@import` for better maintainability.
4. **Indentation and Nesting**: Keep nesting to a reasonable depth (usually 3 levels max) to avoid overly complex selectors.
5. **Commenting**: Use comments to clarify sections of your SCSS code.

---

## Compilation of SCSS

SCSS must be compiled into standard CSS before being used in the browser. You can use tools such as:

- **Node-sass**
- **Dart-sass**
- **Prepros**
- **Sass Compiler in IDEs**

Example: Using `node-sass` command line.

```bash
node-sass style.scss style.css
```

## extend-mixin-function

- The `@extend` directive allows one selector to inherit the styles of another selector.
- A `mixin` is a reusable chunk of code that can accept parameters and be included in other selectors.
- A `function` is used to return a value, often after performing some computation or manipulation.

---
