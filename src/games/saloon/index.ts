// WARNING: Here be Dragons
// This file is generated by Creer, do not modify it
// It basically sets up all the classes, interfaces, types, and what-not that
// we need for TypeScript to know the base classes, while allowing for minimal
// code for developers to be forced to fill out.

// tslint:disable:max-classes-per-file
// ^ because we need to build a bunch of base class wrappers here

// base game classes
import { BaseAI, BaseGame, BaseGameManager, BaseGameObject,
         BaseGameObjectFactory, BaseGameSettingsManager, BasePlayer,
         makeNamespace } from "~/core/game";

// mixins
import { ITiledPlayer, ITurnBasedPlayer, ITwoPlayerPlayer, mixTiled,
         mixTurnBased, mixTwoPlayer } from "~/core/game/mixins";

// extract game object constructor args
import { FirstArgumentFromConstructor } from "~/utils";

/**
 * The interface the Player for the Saloon game
 * must implement from mixed in game logic.
 */
export interface IBaseSaloonPlayer extends
    BasePlayer,
    ITwoPlayerPlayer,
    ITurnBasedPlayer,
    ITiledPlayer {
}

const base0 = {
    AI: BaseAI,
    Game: BaseGame,
    GameManager: BaseGameManager,
    GameObject: BaseGameObject,
    GameSettings: BaseGameSettingsManager,
};

const base1 = mixTwoPlayer(base0);
const base2 = mixTurnBased(base1);
const base3 = mixTiled(base2);

const mixed = base3;

/** The base AI class for the Saloon game will mixin logic. */
class BaseSaloonAI extends mixed.AI {}

/** The base Game class for the Saloon game will mixin logic. */
class BaseSaloonGame extends mixed.Game {}

/** The base GameManager class for the Saloon game will mixin logic. */
class BaseSaloonGameManager extends mixed.GameManager {}

/** The base GameObject class for the Saloon game will mixin logic. */
class BaseSaloonGameObject extends mixed.GameObject {}

/** The base GameSettings class for the Saloon game will mixin logic. */
class BaseSaloonGameSettings extends mixed.GameSettings {}

/** The Base classes that game classes build off of. */
export const BaseClasses = {
    AI: BaseSaloonAI,
    Game: BaseSaloonGame,
    GameManager: BaseSaloonGameManager,
    GameObject: BaseSaloonGameObject,
    GameSettings: BaseSaloonGameSettings,
};

// Now all the base classes are created;
// so we can start importing/exporting the classes that need them.

/** All the possible properties for an Bottle. */
export interface IBottleProperties {
    /**
     * The Direction this Bottle is flying and will move to between turns, can
     * be 'North', 'East', 'South', or 'West'.
     */
    direction?: string;

    /**
     * The direction any Cowboys hit by this will move, can be 'North', 'East',
     * 'South', or 'West'.
     */
    drunkDirection?: string;

    /**
     * True if this Bottle has impacted and has been destroyed (removed from
     * the Game). False if still in the game flying through the saloon.
     */
    isDestroyed?: boolean;

    /**
     * The Tile this bottle is currently flying over.
     */
    tile?: Tile;

}

/** All the possible properties for an Cowboy. */
export interface ICowboyProperties {
    /**
     * If the Cowboy can be moved this turn via its owner.
     */
    canMove?: boolean;

    /**
     * The direction this Cowboy is moving while drunk. Will be 'North',
     * 'East', 'South', or 'West' when drunk; or '' (empty string) when not
     * drunk.
     */
    drunkDirection?: string;

    /**
     * How much focus this Cowboy has. Different Jobs do different things with
     * their Cowboy's focus.
     */
    focus?: number;

    /**
     * How much health this Cowboy currently has.
     */
    health?: number;

    /**
     * If this Cowboy is dead and has been removed from the game.
     */
    isDead?: boolean;

    /**
     * If this Cowboy is drunk, and will automatically walk.
     */
    isDrunk?: boolean;

    /**
     * The job that this Cowboy does, and dictates how they fight and interact
     * within the Saloon.
     */
    job?: "Bartender" | "Brawler" | "Sharpshooter";

    /**
     * The Player that owns and can control this Cowboy.
     */
    owner?: Player;

    /**
     * The Tile that this Cowboy is located on.
     */
    tile?: Tile;

    /**
     * How many times this unit has been drunk before taking their siesta and
     * reseting this to 0.
     */
    tolerance?: number;

    /**
     * How many turns this unit has remaining before it is no longer busy and
     * can `act()` or `play()` again.
     */
    turnsBusy?: number;

}

/**
 * Argument overrides for Cowboy's act function. If you return an object of
 * this interface from the invalidate functions, the value(s) you set will be
 * used in the actual function.
 */
export interface ICowboyActArgs {
    /**
     * The Tile you want this Cowboy to act on.
     */
    tile?: Tile;
    /**
     * The direction the bottle will cause drunk cowboys to be in, can be
     * 'North', 'East', 'South', or 'West'.
     */
    drunkDirection?: "" | "North" | "East" | "South" | "West";
}

/**
 * Argument overrides for Cowboy's move function. If you return an object of
 * this interface from the invalidate functions, the value(s) you set will be
 * used in the actual function.
 */
export interface ICowboyMoveArgs {
    /**
     * The Tile you want to move this Cowboy to.
     */
    tile?: Tile;
}

/**
 * Argument overrides for Cowboy's play function. If you return an object of
 * this interface from the invalidate functions, the value(s) you set will be
 * used in the actual function.
 */
export interface ICowboyPlayArgs {
    /**
     * The Furnishing that is a piano you want to play.
     */
    piano?: Furnishing;
}

/** All the possible properties for an Furnishing. */
export interface IFurnishingProperties {
    /**
     * How much health this Furnishing currently has.
     */
    health?: number;

    /**
     * If this Furnishing has been destroyed, and has been removed from the
     * game.
     */
    isDestroyed?: boolean;

    /**
     * True if this Furnishing is a piano and can be played, False otherwise.
     */
    isPiano?: boolean;

    /**
     * If this is a piano and a Cowboy is playing it this turn.
     */
    isPlaying?: boolean;

    /**
     * The Tile that this Furnishing is located on.
     */
    tile?: Tile;

}

/** All the possible properties for an GameObject. */
export interface IGameObjectProperties {
}

/** All the possible properties for an Player. */
export interface IPlayerProperties {
    /**
     * What type of client this is, e.g. 'Python', 'JavaScript', or some other
     * language. For potential data mining purposes.
     */
    clientType?: string;

    /**
     * Every Cowboy owned by this Player.
     */
    cowboys?: Cowboy[];

    /**
     * How many enemy Cowboys this player's team has killed.
     */
    kills?: number;

    /**
     * If the player lost the game or not.
     */
    lost?: boolean;

    /**
     * The name of the player.
     */
    name?: string;

    /**
     * This player's opponent in the game.
     */
    opponent?: Player;

    /**
     * The reason why the player lost the game.
     */
    reasonLost?: string;

    /**
     * The reason why the player won the game.
     */
    reasonWon?: string;

    /**
     * How rowdy their team is. When it gets too high their team takes a
     * collective siesta.
     */
    rowdiness?: number;

    /**
     * How many times their team has played a piano.
     */
    score?: number;

    /**
     * 0 when not having a team siesta. When greater than 0 represents how many
     * turns left for the team siesta to complete.
     */
    siesta?: number;

    /**
     * The amount of time (in ns) remaining for this AI to send commands.
     */
    timeRemaining?: number;

    /**
     * If the player won the game or not.
     */
    won?: boolean;

    /**
     * The YoungGun this Player uses to call in new Cowboys.
     */
    youngGun?: YoungGun;

}

/** All the possible properties for an Tile. */
export interface ITileProperties {
    /**
     * The beer Bottle currently flying over this Tile, undefined otherwise.
     */
    bottle?: Bottle;

    /**
     * The Cowboy that is on this Tile, undefined otherwise.
     */
    cowboy?: Cowboy;

    /**
     * The furnishing that is on this Tile, undefined otherwise.
     */
    furnishing?: Furnishing;

    /**
     * If this Tile is pathable, but has a hazard that damages Cowboys that
     * path through it.
     */
    hasHazard?: boolean;

    /**
     * If this Tile is a balcony of the Saloon that YoungGuns walk around on,
     * and can never be pathed through by Cowboys.
     */
    isBalcony?: boolean;

    /**
     * The Tile to the 'East' of this one (x+1, y). Undefined if out of bounds
     * of the map.
     */
    tileEast?: Tile;

    /**
     * The Tile to the 'North' of this one (x, y-1). Undefined if out of bounds
     * of the map.
     */
    tileNorth?: Tile;

    /**
     * The Tile to the 'South' of this one (x, y+1). Undefined if out of bounds
     * of the map.
     */
    tileSouth?: Tile;

    /**
     * The Tile to the 'West' of this one (x-1, y). Undefined if out of bounds
     * of the map.
     */
    tileWest?: Tile;

    /**
     * The x (horizontal) position of this Tile.
     */
    x?: number;

    /**
     * The y (vertical) position of this Tile.
     */
    y?: number;

    /**
     * The YoungGun on this tile, undefined otherwise.
     */
    youngGun?: YoungGun;

}

/** All the possible properties for an YoungGun. */
export interface IYoungGunProperties {
    /**
     * The Tile that a Cowboy will be called in on if this YoungGun calls in a
     * Cowboy.
     */
    callInTile?: Tile;

    /**
     * True if the YoungGun can call in a Cowboy, false otherwise.
     */
    canCallIn?: boolean;

    /**
     * The Player that owns and can control this YoungGun.
     */
    owner?: Player;

    /**
     * The Tile this YoungGun is currently on.
     */
    tile?: Tile;

}

/**
 * Argument overrides for YoungGun's callIn function. If you return an object
 * of this interface from the invalidate functions, the value(s) you set will
 * be used in the actual function.
 */
export interface IYoungGunCallInArgs {
    /**
     * The job you want the Cowboy being brought to have.
     */
    job?: "Bartender" | "Brawler" | "Sharpshooter";
}

export * from "./bottle";
export * from "./cowboy";
export * from "./furnishing";
export * from "./game-object";
export * from "./player";
export * from "./tile";
export * from "./young-gun";
export * from "./game";
export * from "./game-manager";
export * from "./ai";

import { Bottle } from "./bottle";
import { Cowboy } from "./cowboy";
import { Furnishing } from "./furnishing";
import { GameObject } from "./game-object";
import { Player } from "./player";
import { Tile } from "./tile";
import { YoungGun } from "./young-gun";

import { AI } from "./ai";
import { SaloonGame } from "./game";
import { SaloonGameManager } from "./game-manager";
import { SaloonGameSettingsManager } from "./game-settings";

/** The arguments used to construct a Bottle */
export type BottleArgs = FirstArgumentFromConstructor<typeof Bottle>;

/** The arguments used to construct a Cowboy */
export type CowboyArgs = FirstArgumentFromConstructor<typeof Cowboy>;

/** The arguments used to construct a Furnishing */
export type FurnishingArgs = FirstArgumentFromConstructor<typeof Furnishing>;

/** The arguments used to construct a Tile */
export type TileArgs = FirstArgumentFromConstructor<typeof Tile>;

/** The arguments used to construct a YoungGun */
export type YoungGunArgs = FirstArgumentFromConstructor<typeof YoungGun>;

/**
 * The factory that **must** be used to create any game objects in
 * the Saloon game.
 */
export class SaloonGameObjectFactory extends BaseGameObjectFactory {
    /**
     * Creates a new Bottle in the Game and tracks it for all players.
     *
     * @param args - Data about the Bottle to set. Any keys matching a property
     * in the game object's class will be automatically set for you.
     * @returns A new Bottle hooked up in the game and ready for you to use.
     */
    public bottle<T extends BottleArgs>(
        args: Readonly<T>,
    ): Bottle & T {
        return this.createGameObject("Bottle", Bottle, args);
    }

    /**
     * Creates a new Cowboy in the Game and tracks it for all players.
     *
     * @param args - Data about the Cowboy to set. Any keys matching a property
     * in the game object's class will be automatically set for you.
     * @returns A new Cowboy hooked up in the game and ready for you to use.
     */
    public cowboy<T extends CowboyArgs>(
        args: Readonly<T>,
    ): Cowboy & T {
        return this.createGameObject("Cowboy", Cowboy, args);
    }

    /**
     * Creates a new Furnishing in the Game and tracks it for all players.
     *
     * @param args - Data about the Furnishing to set. Any keys matching a
     * property in the game object's class will be automatically set for you.
     * @returns A new Furnishing hooked up in the game and ready for you to
     * use.
     */
    public furnishing<T extends FurnishingArgs>(
        args: Readonly<T>,
    ): Furnishing & T {
        return this.createGameObject("Furnishing", Furnishing, args);
    }

    /**
     * Creates a new Tile in the Game and tracks it for all players.
     *
     * @param args - Data about the Tile to set. Any keys matching a property
     * in the game object's class will be automatically set for you.
     * @returns A new Tile hooked up in the game and ready for you to use.
     */
    public tile<T extends TileArgs>(
        args: Readonly<T>,
    ): Tile & T {
        return this.createGameObject("Tile", Tile, args);
    }

    /**
     * Creates a new YoungGun in the Game and tracks it for all players.
     *
     * @param args - Data about the YoungGun to set. Any keys matching a
     * property in the game object's class will be automatically set for you.
     * @returns A new YoungGun hooked up in the game and ready for you to use.
     */
    public youngGun<T extends YoungGunArgs>(
        args: Readonly<T>,
    ): YoungGun & T {
        return this.createGameObject("YoungGun", YoungGun, args);
    }

}

/**
 * The shared namespace for Saloon that is used to
 * initialize each game instance.
 */
export const Namespace = makeNamespace({
    AI,
    Game: SaloonGame,
    GameManager: SaloonGameManager,
    GameObjectFactory: SaloonGameObjectFactory,
    GameSettingsManager: SaloonGameSettingsManager,
    Player,

    // These are generated metadata that allow delta-merging values from
    // clients.
    // They are never intended to be directly interfaced with outside of the
    // Cerveau core developers.
    gameName: "Saloon",
    gameSettingsManager: new SaloonGameSettingsManager(),
    gameObjectsSchema: {
        AI: {
            attributes: {
            },
            functions: {
                runTurn: {
                    args: [
                    ],
                    returns: {
                        typeName: "boolean",
                    },
                },
            },
        },
        Game: {
            attributes: {
                bartenderCooldown: {
                    typeName: "int",
                },
                bottles: {
                    typeName: "list",
                    valueType: {
                        typeName: "gameObject",
                        gameObjectClass: Bottle,
                        nullable: false,
                    },
                },
                brawlerDamage: {
                    typeName: "int",
                },
                cowboys: {
                    typeName: "list",
                    valueType: {
                        typeName: "gameObject",
                        gameObjectClass: Cowboy,
                        nullable: false,
                    },
                },
                currentPlayer: {
                    typeName: "gameObject",
                    gameObjectClass: Player,
                    nullable: false,
                },
                currentTurn: {
                    typeName: "int",
                },
                furnishings: {
                    typeName: "list",
                    valueType: {
                        typeName: "gameObject",
                        gameObjectClass: Furnishing,
                        nullable: false,
                    },
                },
                gameObjects: {
                    typeName: "dictionary",
                    keyType: {
                        typeName: "string",
                    },
                    valueType: {
                        typeName: "gameObject",
                        gameObjectClass: GameObject,
                        nullable: false,
                    },
                },
                jobs: {
                    typeName: "list",
                    valueType: {
                        typeName: "string",
                    },
                },
                mapHeight: {
                    typeName: "int",
                },
                mapWidth: {
                    typeName: "int",
                },
                maxCowboysPerJob: {
                    typeName: "int",
                },
                maxTurns: {
                    typeName: "int",
                },
                players: {
                    typeName: "list",
                    valueType: {
                        typeName: "gameObject",
                        gameObjectClass: Player,
                        nullable: false,
                    },
                },
                rowdinessToSiesta: {
                    typeName: "int",
                },
                session: {
                    typeName: "string",
                },
                sharpshooterDamage: {
                    typeName: "int",
                },
                siestaLength: {
                    typeName: "int",
                },
                tiles: {
                    typeName: "list",
                    valueType: {
                        typeName: "gameObject",
                        gameObjectClass: Tile,
                        nullable: false,
                    },
                },
                timeAddedPerTurn: {
                    typeName: "int",
                },
                turnsDrunk: {
                    typeName: "int",
                },
            },
            functions: {
            },
        },
        Bottle: {
            parentClassName: "GameObject",
            attributes: {
                direction: {
                    typeName: "string",
                },
                drunkDirection: {
                    typeName: "string",
                },
                isDestroyed: {
                    typeName: "boolean",
                },
                tile: {
                    typeName: "gameObject",
                    gameObjectClass: Tile,
                    nullable: true,
                },
            },
            functions: {
            },
        },
        Cowboy: {
            parentClassName: "GameObject",
            attributes: {
                canMove: {
                    typeName: "boolean",
                },
                drunkDirection: {
                    typeName: "string",
                },
                focus: {
                    typeName: "int",
                },
                health: {
                    typeName: "int",
                },
                isDead: {
                    typeName: "boolean",
                },
                isDrunk: {
                    typeName: "boolean",
                },
                job: {
                    typeName: "string",
                    defaultValue: "Bartender",
                    literals: ["Bartender", "Brawler", "Sharpshooter"],
                },
                owner: {
                    typeName: "gameObject",
                    gameObjectClass: Player,
                    nullable: false,
                },
                tile: {
                    typeName: "gameObject",
                    gameObjectClass: Tile,
                    nullable: true,
                },
                tolerance: {
                    typeName: "int",
                },
                turnsBusy: {
                    typeName: "int",
                },
            },
            functions: {
                act: {
                    args: [
                        {
                            argName: "tile",
                            typeName: "gameObject",
                            gameObjectClass: Tile,
                            nullable: false,
                        },
                        {
                            argName: "drunkDirection",
                            typeName: "string",
                            literals: ["", "North", "East", "South", "West"],
                            defaultValue: "",
                        },
                    ],
                    invalidValue: false,
                    returns: {
                        typeName: "boolean",
                    },
                },
                move: {
                    args: [
                        {
                            argName: "tile",
                            typeName: "gameObject",
                            gameObjectClass: Tile,
                            nullable: false,
                        },
                    ],
                    invalidValue: false,
                    returns: {
                        typeName: "boolean",
                    },
                },
                play: {
                    args: [
                        {
                            argName: "piano",
                            typeName: "gameObject",
                            gameObjectClass: Furnishing,
                            nullable: false,
                        },
                    ],
                    invalidValue: false,
                    returns: {
                        typeName: "boolean",
                    },
                },
            },
        },
        Furnishing: {
            parentClassName: "GameObject",
            attributes: {
                health: {
                    typeName: "int",
                },
                isDestroyed: {
                    typeName: "boolean",
                },
                isPiano: {
                    typeName: "boolean",
                },
                isPlaying: {
                    typeName: "boolean",
                },
                tile: {
                    typeName: "gameObject",
                    gameObjectClass: Tile,
                    nullable: true,
                },
            },
            functions: {
            },
        },
        GameObject: {
            attributes: {
                gameObjectName: {
                    typeName: "string",
                },
                id: {
                    typeName: "string",
                },
                logs: {
                    typeName: "list",
                    valueType: {
                        typeName: "string",
                    },
                },
            },
            functions: {
                log: {
                    args: [
                        {
                            argName: "message",
                            typeName: "string",
                        },
                    ],
                    returns: {
                        typeName: "void",
                    },
                },
            },
        },
        Player: {
            parentClassName: "GameObject",
            attributes: {
                clientType: {
                    typeName: "string",
                },
                cowboys: {
                    typeName: "list",
                    valueType: {
                        typeName: "gameObject",
                        gameObjectClass: Cowboy,
                        nullable: false,
                    },
                },
                kills: {
                    typeName: "int",
                },
                lost: {
                    typeName: "boolean",
                },
                name: {
                    typeName: "string",
                },
                opponent: {
                    typeName: "gameObject",
                    gameObjectClass: Player,
                    nullable: false,
                },
                reasonLost: {
                    typeName: "string",
                },
                reasonWon: {
                    typeName: "string",
                },
                rowdiness: {
                    typeName: "int",
                },
                score: {
                    typeName: "int",
                },
                siesta: {
                    typeName: "int",
                },
                timeRemaining: {
                    typeName: "float",
                },
                won: {
                    typeName: "boolean",
                },
                youngGun: {
                    typeName: "gameObject",
                    gameObjectClass: YoungGun,
                    nullable: false,
                },
            },
            functions: {
            },
        },
        Tile: {
            parentClassName: "GameObject",
            attributes: {
                bottle: {
                    typeName: "gameObject",
                    gameObjectClass: Bottle,
                    nullable: true,
                },
                cowboy: {
                    typeName: "gameObject",
                    gameObjectClass: Cowboy,
                    nullable: true,
                },
                furnishing: {
                    typeName: "gameObject",
                    gameObjectClass: Furnishing,
                    nullable: true,
                },
                hasHazard: {
                    typeName: "boolean",
                },
                isBalcony: {
                    typeName: "boolean",
                },
                tileEast: {
                    typeName: "gameObject",
                    gameObjectClass: Tile,
                    nullable: true,
                },
                tileNorth: {
                    typeName: "gameObject",
                    gameObjectClass: Tile,
                    nullable: true,
                },
                tileSouth: {
                    typeName: "gameObject",
                    gameObjectClass: Tile,
                    nullable: true,
                },
                tileWest: {
                    typeName: "gameObject",
                    gameObjectClass: Tile,
                    nullable: true,
                },
                x: {
                    typeName: "int",
                },
                y: {
                    typeName: "int",
                },
                youngGun: {
                    typeName: "gameObject",
                    gameObjectClass: YoungGun,
                    nullable: true,
                },
            },
            functions: {
            },
        },
        YoungGun: {
            parentClassName: "GameObject",
            attributes: {
                callInTile: {
                    typeName: "gameObject",
                    gameObjectClass: Tile,
                    nullable: false,
                },
                canCallIn: {
                    typeName: "boolean",
                },
                owner: {
                    typeName: "gameObject",
                    gameObjectClass: Player,
                    nullable: false,
                },
                tile: {
                    typeName: "gameObject",
                    gameObjectClass: Tile,
                    nullable: false,
                },
            },
            functions: {
                callIn: {
                    args: [
                        {
                            argName: "job",
                            typeName: "string",
                            defaultValue: "Bartender",
                            literals: ["Bartender", "Brawler", "Sharpshooter"],
                        },
                    ],
                    invalidValue: undefined,
                    returns: {
                        typeName: "gameObject",
                        gameObjectClass: Cowboy,
                        nullable: true,
                    },
                },
            },
        },
    },
});
