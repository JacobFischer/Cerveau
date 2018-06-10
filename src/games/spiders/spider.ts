import { IBaseGameObjectRequiredData } from "~/core/game";
import { ISpiderProperties } from "./";
import { GameObject, IGameObjectConstructorArgs } from "./game-object";
import { Nest } from "./nest";
import { Player } from "./player";

// <<-- Creer-Merge: imports -->>
import { removeElements } from "~/utils";
// <<-- /Creer-Merge: imports -->>

/**
 * Add properties here to make the create.Spider have different args.
 */
export interface ISpiderConstructorArgs
extends IGameObjectConstructorArgs, ISpiderProperties {
    // <<-- Creer-Merge: constructor-args -->>
    owner: Player;
    // <<-- /Creer-Merge: constructor-args -->>
}

/**
 * A Spider in the game. The most basic unit.
 */
export class Spider extends GameObject {
    /**
     * If this Spider is dead and has been removed from the game.
     */
    public isDead!: boolean;

    /**
     * The Nest that this Spider is currently on. Null when moving on a Web.
     */
    public nest?: Nest;

    /**
     * The Player that owns this Spider, and can command it.
     */
    public readonly owner: Player;

    // <<-- Creer-Merge: attributes -->>

    // Any additional member attributes can go here
    // NOTE: They will not be sent to the AIs, those must be defined
    // in the creer file.

    // <<-- /Creer-Merge: attributes -->>

    /**
     * Called when a Spider is created.
     *
     * @param data - Initial value(s) to set member variables to.
     * @param required - Data required to initialize this (ignore it).
     */
    constructor(
        data: ISpiderConstructorArgs,
        required: IBaseGameObjectRequiredData,
    ) {
        super(data, required);

        // <<-- Creer-Merge: constructor -->>
        this.owner = data.owner;
        this.nest = this.owner.broodMother.nest!;

        this.isDead = false;
        this.nest.spiders.push(this);
        this.owner.spiders.push(this);
        // <<-- /Creer-Merge: constructor -->>
    }

    // <<-- Creer-Merge: public-functions -->>

    // Any public functions can go here for other things in the game to use.
    // NOTE: Client AIs cannot call these functions, those must be defined
    // in the creer file.

    // <<-- /Creer-Merge: public-functions -->>

    // <<-- Creer-Merge: protected-private-functions -->>

    /** Kill the spider and remove it from arrays */
    public kill(): void {
        this.isDead = true;

        if (this.nest) {
            removeElements(this.nest.spiders, this);
            this.nest = undefined;
        }

        removeElements(this.owner.spiders, this);
    }

    /**
     * Invalidates base logic for any spider to do anything.
     *
     * @param player - The player trying to command this Spider.
     * @returns A string if some validation error was found, undefined otherwise.
     */
    protected invalidate(player: Player): string | undefined {
        if (this.owner !== player) {
            return `${player} does not own ${this}.`;
        }

        if (this.isDead) {
            return `${this} is dead and cannot do anything.`;
        }
    }

    // <<-- /Creer-Merge: protected-private-functions -->>
}