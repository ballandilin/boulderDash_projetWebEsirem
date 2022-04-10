// make a class rock that extends class case, with a method to get the rock position and a method to apply gravity to the rock

import { Case } from "./Case.js";

export class Rock extends Case {
    #falling = false;
    constructor(x, y, type) {
        super(x, y, type);
    }

    getPosition() {
        return {
            x: this.x,
            y: this.y
        };
    }

    // set position method
    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }


}

