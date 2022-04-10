// make a class Diamond that extends class Case, with a method to get the diamond position
import { Case } from "./Case.js";



export class Diamond extends Case {
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