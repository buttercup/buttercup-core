# Contributions
Before contributing, please take notice to this style-guide - it details simple instructions for what's expected of your changes. Pull-requests will be rejected if they fail to adhere to the points listed here.

That being said, the requirements here are clear and simple.

## Formatting
Some general points that apply to most aspects of the project:
 * Indentation should be with 4 **spaces**
 * Commas on the same line

`npm test` runs eslint checks (`npm run test:lint`).

### package.json
The package.json file should be indented with 4 spaces, not 2. Using commands like `npm install <package>` will reformat the file to 2-space indent, so for your convenience please add dependencies by hand.

### Source files
Keep modules neat and tidy - follow the layout in other source files. Ensure you have `"use strict";` in each module.

Modules are wrapped like so:
```
(function(module) {

    "use strict";

    module.exports = something;

})(module);
```

Semicolons are to be used at all times.

## Technical

### Dependencies
When adding dependencies, consider the nature of Buttercup and the required level of stability and security. Use patch-level semver only: `~1.2.3`.

## Tests & Documentation
Please write tests. So many things can go wrong when functionality isn't covered by tests. Keep your tests at the same standard as your code.

Document your functions, classes and variables with JSDoc blocks. Before making a PR, run `./generate-docs` to regenerate API documentation.
