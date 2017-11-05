// Player: A player in this game. Every AI controls one player.

const Class = require("classe");
const log = require(`${__basedir}/gameplay/log`);
const GameObject = require("./gameObject");

//<<-- Creer-Merge: requires -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.

// any additional requires you want can be required here safely between Creer re-runs

//<<-- /Creer-Merge: requires -->>

// @class Player: A player in this game. Every AI controls one player.
let Player = Class(GameObject, {
    /**
     * Initializes Players.
     *
     * @param {Object} data - a simple mapping passed in to the constructor with whatever you sent with it. GameSettings are in here by key/value as well.
     */
    init: function(data) {
        GameObject.init.apply(this, arguments);

        /**
         * The overlord cat Unit owned by this Player.
         *
         * @type {Unit}
         */
        this.cat = this.cat || null;

        /**
         * What type of client this is, e.g. 'Python', 'JavaScript', or some other language. For potential data mining purposes.
         *
         * @type {string}
         */
        this.clientType = this.clientType || "";

        /**
         * The amount of food owned by this player.
         *
         * @type {number}
         */
        this.food = this.food || 0;

        /**
         * If the player lost the game or not.
         *
         * @type {boolean}
         */
        this.lost = this.lost || false;

        /**
         * The name of the player.
         *
         * @type {string}
         */
        this.name = this.name || "";

        /**
         * This player's opponent in the game.
         *
         * @type {Player}
         */
        this.opponent = this.opponent || null;

        /**
         * The reason why the player lost the game.
         *
         * @type {string}
         */
        this.reasonLost = this.reasonLost || "";

        /**
         * The reason why the player won the game.
         *
         * @type {string}
         */
        this.reasonWon = this.reasonWon || "";

        /**
         * Every Structure owned by this Player.
         *
         * @type {Array.<Structure>}
         */
        this.structures = this.structures || [];

        /**
         * The amount of time (in ns) remaining for this AI to send commands.
         *
         * @type {number}
         */
        this.timeRemaining = this.timeRemaining || 0;

        /**
         * Every Unit owned by this Player.
         *
         * @type {Array.<Unit>}
         */
        this.units = this.units || [];

        /**
         * The total upkeep of every Unit owned by this Player. If there isn't enough food for every Unit, all Units become starved and do not consume food.
         *
         * @type {number}
         */
        this.upkeep = this.upkeep || 0;

        /**
         * If the player won the game or not.
         *
         * @type {boolean}
         */
        this.won = this.won || false;


        //<<-- Creer-Merge: init -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.
        this.cat = data.cat || null;
        this.food = data.food || null;

        // Keep track of all units defeated in combat
        this.defeatedUnits = [];
        //<<-- /Creer-Merge: init -->>
    },

    gameObjectName: "Player",


    //<<-- Creer-Merge: added-functions -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.
    /**
     * Recalculates all squads for this player's units.
     * Unowned units just have squads with only themselves in it.
     */
    calculateSquads: function() {
        for(let unit of this.units) {
            // Reset squad
            unit.squad = [];

            // Flood fill to calculate squads
            let open = [unit.tile];
            let closed = new Set();
            while(open.length > 0) {
                // Grab a tile from the open list
                const tile = open.shift();
                const cur = tile && tile.unit;

                // If the tile grabbed is null/undefined, there's no valid unit there, or we already checked this tile
                if(!cur || cur.owner !== this || (unit.squad.length > 0 && cur.job.title !== "soldier") || closed.has(tile.id)) {
                    // Skip this tile (and don't spread out from it)
                    continue;
                }

                // Add this unit to the squad
                unit.squad.push(cur);

                // Make sure we never check this tile again
                closed.add(tile.id);

                // Add the surrounding tiles to the open list to check
                open.push(tile.tileNorth);
                open.push(tile.tileEast);
                open.push(tile.tileSouth);
                open.push(tile.tileWest);
            }
        }
    },
    //<<-- /Creer-Merge: added-functions -->>

});

module.exports = Player;