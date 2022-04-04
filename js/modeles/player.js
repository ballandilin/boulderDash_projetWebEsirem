import { Case } from "./Case.js";

// make a class player that extends class case, with a method to move the player and get the player position
export class Player extends Case {
    constructor(x, y, type) {
        super(x, y, type);
        window.addEventListener("keydown", (e) => {move(e)})
    }


    move(direction) {
        switch (direction) {
            case 90:
                this.y--;
                break;
            case 83:
                this.y++;
                break;
            case 81:
                this.x--;
                break;
            case 68:
                this.x++;
                break;
        }
    }

    getPosition() {
        return {
            x: this.x,
            y: this.y
        };
    }
}
