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

Tests should be grouped by the method that they're testing, and test functions should begin with the word "test":
```
module.exports = {

    getSomething: {

        testGetsSomething: function(test) {}

    }

};
```

### JSDoc
When documenting a private property (static), the block should resemble this:
```
/**
 * My variable that does something
 * @type {string|number}
 * @private
 * @static
 * @memberof ClassInThisFile
 */
var __myProp = 10;
```

When documenting a constructor/class:
```
/**
 * My class that does something
 * @class MyClass
 * @param {Object} paramName Class takes this property
 */
var MyClass = function(paramName) {
```

When documenting a class method:
```
/**
 * Do something on the class instance
 * @param {string} action Action to take
 * @param {string=} something Something else to do (optional)
 * @returns {number} Returns a number
 * @throws {Error} Throws if you do something wrong
 * @memberof MyClass
 * @public
 * @instance
 */
MyClass.prototype.doSomething = function(action, something) {
```

A "protected" (not to be used externally) method:
```
/**
 * Do something privately
 * (JSDoc properties as per normal functions minus @public)
 * @protected
 */
MyClass.prototype._doPrivately = function() {
```
