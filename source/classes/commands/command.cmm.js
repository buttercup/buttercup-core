(function(module) {

    "use strict";

    var CommentCommand = function() {
        this.commentCallback = function (comment) { };
    }

    CommentCommand.prototype.execute = function(obj, comment) {
        this.commentCallback(comment);
    }

    CommentCommand.prototype.injectCommentCallback = function(callback) {
        this.commentCallback = callback;
    }

    module.exports = CommentCommand;

})(module);
