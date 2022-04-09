import { Case } from "./Case.js";

// make a class player that extends class case, with a method to move the player and get the player position
export class Player extends Case {
    #movement;
    #life;
    constructor(x, y, type) {
        super(x, y, type);
    }






    // method to set player position
    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }


    // method to update the number of movement made by the player
    updateMovement() {
        this.movement++;
    }

    //method to handle player life
    updateLife() {
        this.life--;
    }


    getPosition() {
        return {
            x: this.x,
            y: this.y
        };
    }
}
