import { IBaseGameRequiredData } from "~/core/game";
import { BaseClasses } from "./";
import { CoreminerGameManager } from "./game-manager";
import { GameObject } from "./game-object";
import { CoreminerGameSettingsManager } from "./game-settings";
import { Job } from "./job";
import { Player } from "./player";
import { Tile } from "./tile";
import { Unit } from "./unit";

// <<-- Creer-Merge: imports -->>
import { Mutable } from "~/utils";
// <<-- /Creer-Merge: imports -->>

/**
 * Mine resources to obtain more wealth than your opponent.
 */
export class CoreminerGame extends BaseClasses.Game {
    /** The manager of this game, that controls everything around it */
    public readonly manager!: CoreminerGameManager;

    /** The settings used to initialize the game, as set by players */
    public readonly settings = Object.freeze(this.settingsManager.values);

    /**
     * The player whose turn it is currently. That player can send commands.
     * Other players cannot.
     */
    public currentPlayer!: Player;

    /**
     * The current turn number, starting at 0 for the first player's turn.
     */
    public currentTurn!: number;

    /**
     * The amount of turns it takes to gain a free Bomb.
     */
    public readonly freeBombInterval!: number;

    /**
     * A mapping of every game object's ID to the actual game object. Primarily
     * used by the server and client to easily refer to the game objects via
     * ID.
     */
    public gameObjects!: {[id: string]: GameObject};

    /**
     * A list of all jobs.
     */
    public jobs!: Job[];

    /**
     * The amount of building material required to build a ladder.
     */
    public readonly ladderCost!: number;

    /**
     * The number of Tiles in the map along the y (vertical) axis.
     */
    public readonly mapHeight!: number;

    /**
     * The number of Tiles in the map along the x (horizontal) axis.
     */
    public readonly mapWidth!: number;

    /**
     * The maximum number of turns before the game will automatically end.
     */
    public readonly maxTurns!: number;

    /**
     * The amount of victory points awarded when ore is deposited in the base.
     */
    public readonly oreValue!: number;

    /**
     * List of all the players in the game.
     */
    public players!: Player[];

    /**
     * A unique identifier for the game instance that is being played.
     */
    public readonly session!: string;

    /**
     * The amount of building material required to shield a Tile.
     */
    public readonly shieldCost!: number;

    /**
     * The amount of building material required to build a support.
     */
    public readonly supportCost!: number;

    /**
     * All the tiles in the map, stored in Row-major order. Use `x + y *
     * mapWidth` to access the correct index.
     */
    public tiles!: Tile[];

    /**
     * The amount of time (in nano-seconds) added after each player performs a
     * turn.
     */
    public readonly timeAddedPerTurn!: number;

    /**
     * Every Unit in the game.
     */
    public units!: Unit[];

    /**
     * The amount of victory points required to win.
     */
    public readonly victoryAmount!: number;

    // <<-- Creer-Merge: attributes -->>

    // Any additional member attributes can go here
    // NOTE: They will not be sent to the AIs, those must be defined
    // in the creer file.

    // <<-- /Creer-Merge: attributes -->>

    /**
     * Called when a Game is created.
     *
     * @param settingsManager - The manager that holds initial settings.
     * @param required - Data required to initialize this (ignore it).
     */
    constructor(
        protected settingsManager: CoreminerGameSettingsManager,
        required: Readonly<IBaseGameRequiredData>,
    ) {
        super(settingsManager, required);

        // <<-- Creer-Merge: constructor -->>
        this.createJobs();

        this.createMap();
        // <<-- /Creer-Merge: constructor -->>
    }

    // <<-- Creer-Merge: public-functions -->>

    // Any public functions can go here for other things in the game to use.
    // NOTE: Client AIs cannot call these functions, those must be defined
    // in the creer file.

    // <<-- /Creer-Merge: public-functions -->>

    /**
     * Gets the tile at (x, y), or undefined if the co-ordinates are off-map.
     *
     * @param x - The x position of the desired tile.
     * @param y - The y position of the desired tile.
     * @returns The Tile at (x, y) if valid, undefined otherwise.
     */
    public getTile(x: number, y: number): Tile | undefined {
        // tslint:disable-next-line:no-unsafe-any
        return super.getTile(x, y) as Tile | undefined;
    }

    // <<-- Creer-Merge: protected-private-functions -->>

    /** Creates all the jobs in the game. */
    private createJobs(): void {
        this.jobs.push(
            this.manager.create.job({
                title: "miner",
                health: [25, 50, 75, 100],
                moves: [2, 3, 4, 5],
                miningPower: [50, 100, 150, 200],
                cargoCapacity: [250, 500, 750, 1000],
                cost: 200,
            }),

            this.manager.create.job({
                title: "bomb",
                cost: 0,
            }),
        );
    }

    /** Create the game map. */
    private createMap(): void {
        /**
         * Utility function to get a mutable tile at a given (x, y).
         *
         * NOTE: This is a closure function. It is a function we create while
         * running createMap(), and it wraps the current scope, so that `this`
         * refers to the Game running `createMap()`, even though the game was
         * not passed.
         * @param x - The x coordinate. If off map throws an Error.
         * @param y - The y coordinate. If off map throws an Error.
         * @returns A Tile that is mutable JUST for this function scope.
         */
        const getMutableTile = (x: number, y: number): Mutable<Tile> => {
            const tile = this.getTile(x, y);

            if (!tile) {
                throw new Error(`Cannot get a tile for map generation at (${x}, ${y})`);
            }

            return tile;
        };

        // Define half of map for ease of use
        const side = Math.round(this.mapWidth / 2);

        // Define number of dirt layers
        const layerCount = 4;

        // At different y values, tile.dirt has different values - these are called layers
        // The tiles at y = 0 are not in a layer
        // Define the layer depths - each number n means layer occurs when y < n
        // Earlier layers are prioritized in generation
        // We have 4 layers
        const mapSlice = this.mapHeight / 100;
        const layerDepths = [15, 40, 75, 100].map((x) => x * mapSlice);

        // Define the number of rows per layer
        const layerHeights = [layerDepths[0] - 1];
        for (let i = 1; i < layerCount; i++) {
            let aboveRows = 0;

            layerHeights.forEach((h) => {
                aboveRows += h;
            });

            const height = layerDepths[i] - aboveRows - 1;
            layerHeights.push(height);
        }

        // Define an array that holds each row of dirt Tiles
        const rows: Tile[][] = Array(this.mapHeight - 1);

        for (let i = 0; i < rows.length; i++) {
            rows[i] = [];
        }

        // Define amount of dirt per Tile in each layer
        const layerDirtDensities = [25, 75, 225, 500];

        // Generate layer map for one side
        // Also set one Player's base
        for (let y = 0; y < this.mapHeight; y++) {
            for (let x = 0; x < side; x++) {
                const tile = getMutableTile(x, y);

                if (y === 0) {
                    // Surface layer
                    tile.dirt = 0;
                    tile.ore = 0;

                    if (x === 0) {
                        tile.isBase = true;
                        tile.owner = this.players[0];
                    }
                }
                else {
                    // Dirt layers
                    for (let i = 0; i < layerCount; i++) {
                        if (y < layerDepths[i]) {
                            tile.dirt = layerDirtDensities[i];
                            rows[y - 1].push(tile as Tile);
                            break;
                        }
                    }
                }
            }
        }

        // Define an array that groups each row by layer
        const layerRows: Tile[][][] = Array(layerCount);

        for (let i = 0; i < layerCount; i++) {
            layerRows[i] = [];
        }

        for (let y = 0; y < rows.length; y++) {
            let tileLayer = 0;
            for (let i = 0; i < layerDepths.length; i++) {
                if (y < layerDepths[i] - 1) {
                    tileLayer = i;
                    break;
                }
            }
            layerRows[tileLayer].push(rows[y]);
        }

        /**
         * Utility function to get a biased random integer.
         * Used to randomly populate the map with ore.
         * Bias is used to make more ore spawn towards the middle of the map.
         *
         * @param influence - The amount of influence given to the bias.
         * @param min - The minimum value for the RNG.
         * @param max - The maximum (excluded) value for the RNG.
         * @returns An integer number that is biased in some way towards the map center.
         */
        const getBiasedInt = (influence: number, min: number = 0, max: number = side): number => {
            const bias = max - 1;

            const rnd = this.manager.random.int(max, min);
            const mix = this.manager.random.float(1, 0) * influence;
            const value = rnd * (1 - mix) + (bias * mix);

            return Math.round(value);
        };

        // Define number of ore deposits per layer (on one side)
        // Numbers are percentage of tiles in the layer with ore
        // Must be between 0 and 1 (0% ore to 100% ore)
        const layerOreCounts: number[] = [0.07, 0.10, 0.15, 0.20]
        .map((c, i) => Math.round(c * layerRows[i].length * side));

        // Define amount of ore per ore Tile per layer
        const layerOreDensities = [50, 100, 200, 300];

        // Define influence values for biases per layer
        // Must be between 0 and 1 (weak to strong)
        const layerInfluences = [0.1, 0.2, 0.4, 0.8];

        // Populate each layer with ore.
        // Adds ore in case of repeated random Tile positions
        layerRows.forEach((layer, i) => {
            for (let c = layerOreCounts[i]; c > 0; c--) {
                const randomY = this.manager.random.int(layer.length, 0);
                const randomX = getBiasedInt(layerInfluences[i]);

                layerRows[i][randomY][randomX].ore += layerOreDensities[i];
            }
        });

        // Generate cache of ore in the center of the map
        const cacheLayer = layerRows[layerRows.length - 1];
        const cacheOreCount = 7;
        const cacheOreDensity = 500;
        const cacheMinX = Math.floor(side * 0.8);
        const cacheXBias = 1;
        const cacheYBias = 0.8;

        for (let c = cacheOreCount; c > 0; c--) {
            const randomY = getBiasedInt(cacheYBias, 0, cacheLayer.length);
            const randomX = getBiasedInt(cacheXBias, cacheMinX);

            cacheLayer[randomY][randomX].ore += cacheOreDensity;
        }

        // Mirror the surface of the map
        for (let x = 0; x < this.mapWidth; x++) {
            const tile = getMutableTile(x, 0);
            const oppositeTile = getMutableTile(this.mapWidth - x - 1, 0);

            if (tile.owner !== undefined) {
                oppositeTile.owner = tile.owner.opponent;
                oppositeTile.isBase = tile.isBase;
            }
        }

        // Mirror the rest of the map
        rows.forEach((row, y) => {
            row.forEach((tile: Tile, x: number) => {
                const oppositeTile = getMutableTile(this.mapWidth - x - 1, y + 1);

                oppositeTile.dirt = tile.dirt;
                oppositeTile.ore = tile.ore;
            });
        });
    }

    // <<-- /Creer-Merge: protected-private-functions -->>
}