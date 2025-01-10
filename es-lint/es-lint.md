<samp>

# [ESLint](https://eslint.org/docs/latest/use/core-concepts/)

- Helps to identify and fix problems in JS code.
- Ensure consistency and error-free code that easy to maintain.
- Extensible: Add additional functionality (plugins)

- ESLint is a configurable JavaScript linter. It helps you find and fix problems in your JavaScript code. Problems can be anything from potential runtime bugs, to not following best practices, to styling issues.

## Main Building Blocks of ESLint

- Rules
- Plugins

## [Configure ESLint](https://eslint.org/docs/latest/use/configure/)

- ESLint is designed to be flexible and configurable for your use case. You can turn off every rule and run only with basic syntax validation or mix and match the bundled rules and your custom rules to fit the needs of your project. There are two primary ways to configure ESLint:

  1. `Configuration Comments -` use JavaScript comments to embed configuration information directly into a file.
  2. `Configuration Files -` use a JavaScript file to specify configuration information for an entire directory and all of its subdirectories. This can be in the form of an eslint.config.js file which ESLint will look for and read automatically, or you can specify a configuration file on the command line. `Different approaches before version 9 and after version 9, so you want to migrate to latest version you have to change the configurations.`

- Here are some of the options that you can configure in ESLint:

  1. `Globals -` the additional global variables your script accesses during execution.
  2. `Rules -` which rules are enabled and at what error level.
  3. `Plugins -` which third-party plugins define additional rules, environments, configs, etc. for ESLint to


```js
// eslint.config.js
export default [
    {
        rules: {
            semi: "error",
            "prefer-const": "error"
        }
    }
];
```

### Rules

- `Rules are the core building block of ESLint`. A rule `validates` if your code meets a certain expectation, and what to do if it does not meet that expectation. Rules can also contain additional configuration options specific to that rule.

#### Rule Severities

- To change a rule’s severity, set the rule ID equal to one of these values:

- `"off" or 0 -` turn the rule off.
- `"warn" or 1 -` turn the rule on as a warning (doesn’t affect exit code).
- `"error" or 2 -` turn the rule on as an error (exit code is 1 when triggered).

```js
export default [
    {
        rules: {
            eqeqeq: "off", // "off" or "0"
            "no-unused-vars": "error",
            "prefer-const": ["error", { "ignoreReadBeforeAssign": true }]
        }
    }
];
```

### [Diff b/w plugins and extends](https://prateeksurana.me/blog/difference-between-eslint-extends-and-plugins/)

#### Plugins

- Plugins are used to add custom rules and shareable configurations that are not part of ESLint’s core rules.
- Although ESLint ships with some good set of rules, usually they are not enough to cover all the needs for your project, especially if you're building with libraries and frameworks like React, Vue, etc. ESLint plugins allow you to add custom rules according to the needs of your project.
- Plugins are published as npm modules with names in the format of eslint-plugin-<plugin-name>.

```js
module.exports = {
  plugins: ['react'],  // Add the plugin name here
  rules: {
    'react/prop-types': 'off', // Use specific rules from the plugin
  },
};
```

#### extends (Shareable configs)

- extends allows you to inherit predefined rule sets from ESLint or third-party configurations. These configurations provide a set of rules and can be from core ESLint configurations or external configurations shared via plugins.
- The ESLint configs we create for our project are an important part of our project and more often than not we have multiple projects that need more or less the same configs. 
- So ESLint lets you share your config by allowing you to publish it to npm.
- Similar to plugins shareable configs are also published with names in the format of eslint-config-<config-name>.

```js
module.exports = {
  extends: ['airbnb', 'airbnb/hooks'], // Extend the Airbnb configuration
  plugins: ['react', 'jsx-a11y'], // Include the necessary plugins
};
```

#### Plugins with configs

- We saw earlier how plugins allow you to add more rules for linting your project, and how you need to add the rules you want to use in your config or extend from some other shareable config that has the rules.
- Guess what plugins can also come with different sets of shareable configs and you can use any of them according to your needs in your project.
- You can use these configs that come with your plugins by with the plugin: prefix.

```js
// .eslintrc
{
  "extends": ["plugin:react/recommended"]
}
```

### Configure Language Options

- ESLint allows you to specify the JavaScript language options you want to support. By default, ESLint expects the most recent stage 4 ECMAScript syntax and ECMAScript modules (ESM) mode. You can override these settings by using the languageOptions key and specifying one or more of these properties:

1. ecmaVersion (default: "latest") - Indicates the ECMAScript version of the code being linted, determining both the syntax and the available global variables. Set to 3 or 5 for ECMAScript 3 and 5, respectively. Otherwise, you can use any year between 2015 to present. In most cases, we recommend using the default of "latest" to ensure you’re always using the most recent ECMAScript version.

2. sourceType (default: "module") - Indicates the mode of the JavaScript file being used. Possible values are:
  1. module - ESM module (invalid when ecmaVersion is 3 or 5). Your code has a module scope and is run in strict mode.
  2. commonjs - CommonJS module (useful if your code uses require()). Your code has a top-level function scope and runs in non-strict mode.
  3. script - non-module. Your code has a shared global scope and runs in non-strict mode.

```js
// eslint.config.js
export default [
    {
        languageOptions: {
            ecmaVersion: 5,
            sourceType: "script"
        }
    }
];
```

### Specifying files and ignores files

```js
// eslint.config.js
export default [
    {
        files: ["src/**/*.js"],
        ignores: ["**/*.config.js"],
        rules: {
            semi: "error"
        }
    }
];
```

## Add Configurations using eslint.config.js

- standard -> Set coding standard for your project (For ex: airbnb, standard js)
- rules -> To configure the code rules if not included in the used coding standard
- ignores -> To ignore files to be check by ESLint or by adding single or multiline comments in actual code file

## Integrate ESLint in VSCode

- Install `ESLint` extension - which will highlight the issues in the code.
- You can use `Fix all auto-fixable problems` command to fix some issues.

## How to integrate ESLint with Prettier?

- As ESLint check for multiple code rules it may leads to conflict with prettier code like single or double string
- So we can avoid these conflicts by installing `eslint-config-prettier` package and setting up `.eslintrc` file in our project
- `.eslintrc` is deprecated after ESLint 9.

## Ways to config ESLint

### ESLint Flat Config (introduced in version 8(2021), Starting with ESLint 9(2022), the flat config system became mandatory)

- `ESLint Flat Config is a new configuration system introduced in ESLint version 8.0.` It aims to simplify the configuration structure, making ESLint configurations more predictable and less complex. The flat config system represents a departure from the older, hierarchical configuration style, offering a more straightforward and intuitive way to configure ESLint.
- In the old configuration system, ESLint supported several file formats for configuration, each with its own specific file extension. 
- `The common extensions include:`
  - `.eslintrc.json`: JSON format.
  - `.eslintrc.yml or .eslintrc.yaml`: YAML format.
  - `.eslintrc.js`: JavaScript format.
  - `.eslintrc`: A plain file (with no extension) that can be either JSON or YAML format (though this is deprecated and not commonly used anymore).


```js
// eslint-config.js (Flat Config)
import { defineConfig } from 'eslint-define-config';
import eslintRecommended from 'eslint-config-eslint';         // Import ESLint's recommended config
import reactRecommended from 'eslint-plugin-react/recommended'; // Import React plugin's recommended config

export default defineConfig({
  plugins: ['react'], // Include the React plugin
  rules: {
    'no-console': 'warn', // Override the 'no-console' rule globally to show a warning
    ...eslintRecommended.rules, // Manually include eslint:recommended rules
    ...reactRecommended.rules   // Manually include plugin:react/recommended rules
  },
  overrides: [ // Override rules for specific files
    {
      files: ['*.test.js'], // Override rules for test files
      rules: {
        'no-console': 'off' // Disable the 'no-console' rule for test files
      }
    }
  ]
});
```

### ESLint traditional Config

- In traditional ESLint configuration, you could define a configuration in multiple files (such as .eslintrc.json, .eslintrc.js, or .eslintrc.yaml), with options defined in nested structures (for rules, environments, plugins, etc.). These configurations could also extend from other configuration files, leading to a more layered approach.
- The new flat config system introduced in ESLint 8.x supports only JavaScript-based configuration files, and the configuration must be written in JavaScript. This makes the new flat config system exclusive to .js files (and optionally, the .mjs extension if you are using ECMAScript modules).
- `Allowed File Extension for Flat Config:`
    - `.js`: The main configuration file.
    - `.mjs`: If you want to use ECMAScript module syntax (e.g., import/export).


```json
// .eslintrc.json (Old Configuration)
{
  "extends": [
    "eslint:recommended",      // Use the recommended ESLint rules
    "plugin:react/recommended" // Use the recommended React plugin rules
  ],
  "rules": {
    "no-console": "warn" // Override the 'no-console' rule to give a warning instead of an error
  },
  "overrides": [
    {
      "files": ["*.test.js"], // For test files, we override some rules
      "rules": {
        "no-console": "off" // Disable the 'no-console' rule for test files
      }
    }
  ]
}
```

```
In summary, the ESLint flat config simplifies and streamlines ESLint configuration by removing the need for extensions and overrides, providing a flat and more explicit configuration system that is easier to understand and manage. This is a departure from the older, more complex hierarchical configurations that involved multiple files, extending configurations, and overriding settings for different parts of a project. The flat config aims to reduce complexity and improve the overall developer experience with ESLint.
```

## Enabling/Disabling ESLint for a specific line, block, or file

- In ESLint, you can disable linting for a specific line, block, or section of code by using ESLint directives in your code. These directives are special comments that tell ESLint to ignore certain parts of your code based on your needs.

### How to Enable/Disable?

#### Enable or Disable all rules
```js
/* eslint-enable */ 
/* eslint-disable */ 
```

#### Enable or Disable specific rules
```js
/* eslint-enable no-console */
/* eslint-disable no-console */
```

### How to use?

1. Disable ESLint for a Single Line

```js
const foo = "bar"; // eslint-disable-line
```

2. Disable ESLint for a Specific Block of Code

```js
/* eslint-disable */
const foo = "bar";
const baz = 42;
/* eslint-enable */
```

3. Disable ESLint for a Specific File

- `To disable linting for an entire file, you can place an eslint-disable comment at the top of the file:`

```js
/* eslint-disable */
```

</samp>
