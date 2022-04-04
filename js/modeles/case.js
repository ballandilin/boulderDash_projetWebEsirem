// make a class Case, with a method to get the position


export class Case {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type;
    }

    getPosition() {
        return {
            x: this.x,
            y: this.y
        };
    }
}
