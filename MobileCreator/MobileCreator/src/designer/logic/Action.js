define(["require", "exports"], function(require, exports) {
    var Action = (function () {
        function Action() { }
        Action.prototype.toXML = function () {
            return "";
        };
        Action.prototype.show = function () {
        };
        return Action;
    })();
    exports.Action = Action;    
})