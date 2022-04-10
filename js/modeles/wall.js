// make a class rock that extends class case, with a method to get the rock position and a method to apply gravity to the rock

import { Case } from "./modeles/Case.js";

export class Wall extends Case {
    constructor(x, y, type) {
        super(x, y, type);
    }

    getPosition() {
        return {
            x: this.x,
            y: this.y
        };
    }
}

