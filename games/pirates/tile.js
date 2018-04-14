// Tile: A Tile in the game that makes up the 2D map grid.

const Class = require("classe");
const log = require(`${__basedir}/gameplay/log`);
const TiledTile = require(`${__basedir}/gameplay/shared/tiledTile`);
const GameObject = require("./gameObject");

//<<-- Creer-Merge: requires -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.

// any additional requires you want can be required here safely between Creer re-runs

//<<-- /Creer-Merge: requires -->>

// @class Tile: A Tile in the game that makes up the 2D map grid.
let Tile = Class(GameObject, TiledTile, {
    /**
     * Initializes Tiles.
     *
     * @param {Object} data - a simple mapping passed in to the constructor with whatever you sent with it. GameSettings are in here by key/value as well.
     */
    init: function(data) {
        GameObject.init.apply(this, arguments);

        /**
         * (Visualizer only) Whether this tile is deep sea or grassy. This has no effect on gameplay, but feel free to use it if you want.
         *
         * @type {boolean}
         */
        this.decoration = this.decoration || false;

        /**
         * The amount of gold buried on this tile.
         *
         * @type {number}
         */
        this.gold = this.gold || 0;

        /**
         * The Port on this Tile if present, otherwise null.
         *
         * @type {Port}
         */
        this.port = this.port || null;

        /**
         * The Tile to the 'East' of this one (x+1, y). Null if out of bounds of the map.
         *
         * @type {Tile}
         */
        this.tileEast = this.tileEast || null;

        /**
         * The Tile to the 'North' of this one (x, y-1). Null if out of bounds of the map.
         *
         * @type {Tile}
         */
        this.tileNorth = this.tileNorth || null;

        /**
         * The Tile to the 'South' of this one (x, y+1). Null if out of bounds of the map.
         *
         * @type {Tile}
         */
        this.tileSouth = this.tileSouth || null;

        /**
         * The Tile to the 'West' of this one (x-1, y). Null if out of bounds of the map.
         *
         * @type {Tile}
         */
        this.tileWest = this.tileWest || null;

        /**
         * The type of Tile this is ('water' or 'land').
         *
         * @type {string}
         */
        this.type = this.type || "";

        /**
         * The Unit on this Tile if present, otherwise null.
         *
         * @type {Unit}
         */
        this.unit = this.unit || null;

        /**
         * The x (horizontal) position of this Tile.
         *
         * @type {number}
         */
        this.x = this.x || 0;

        /**
         * The y (vertical) position of this Tile.
         *
         * @type {number}
         */
        this.y = this.y || 0;


        //<<-- Creer-Merge: init -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.

        // put any initialization logic here. the base variables should be set from 'data' above

        //<<-- /Creer-Merge: init -->>
    },

    gameObjectName: "Tile",


    //<<-- Creer-Merge: added-functions -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.

    // You can add additional functions here. These functions will not be directly callable by client AIs

    //<<-- /Creer-Merge: added-functions -->>

});

module.exports = Tile;