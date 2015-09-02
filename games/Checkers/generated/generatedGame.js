// Generated by Creer at 06:03PM on September 02, 2015 UTC, git hash: '4eb68ef1916ebb5952fd52228eae66ee26cab870'
// Note: this file should never be modified, instead if you want to add game logic modify just the ../Game.js file. This is to ease merging main.data changes

var serializer = require("../../../utilities/serializer");
var Class = require("../../../utilities/class");
var TurnBasedGame = require("../../turnBasedGame");


// Custom Game Objects
var GameObject = require("../gameObject");
var Checker = require("../checker");
var Player = require("../player");

// @class GeneratedGame: The generated version of the Game, that handles basic logic.
var GeneratedGame = Class(TurnBasedGame, {
    init: function(data) {
        TurnBasedGame.init.apply(this, arguments);

        this.boardHeight = serializer.toInteger(data.boardHeight === undefined ? 0 : data.boardHeight);
        this.boardWidth = serializer.toInteger(data.boardWidth === undefined ? 0 : data.boardWidth);
        this.checkerMoved = (data.checkerMoved === undefined ? null : data.checkerMoved);
        this.checkerMovedJumped = serializer.toBoolean(data.checkerMovedJumped === undefined ? false : data.checkerMovedJumped);
        this.checkers = (data.checkers === undefined ? [] : data.checkers);


        this._serializableKeys["boardHeight"] = true;
        this._serializableKeys["boardWidth"] = true;
        this._serializableKeys["checkerMoved"] = true;
        this._serializableKeys["checkerMovedJumped"] = true;
        this._serializableKeys["checkers"] = true;
    },

    name: "Checkers",
    numberOfPlayers: 2,
    maxInvalidsPerPlayer: 10,


    /// Creates a new instance of the GameObject game object that has reference to the creating game
    newGameObject: function(data) {
        data.game = this;
        return new GameObject(data);
    },

    /// Creates a new instance of the Checker game object that has reference to the creating game
    newChecker: function(data) {
        data.game = this;
        return new Checker(data);
    },

    /// Creates a new instance of the Player game object that has reference to the creating game
    newPlayer: function(data) {
        data.game = this;
        return new Player(data);
    },
});

module.exports = GeneratedGame;
