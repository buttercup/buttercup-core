var sga = require("../../source/system/commands/SetGroupAttributeCommand.js");

var fakeGroup;

module.exports = {
    setUp: function(cb) {
        this.command = new sga();
        (cb)();
    },

    errors: {

        groupNotFoundForId: function(test) {
            var fakeSearching = {
                findGroupByID: function(a, b) {
                    return false;
                }
            };

            this.command.searchTools = fakeSearching;

            var errorThrown = false;
            try {
                this.command.execute({ }, 0, '', '');
            } catch (e) {
                if (e.message === 'Group not found for ID') {
                    errorThrown = true;
                }
            } finally {
                test.strictEqual(errorThrown, true, 'Error thrown');
                test.done();
            }
        }

    },

    setAttributeOnGroupWithAttributes: {
        setUp: function(cb) {
            fakeGroup = {
                attributes: {}
            };

            (cb)();
        },

        setsAttributeValueValForNameNam: function(test) {
            var attributeName = 'Nam',
                attributeValue = 'Val';

            var fakeSearching = {
                findGroupByID: function(a, b) {
                    return fakeGroup;
                }
            };

            this.command.searchTools = fakeSearching;

            this.command.execute({ }, 0, attributeName, attributeValue);

            test.strictEqual(fakeGroup.attributes[attributeName], attributeValue, 'Attribute value is correctly set. ([' + attributeName + '] = ' + attributeValue + ')');
            test.done();
        },

        setsAttributeValueFooForNameBar: function(test) {
            var attributeName = 'Bar',
                attributeValue = 'Foo';

            var fakeSearching = {
                findGroupByID: function(a, b) {
                    return fakeGroup;
                }
            };

            this.command.searchTools = fakeSearching;

            this.command.execute({ }, 0, attributeName, attributeValue);

            test.strictEqual(fakeGroup.attributes[attributeName], attributeValue, 'Attribute value is correctly set. ([' + attributeName + '] = ' + attributeValue + ')');
            test.done();
        }
    },

    setAttributeOnGroupWithoutAttributes: {
        setUp: function(cb) {
            fakeGroup = {
                attributes: undefined
            };

            (cb)();
        },

        setsAttributeValueValForNameNam: function(test) {
            var attributeName = 'Nam',
                attributeValue = 'Val';

            var fakeSearching = {
                findGroupByID: function(a, b) {
                    return fakeGroup;
                }
            };

            this.command.searchTools = fakeSearching;

            this.command.execute({ }, 0, attributeName, attributeValue);

            test.strictEqual(fakeGroup.attributes[attributeName], attributeValue, 'Attribute value is correctly set. ([' + attributeName + '] = ' + attributeValue + ')');
            test.done();
        },

        setsAttributeValueFooForNameBar: function(test) {
            var attributeName = 'Bar',
                attributeValue = 'Foo';

            var fakeSearching = {
                findGroupByID: function(a, b) {
                    return fakeGroup;
                }
            };

            this.command.searchTools = fakeSearching;

            this.command.execute({ }, 0, attributeName, attributeValue);

            test.strictEqual(fakeGroup.attributes[attributeName], attributeValue, 'Attribute value is correctly set. ([' + attributeName + '] = ' + attributeValue + ')');
            test.done();
        }
    }
};
