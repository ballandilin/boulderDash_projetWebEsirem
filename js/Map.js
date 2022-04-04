// make a class map that contain all the cases of the map with a method to get the case at a specific position
// the class display the map from a json file, with a method to display the map in an element named grid
// the cases of the map use the class case
import { Case } from "/js/modeles/Case.js";


export class Map {
    #jsonMap;
    #cases;

    constructor() {
        this.cases = [];
        window.addEventListener("keydown", () => {this.display()});
    }



    getCase(x, y) {
        return this.cases[y][x];
    }



    getMap() {
        return this.cases;
    }




    // method to get map from fetched json, if D create a new Diamond object, if R create a new Rock object, if P create a new Player object, if W create a new Wall object, if E create a new Empty object, if T create a new Dirt object
    getMapFromFetch2() {
        let map = this.jsonMap;
        let cases = [];
        for (let i = 0; i < map.length; i++) {
            cases[i] = [];
            for (let j = 0; j < map[i].length; j++) {
                switch (map[i][j]) {
                    case "D":
                        cases[i][j] = new Diamond(j, i, "D");
                        break;
                    case "R":
                        cases[i][j] = new Rock(j, i, "R");
                        break;
                    case "P":
                        cases[i][j] = new Player(j, i, "P");
                        break;
                    case "W":
                        cases[i][j] = new Wall(j, i, "W");
                        break;
                    case "T":
                        cases[i][j] = new Dirt(j, i, "T");
                        break;
                }
            }
        }
        this.cases = cases;
    }






    getMapFromFetch() {
        fetch("../map/map.json")
            .then(response => response.json())
            .then(json => {
                this.jsonMap = json;
                this.cases = this.jsonMap["niveau"][0].map((line, y) => {
                    return line.map((type, x) => {
                        return new Case(x, y, type);
                    });
                });
                setTimeout(() => {
                    this.display();
                    this.getMapFromFetch2();
                }, 1000);
            });
    }



    // method to get number of diamonds
    getDiamonds() {
        let diamonds = 0;
        for (let i = 0; i < this.cases.length; i++) {
            for (let j = 0; j < this.cases[i].length; j++) {
                if (this.cases[i][j].type === "D") {
                    diamonds++;
                }
            }
        }
        return diamonds;
    }




    display() {
        let grid = document.querySelector("grid");
        grid.innerHTML = "";
        this.cases.forEach((line, y) => {
            var div = document.createElement("div");
            line.forEach((casee, x) => {
                let c = document.createElement("div");
                c.className = casee.type;
                c.classList.add("case");
                div.appendChild(c);
            });
            grid.appendChild(div);
        });
    }

}
