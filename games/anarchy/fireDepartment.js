// Generated by Creer at 10:54PM on October 16, 2015 UTC, git hash: '98604e3773d1933864742cb78acbf6ea0b4ecd7b'

var Class = require(__basedir + "/utilities/class");
var serializer = require(__basedir + "/gameplay/serializer");
var log = require(__basedir + "/gameplay/log");
var Building = require("./building");

//<<-- Creer-Merge: requires -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.

// any additional requires you want can be required here safely between cree runs
//<<-- /Creer-Merge: requires -->>

// @class FireDepartment: Can put out fires completely.
var FireDepartment = Class(Building, {
    /**
     * Initializes FireDepartments.
     *
     * @param {Object} a simple mapping passsed in to the constructor with whatever you sent with it.
     */
    init: function(data) {
        Building.init.apply(this, arguments);


        //<<-- Creer-Merge: init -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.

        // put any initialization logic here. the base variables should be set from 'data' above
        // NOTE: no players are connected (nor created) at this point. For that logic use 'begin()'

        //<<-- /Creer-Merge: init -->>
    },

    gameObjectName: "FireDepartment",


    /**
     * Bribes this FireDepartment to extinguish the fire in a building.
     *
     * @param {Player} player - the player that called this.
     * @param {Building} building - The Building you want to extinguish.
     * @param {function} asyncReturn - if you nest orders in this function you must return that value via this function in the order's callback.
     * @returns {boolean} true if the bribe worked, false otherwise
     */
    extinguish: function(player, building, asyncReturn) {
        // <<-- Creer-Merge: extinguish -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.

        // Check that player owns FireDepartment
        if(this.owner !== player){
            return game.logicError(false, "tried to use an enemy's FireDepartment.extinguish");
        }
        // Check that player has bribes remaining
        if(player.bribesRemaining <= 0){
            return game.logicError(false, "tried to extinguish with no bribes remaining");
        }
        // Check that this FireDepartment is still alive
        if(this.health <= 0){
            return game.logicError(false, "tried to extinguish using a dead FireDepartment");
        }
        // Check if this building has already been bribed
        if(this.bribed){
            return game.logicError(false, "tried to extinguish with an already bribed FireDepartment");
        }
        // Check that building is valid
        if(building === null){
            return game.logicError(false, "tried to extinguish a null building");
        }
        // Set fire on building to 0
        building.fire = 0;
        // Flag as bribed
        this.bribed = true;
        // Decrement bribes remaining
        player.bribesRemaining--;

        return true;

        // <<-- /Creer-Merge: extinguish -->>
    },

    //<<-- Creer-Merge: added-functions -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.

    // You can add additional functions here. These functions will not be directly callable by client AIs

    //<<-- /Creer-Merge: added-functions -->>

});

module.exports = FireDepartment;