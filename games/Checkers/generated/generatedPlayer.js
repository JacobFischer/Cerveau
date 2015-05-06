// Generated by Creer at 02:43AM on May 03, 2015 UTC, git hash: '2acbba9c4b682c4de68840c1ca9bec631e9c635f'
// Note: this file should never be modified, instead if you want to add game logic modify just the ../Player.js file. This is to ease merging main.data changes

var Class = require("../../../utilities/class");
var GameObject = require("../gameObject")


// @class GeneratedPlayer: The generated version of the Player, that handles basic logic.
var GeneratedPlayer = Class(GameObject, {
	init: function(data) {
		GameObject.init.apply(this, arguments);

		this.gameObjectName = "Player";

		this.name = String(data.name === undefined ? "" : data.name);
		this.checkers = (data.checkers === undefined ? [] : data.checkers);
		this.reasonWon = String(data.reasonWon === undefined ? "" : data.reasonWon);
		this.lost = Boolean(data.lost === undefined ? false : data.lost);
		this.won = Boolean(data.won === undefined ? false : data.won);
		this.yDirection = parseInt(data.yDirection === undefined ? 0 : data.yDirection);
		this.clientType = String(data.clientType === undefined ? "" : data.clientType);
		this.timeRemaining = parseInt(data.timeRemaining === undefined ? 0 : data.timeRemaining);
		this.reasonLost = String(data.reasonLost === undefined ? "" : data.reasonLost);

		this._serializableKeys["name"] = true;
		this._serializableKeys["checkers"] = true;
		this._serializableKeys["reasonWon"] = true;
		this._serializableKeys["lost"] = true;
		this._serializableKeys["won"] = true;
		this._serializableKeys["yDirection"] = true;
		this._serializableKeys["clientType"] = true;
		this._serializableKeys["timeRemaining"] = true;
		this._serializableKeys["reasonLost"] = true;
	},

});

module.exports = GeneratedPlayer;