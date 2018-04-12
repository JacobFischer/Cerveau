// Game: Steal from merchants and become the most infamous pirate.

const Class = require("classe");
const log = require(`${__basedir}/gameplay/log`);
const TwoPlayerGame = require(`${__basedir}/gameplay/shared/twoPlayerGame`);
const TurnBasedGame = require(`${__basedir}/gameplay/shared/turnBasedGame`);
const TiledGame = require(`${__basedir}/gameplay/shared/tiledGame`);

//<<-- Creer-Merge: requires -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.

// any additional requires you want can be required here safely between Creer re-runs

//<<-- /Creer-Merge: requires -->>

// @class Game: Steal from merchants and become the most infamous pirate.
let Game = Class(TwoPlayerGame, TurnBasedGame, TiledGame, {
    /**
     * Initializes Games.
     *
     * @param {Object} data - a simple mapping passed in to the constructor with whatever you sent with it. GameSettings are in here by key/value as well.
     */
    init: function(data) {
        TiledGame.init.apply(this, arguments);
        TurnBasedGame.init.apply(this, arguments);
        TwoPlayerGame.init.apply(this, arguments);

        /**
         * How much gold it costs to construct a single crew.
         *
         * @type {number}
         */
        this.crewCost = this.crewCost || 0;

        /**
         * How much damage crew deal to each other.
         *
         * @type {number}
         */
        this.crewDamage = this.crewDamage || 0;

        /**
         * The maximum amount of health a crew member can have.
         *
         * @type {number}
         */
        this.crewHealth = this.crewHealth || 0;

        /**
         * The number of moves Units with only crew are given each turn.
         *
         * @type {number}
         */
        this.crewMoves = this.crewMoves || 0;

        /**
         * A crew's attack range. Range is circular.
         *
         * @type {number}
         */
        this.crewRange = this.crewRange || 0;

        /**
         * The player whose turn it is currently. That player can send commands. Other players cannot.
         *
         * @type {Player}
         */
        this.currentPlayer = this.currentPlayer || null;

        /**
         * The current turn number, starting at 0 for the first player's turn.
         *
         * @type {number}
         */
        this.currentTurn = this.currentTurn || 0;

        /**
         * A mapping of every game object's ID to the actual game object. Primarily used by the server and client to easily refer to the game objects via ID.
         *
         * @type {Object.<string, GameObject>}
         */
        this.gameObjects = this.gameObjects || {};

        /**
         * How much health a Unit recovers when they rest.
         *
         * @type {number}
         */
        this.healFactor = this.healFactor || 0;

        /**
         * The number of Tiles in the map along the y (vertical) axis.
         *
         * @type {number}
         */
        this.mapHeight = this.mapHeight || 0;

        /**
         * The number of Tiles in the map along the x (horizontal) axis.
         *
         * @type {number}
         */
        this.mapWidth = this.mapWidth || 0;

        /**
         * The Euclidean distance from a Player Port required to reach maxInterestRate.
         *
         * @type {number}
         */
        this.maxInterestDistance = this.maxInterestDistance || 0;

        /**
         * The maximum rate buried gold can increase over time.
         *
         * @type {number}
         */
        this.maxInterestRate = this.maxInterestRate || 0;

        /**
         * The maximum number of turns before the game will automatically end.
         *
         * @type {number}
         */
        this.maxTurns = this.maxTurns || 0;

        /**
         * How much gold it costs a merchant Port to create a crew member.
         *
         * @type {number}
         */
        this.merchantCrewCost = this.merchantCrewCost || 0;

        /**
         * How much gold merchant Ports get per turn. They gain (Port.investment * merchantInvestmentRate) gold each turn.
         *
         * @type {number}
         */
        this.merchantInvestmentRate = this.merchantInvestmentRate || 0;

        /**
         * How much gold it costs a merchant Port to create a ship.
         *
         * @type {number}
         */
        this.merchantShipCost = this.merchantShipCost || 0;

        /**
         * List of all the players in the game.
         *
         * @type {Array.<Player>}
         */
        this.players = this.players || [];

        /**
         * How much gold it costs to construct a port.
         *
         * @type {number}
         */
        this.portCost = this.portCost || 0;

        /**
         * The maximum amount of health a Port can have.
         *
         * @type {number}
         */
        this.portHealth = this.portHealth || 0;

        /**
         * Every Port in the game.
         *
         * @type {Array.<Port>}
         */
        this.ports = this.ports || [];

        /**
         * How far a Unit can be from a Port to rest. Range is circular.
         *
         * @type {number}
         */
        this.restRange = this.restRange || 0;

        /**
         * A unique identifier for the game instance that is being played.
         *
         * @type {string}
         */
        this.session = this.session || "";

        /**
         * How much gold it costs to construct a ship.
         *
         * @type {number}
         */
        this.shipCost = this.shipCost || 0;

        /**
         * How much damage ships deal to ships and ports.
         *
         * @type {number}
         */
        this.shipDamage = this.shipDamage || 0;

        /**
         * The maximum amount of health a ship can have.
         *
         * @type {number}
         */
        this.shipHealth = this.shipHealth || 0;

        /**
         * The number of moves Units with ships are given each turn.
         *
         * @type {number}
         */
        this.shipMoves = this.shipMoves || 0;

        /**
         * A ship's attack range. Range is circular.
         *
         * @type {number}
         */
        this.shipRange = this.shipRange || 0;

        /**
         * All the tiles in the map, stored in Row-major order. Use `x + y * mapWidth` to access the correct index.
         *
         * @type {Array.<Tile>}
         */
        this.tiles = this.tiles || [];

        /**
         * Every Unit in the game.
         *
         * @type {Array.<Unit>}
         */
        this.units = this.units || [];


        //<<-- Creer-Merge: init -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.

        this.maxTurns = data.maxTurns || 360;
        this.mapWidth = data.mapWidth || 40;
        this.mapHeight = data.mapHeight || 28;

        this.crewCost = data.crewCost || 200;
        this.shipCost = data.shipCost || 1000;
        this.portCost = data.portCost || 2000;
        this.crewDamage = data.crewDamage || 1;
        this.shipDamage = data.shipDamage || 2;
        this.crewHealth = data.crewHealth || 4;
        this.shipHealth = data.shipHealth || 10;
        this.portHealth = data.portHealth || 20;
        this.crewRange = data.crewRange || 1;
        this.shipRange = data.shipRange || 4;
        this.crewMoves = data.crewMoves || 2;
        this.shipMoves = data.shipMoves || 3;

        this.restRange = data.restRange || 1.5;
        this.healFactor = data.healFactor || 0.25;

        // Mapgen variables
        this.startingGold = data.startingGold || 3000;
        this.merchantStartingGold = data.merchantStartingGold || 0;
        this.merchantStartingInvestment = data.merchantStartingInvestment || 1000;
        this.merchantInvestmentRate = data.merchantStartingInvestment || 0.1;
        this.merchantShipCost = data.merchantShipCost || 1000;
        this.merchantCrewCost = data.merchantCrewCost || 100;

        // For units and structures created during a turn
        this.newUnits = [];
        this.newPorts = [];

        //<<-- /Creer-Merge: init -->>
    },

    name: "Pirates",

    aliases: [
        //<<-- Creer-Merge: aliases -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.
        "MegaMinerAI-##-Pirates",
        //<<-- /Creer-Merge: aliases -->>
    ],



    /**
     * This is called when the game begins, once players are connected and ready to play, and game objects have been initialized. Anything in init() may not have the appropriate game objects created yet..
     */
    begin: function() {
        TiledGame.begin.apply(this, arguments);
        TurnBasedGame.begin.apply(this, arguments);
        TwoPlayerGame.begin.apply(this, arguments);

        //<<-- Creer-Merge: begin -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.

        // Initialize the map and creates all the tiles
        TiledGame._initMap.call(this);

        // Generate the map
        this.generateIslands();

        // Give players their starting gold
        for(let player of this.players) {
            player.gold = 3000;
        }

        //<<-- /Creer-Merge: begin -->>
    },

    /**
     * This is called when the game has started, after all the begin()s. This is a good spot to send orders.
     */
    _started: function() {
        TiledGame._started.apply(this, arguments);
        TurnBasedGame._started.apply(this, arguments);
        TwoPlayerGame._started.apply(this, arguments);

        //<<-- Creer-Merge: _started -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.
        // any logic for _started can be put here
        //<<-- /Creer-Merge: _started -->>
    },


    //<<-- Creer-Merge: added-functions -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.

    /**
     * Invoked before the current player starts their turn
     *
     * @override
     * @returns {*} passes through the default return value
     */
    beforeTurn: function() {
        // Update all arrays
        this.updateArrays();

        // Call base class' beforeTurn function
        return TurnBasedGame.beforeTurn.apply(this, arguments);
    },

    /**
     * Invoked when the current player ends their turn. Perform in between game logic here
     *
     * @override
     * @returns {*} passes through the default return value
     */
    nextTurn: function() {
        // Update all arrays
        this.updateArrays();
        this.updateUnits();
        this.updateMerchants();

        if(this.checkForWinner(false)) {
            // If somebody won, don't continue to the next turn
            return;
        }

        // Continue to the next player (normal next turn logic)
        return TurnBasedGame.nextTurn.apply(this, arguments);
    },

    /**
     * invoked when max turns are reached
     *
     * @override
     */
    _maxTurnsReached: function() {
        this.checkForWinner("Avast! Ye ran outta turns");
    },

    updateArrays: function() {
        // Properly add all new units
        for(let unit of this.newUnits) {
            this.units.push(unit);
            if(unit.owner) {
                unit.owner.units.push(unit);
            }
        }
        this.newUnits = [];

        // Properly add all new ports
        for(let port of this.newPorts) {
            this.ports.push(port);
            if(port.owner) {
                port.owner.ports.push(port);
            }
        }
        this.newPorts = [];

        // Remove all invalid ports
        for(let i = 0; i < this.ports.length; i++) {
            const port = this.ports[i];
            if(!port.tile) {
                if(port.owner) {
                    // Remove this port from its owner's ports array
                    port.owner.ports.removeElement(port);
                }

                // Remove this port from the game's ports array
                this.ports.splice(i, 1);
                i--;
            }
        }

        // Unit arrays cleanup
        for(let i = 0; i < this.units.length; i++) {
            const unit = this.units[i];

            // Remove all invalid units
            if(!unit.tile) {
                if(unit.owner) {
                    // Remove this unit from its owner's units array
                    unit.owner.units.removeElement(unit);
                }

                // Remove this unit from the game's units array
                this.units.splice(i, 1);
                i--;
                continue;
            }

            // Make sure player units arrays are correct
            // I know this hurts to read...
            for(let player of this.players) {
                let found = player.units.find(u => u.id === unit.id);

                if(unit.owner !== player && found) {
                    // Remove the unit from the player's unit array if it's not their unit
                    player.units.removeElement(unit);
                }
                else if(unit.owner === player && !found) {
                    // Add the unit to the player's unit array if it is their unit
                    player.units.push(unit);
                }
            }
        }
    },

    updateUnits: function() {
        for(let unit of this.units) {
            // Reset the unit
            if(!unit.owner || unit.owner === this.currentPlayer) {
                unit.acted = false;
                unit.moves = Math.max(this.crewMoves, unit.shipHealth > 0 ? this.shipMoves : 0);
            }

            // Move merchant units
            if(!unit.owner && unit.targetPort) {
                // Check current path
                let pathValid = true;
                if(unit.path && unit.path.length > 0) {
                    if(unit.path[0].unit) {
                        pathValid = false;
                    }
                    else {
                        // Make sure each tile along this path is open
                        for(let tile of unit.path) {
                            // Owned ports are obstacles
                            if(tile.port && tile.port.owner) {
                                pathValid = false;
                            }

                            if(tile.unit) {
                                // Owned units and units not in ports are obstacles
                                if(tile.unit.owner || !tile.port) {
                                    pathValid = false;
                                }
                            }
                        }
                    }
                }
                else {
                    pathValid = false;
                }

                // Find path to target port (BFS)
                if(!pathValid) {
                    let open = [{
                        tile: unit.tile,
                        g: 0,
                        parent: null,
                    }];
                    let closed = {};

                    unit.path = [];
                    while(open.length > 0) {
                        // Pop the first open element (lowest distance)
                        let cur = open.shift();
                        if(cur.tile.id in closed) {
                            continue;
                        }
                        closed[cur.tile.id] = true;

                        // Check if at the target
                        if(cur.tile === unit.targetPort.tile) {
                            while(cur) {
                                if(cur.tile !== unit.tile) {
                                    unit.path.unshift(cur.tile);
                                }
                                cur = cur.parent;
                            }

                            break;
                        }

                        // Add neighbors
                        let neighbors = [];
                        neighbors.push(cur.tile.tileNorth);
                        neighbors.push(cur.tile.tileEast);
                        neighbors.push(cur.tile.tileSouth);
                        neighbors.push(cur.tile.tileWest);

                        let unsorted = false;
                        for(let neighbor of neighbors) {
                            if(neighbor) {
                                // Don't path through land
                                if(neighbor.type === "land") {
                                    continue;
                                }

                                // Don't path through player ports
                                if(neighbor.port && neighbor.port.owner) {
                                    continue;
                                }

                                // Don't path through friendly units unless it's a port
                                if(neighbor.unit && !neighbor.port) {
                                    continue;
                                }

                                open.push({
                                    tile: neighbor,
                                    g: cur.g + 1,
                                    parent: cur,
                                });
                                unsorted = true;
                            }
                        }

                        // Sort open list
                        if(unsorted) {
                            open.sort((a, b) => a.g - b.g);
                        }
                    }
                }

                // Make the merchant attack this turn's player if they have a unit in range
                let target = this.currentPlayer.units.find(u => {
                    // Only attack ships
                    if(u.shipHealth <= 0) {
                        return false;
                    }

                    // Check if in range
                    return Math.pow(unit.tile.x - u.tile.x, 2) + Math.pow(unit.tile.y - u.tile.y, 2) <= this.shipRange * this.shipRange;
                }, this);

                if(target) {
                    // Attack the target
                    target.shipHealth -= this.shipDamage;
                    if(target.shipHealth <= 0) {
                        target.tile.unit = null;
                        target.tile = null;
                    }
                }

                // Move the merchant
                if(unit.path.length > 0) {
                    // Check if it's at its destination
                    if(unit.path[0].port === unit.targetPort) {
                        // Mark it as dead
                        unit.tile.unit = null;
                        unit.tile = null;
                    }
                    else {
                        const tile = unit.path.shift();
                        unit.tile.unit = null;
                        unit.tile = tile;
                        tile.unit = unit;
                    }
                }
            }
        }
    },

    updateMerchants: function() {
        // Create units as needed
        let merchantPorts = this.ports.filter(p => !p.owner);
        for(let i = 0; i < merchantPorts.length; i++) {
            const port = merchantPorts[i];

            // Skip player-owned ports
            if(port.owner) {
                continue;
            }

            // Add gold to the port
            port.gold += port.investment * this.merchantInvestmentRate;

            // Try to spawn a ship
            if(!port.tile.unit && port.gold >= this.merchantShipCost + this.merchantCrewCost) {
                // Deduct gold
                port.gold -= this.merchantShipCost;
                let crew = Math.floor(port.gold / this.merchantCrewCost);
                port.gold -= this.merchantCrewCost * crew;

                // Pick a random port to move to
                let targetPorts = merchantPorts.filter(p => p !== port);
                let targetPort = Math.floor(Math.random() * (targetPorts.length));

                // Spawn the unit
                let unit = this.create("Unit", {
                    owner: null,
                    tile: port.tile,
                    crew: crew,
                    shipHealth: this.shipHealth,
                    gold: port.investment,
                    targetPort: targetPorts[targetPort],
                });

                unit.tile.unit = unit;
                this.newUnits.push(unit);
            }
        }
    },

    checkForWinner: function(secondaryReason) {
        // End the game if either player is out of units and can't afford any

        // Max turns reached
        if(secondaryReason) {
            // Check who has the most infamy

            // Check who has the most units

            // Check who has the most ports

            // Check who has the most gold

            // Coin toss
            this._endGameViaCoinFlip(secondaryReason);
            return true;
        }
    },

    generateIslands: function() {
        // Flood the map
        for(let tile of this.tiles) {
            tile.type = "water";
        }

        // Generate some metaballs for the islands
        let balls = [];
        const minRadius = 0.1;
        const maxRadius = 1.0;
        const maxOffset = 5.0;
        const additionalBalls = 20;
        const gooeyness = 1.0;
        const threshold = 3.5;
        const radiusRange = maxRadius - minRadius;

        // Initial ball (top island)
        let islandX = Math.floor(this.mapWidth / 4) + 0.5;
        let islandY = Math.floor(this.mapHeight / 4) + 0.5;
        balls.push({
            x: islandX,
            y: islandY,
            r: Math.random() * radiusRange + minRadius,
        });

        // Extra balls (top island)
        for(let i = 0; i < additionalBalls; i++) {
            balls.push({
                x: islandX + Math.random() * maxOffset * 2 - maxOffset,
                y: islandY - Math.random() * maxOffset,
                r: Math.random() * radiusRange + minRadius,
            });
        }

        // Initial ball (bottom island)
        islandY = Math.floor(3 * this.mapHeight / 4) + 0.5;
        balls.push({
            x: islandX,
            y: islandY,
            r: Math.random() * radiusRange + minRadius,
        });

        // Extra balls (bottom island)
        for(let i = 0; i < additionalBalls; i++) {
            balls.push({
                x: islandX + Math.random() * maxOffset * 2 - maxOffset,
                y: islandY - Math.random() * maxOffset,
                r: Math.random() * radiusRange + minRadius,
            });
        }

        // Generate the islands from the metaballs
        for(let x = 0; x < this.mapWidth / 2; x++) {
            for(let y = 0; y < this.mapHeight; y++) {
                let tile = this.getTile(x, y);
                let energy = 0;
                for(const ball of balls) {
                    let r = ball.r;
                    let dist = Math.sqrt(Math.pow(ball.x - x, 2) + Math.pow(ball.y - y, 2));
                    let d = Math.max(0.0001, Math.pow(dist, gooeyness)); // Can't be 0
                    energy += r / d;
                }

                if(energy > threshold) {
                    tile.type = "land";
                }
            }
        }

        // Find all possible port locations
        let portTiles = [];
        portTiles = this.tiles.filter(t => {
            // Check type
            if(t.type !== "water") {
                return false;
            }

            // Check neighbors
            if(t.tileNorth && t.tileNorth.type === "land") {
                return true;
            }
            if(t.tileEast && t.tileEast.type === "land") {
                return true;
            }
            if(t.tileSouth && t.tileSouth.type === "land") {
                return true;
            }
            if(t.tileWest && t.tileWest.type === "land") {
                return true;
            }

            return false;
        }, this);

        // Place the starting port
        let selected = Math.floor(Math.random() * portTiles.length);
        let port = this.create("Port", {
            owner: this.players[0],
            tile: portTiles[selected],
            destroyable: false,
        });
        portTiles.splice(selected, 1);
        port.tile.port = port;
        port.owner.startingPort = port;
        this.newPorts.push(port);

        // Place merchant ports
        const minMerchants = 1;
        const maxMerchants = 3;
        let merchantPorts = minMerchants + Math.round(Math.random() * (maxMerchants - minMerchants));
        for(; merchantPorts > 0; merchantPorts--) {
            let selected = Math.floor(Math.random() * portTiles.length);
            let port = this.create("Port", {
                owner: null,
                tile: portTiles[selected],
                destroyable: false,
                gold: this.merchantStartingGold,
                investment: this.merchantStartingInvestment,
            });

            // If it's a merchant port, stagger the starting gold so they don't all spawn units on the same turn
            if(!port.owner) {
                port.gold += port.investment * this.merchantInvestmentRate;
            }

            // Add the port to the game
            port.tile.port = port;
            portTiles.splice(selected, 1);
            this.newPorts.push(port);
        }

        // Mirror the map
        for(let x = 0; x < Math.floor(this.mapWidth / 2); x++) {
            for(let y = 0; y < this.mapHeight; y++) {
                let orig = this.getTile(x, y);
                let target = this.getTile(this.mapWidth - x - 1, this.mapHeight - y - 1);

                // Copy tile data
                target.type = orig.type;

                // Clone ports
                if(orig.port) {
                    port = this.create("Port", {
                        tile: target,
                        owner: orig.port.owner && orig.port.owner.opponent,
                        destroyable: false,
                        gold: orig.port.gold,
                        investment: orig.port.investment,
                    });
                    target.port = port;
                    port.tile.port = port;
                    this.newPorts.push(port);
                    if(port.owner) {
                        port.owner.startingPort = port;
                    }
                }
            }
        }
    },

    //<<-- /Creer-Merge: added-functions -->>

});

module.exports = Game;
