// make a class for the map generator that inerits from the map class and use the class cases to create the map
import {
    Case
} from "./modeles/Case.js";
import {
    Player
} from "./modeles/player.js";
import {
    Diamond
} from "./modeles/Diamond.js";
import {
    Rock
} from "./modeles/rock.js";
import {
    Dirt
} from "./modeles/Dirt.js";
import {
    Wall
} from "./modeles/wall.js";
import {
    utils
} from "./utils.js";


export class MapGenerator {
    constructor(width, height, tileSize) {
        this.tileSize = tileSize;
        this.width = 16;
        this.height = 35;
        this.map = [];
        this.display();
    }

    /**
     *  method to display the map in the grid element
     */
    display() {
        let grid = document.querySelector("grid");
        grid.innerHTML = "";
        for (let y = 0; y < this.height; y++) {
            let line = document.createElement("div");
            for (let x = 0; x < this.width; x++) {
                let tile = document.createElement("div");
                tile.className = "T";
                tile.classList.add("case");
                tile.addEventListener("click", (e) => {
                    this.changeType(e.target);
                });
                line.appendChild(tile);
            }
            grid.appendChild(line);
        }
    }


    // method to change the type of the case when the user click on it
    changeType(e) {
        let casee = e;
        let type = casee.classList;
        if (type.contains("T")) {
            casee.classList.add("W");
            casee.classList.remove("T");
        } else if (type.contains("W")) {
            casee.classList.add("D");
            casee.classList.remove("W");
        } else if (type.contains("D")) {
            casee.classList.add("R");
            casee.classList.remove("D");
        } else if (type.contains("R")) {
            casee.classList.add("V");
            casee.classList.remove("R");
        } else if (type.contains("V")) {
            casee.classList.add("T");
            casee.classList.remove("V");
        }
    }


    // method to convert the map from html to a map object
    getMap() {
        let map = document.querySelector("grid");
        let mapArray = [];
        for (let y = 0; y < this.height; y++) {
            let line = [];
            for (let x = 0; x < this.width; x++) {
                let tile = map.children[y].children[x];
                let type = tile.classList;
                if (type.contains("W")) {
                    line.push(new Wall(x, y, "W"));
                } else if (type.contains("D")) {
                    line.push(new Dirt(x, y, "D"));
                } else if (type.contains("R")) {
                    line.push(new Rock(x, y, "R"));
                } else if (type.contains("V")) {
                    line.push(new Diamond(x, y, "V"));
                } else if (type.contains("T")) {
                    line.push(new Case(x, y, "T"));
                }
            }
            mapArray.push(line);
        }
        return mapArray;
    }



    // method to get the map from the local storage
    getMapFromLocalStorage() {
        let mapName = document.querySelector("#mapName").value;
        let map = JSON.parse(window.localStorage.getItem(mapName));
        return map;
    }

    // method to save the map in the local storage
    saveMap() {
        let mapName = document.querySelector("#mapName").value;
        let map = this.getMap();
        window.localStorage.setItem(mapName, JSON.stringify(map));
    }



    // method to create a random map, place a player at coord 0,0
    randomMap() {
        let map = [];
        for (let y = 0; y < this.height; y++) {
            let line = [];
            for (let x = 0; x < this.width; x++) {
                let type = Math.floor(Math.random() * 4);
                if (type == 0) {
                    line.push(new Wall(x, y));
                } else if (type == 1) {
                    line.push(new Dirt(x, y));
                } else if (type == 2) {
                    line.push(new Rock(x, y));
                } else if (type == 3) {
                    line.push(new Diamond(x, y));
                }
            }
            map.push(line);
        }
        let player = new Player(0, 0);
        map[0][0] = player;
        return map;
    }



    // method to display the created map in a list from the key in the local storage
    displayCreatedMap() {
        let mapNames = new utils().getKeyList();
        let list = document.querySelector("#mapCreated");
        list.innerHTML = "";
        mapNames.forEach(name => {
            let li = document.createElement("li");
            li.innerHTML = name;
            li.addEventListener("click", () => {
                this.displayMap(name);
            });
            list.appendChild(li);
        });
    }


    // method to display a map from the local storage depending on the name, and display it in the grid
    displayMap(name) {
        let map = JSON.parse(window.localStorage.getItem(name));
        let grid = document.querySelector("grid");
        grid.innerHTML = "";
        map.forEach(line => {
            let lineDiv = document.createElement("div");
            line.forEach(casee => {
                let tile = document.createElement("div");
                tile.className = casee.type;
                tile.classList.add("case");
                tile.addEventListener("click", (e) => {
                    this.changeType(e.target);
                });
                lineDiv.appendChild(tile);
            });
            grid.appendChild(lineDiv);
        });
    }



    //     for (let y = 0; y < this.height - 1; y++) {
    //         let line = document.createElement("div");
    //         for (let x = 0; x < this.width - 1; x++) {
    //             let tile = document.createElement("div");
    //             tile.className = map[x][y].type;
    //             tile.classList.add("case");
    //             tile.addEventListener("click", (e) => {
    //                 this.changeType(e.target);
    //             });
    //             line.appendChild(tile);
    //         }
    //         grid.appendChild(line);
    //     }
    // }

}