// Generated by Creer at 06:03PM on September 02, 2015 UTC, git hash: '4eb68ef1916ebb5952fd52228eae66ee26cab870'
// Note: this file should never be modified, instead if you want to add game logic modify just the ../Checker.js file. This is to ease merging main.data changes

var serializer = require("../../../utilities/serializer");
var Class = require("../../../utilities/class");
var GameObject = require("../gameObject");


// @class GeneratedChecker: The generated version of the Checker, that handles basic logic.
var GeneratedChecker = Class(GameObject, {
    init: function(data) {
        GameObject.init.apply(this, arguments);

        this.kinged = serializer.toBoolean(data.kinged === undefined ? false : data.kinged);
        this.owner = (data.owner === undefined ? null : data.owner);
        this.x = serializer.toInteger(data.x === undefined ? 0 : data.x);
        this.y = serializer.toInteger(data.y === undefined ? 0 : data.y);

        this._serializableKeys["kinged"] = true;
        this._serializableKeys["owner"] = true;
        this._serializableKeys["x"] = true;
        this._serializableKeys["y"] = true;
    },

    gameObjectName: "Checker",

    _runIsMine: function(player, data) {
        var returned = this.isMine(player);
        return serializer.toBoolean(returned);
    },

    _runMove: function(player, data) {
        var x = serializer.toInteger(data.x);
        var y = serializer.toInteger(data.y);

        var returned = this.move(player, x, y);
        return (returned);
    },

});

module.exports = GeneratedChecker;
