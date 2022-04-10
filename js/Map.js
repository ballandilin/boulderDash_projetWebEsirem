// make a class map that contain all the cases of the map with a method to get the case at a specific position
// the class display the map from a json file, with a method to display the map in an element named grid
// the cases of the map use the class case
import { Case } from "./modeles/Case.js";
import { Player } from"./modeles/player.js";
import { Diamond } from"./modeles/Diamond.js";
import { Rock } from"./modeles/rock.js";
import { Dirt } from"./modeles/Dirt.js";
import { Wall } from"./modeles/wall.js";
import { utils } from"./utils.js";


export class Map {
    #jsonMap;
    #cases;
    #player;
    #width = 16;
    #height = 32;
    #deathSound = new Audio('../sound/sounds/dspldeth.wav');
    #itemPickUpSound = new Audio("../sound/sounds/dsitemup.wav");
    #currentMap = "";

    constructor() {
        this.cases = [];

        this.getMapFromFetch();
        let pop = document.querySelector(".close");
        pop.addEventListener("click", () => {
            this.reset();
            this.display();
        });

        window.addEventListener("keydown", (e) => {
            this.movePlayer(e.key);
        });
    }



    getCase(x, y) {
        return this.cases[y][x];
    }



    getMap() {
        return this.cases;
    }



    // method to set the map
    setMap(map) {
        this.cases = this.jsonToCase(JSON.parse(window.localStorage.getItem(map)));
    }


    // method to get current map
    getCurrentMap() {
        return this.currentMap;
    }



    getMapFromFetch() {
        fetch("../map/map.json")
            .then(response => response.json())
            .then(json => {
                this.jsonMap = json;
                console.log(new utils().getKeyList());
                this.jsonMap["niveau"].forEach(mapp => {
                    for (const lvl in mapp) {
                        window.localStorage.setItem(lvl, JSON.stringify(this.jsonToCase(mapp[lvl])));
                    }
                });
                if (window.localStorage.getItem("save") != null) {
                    this.setMap("save");
                    this.#currentMap = "save";
                } else {
                    this.cases = this.jsonToCase(json["niveau"][0]["level1"]);
                    this.#currentMap = "level1";
                }
                this.display();
            });
        }

    
    /**
     * 
     * @param {*} jsonMap 
     */
    jsonToCase(jsonMap) {
        let casees = [];
        casees = jsonMap.map((line, y) => {
            return Object.values(line).map((type, x) => {
                if (typeof type === "object") {
                    type = type.type;
                }
                switch (type) {
                    case "D":
                        return new Diamond(x, y, "D");
                        break;
                    case "R":
                        return new Rock(x, y, "R");
                        break;
                    case "P":
                        this.player = new Player(x, y, "P");
                        return this.player;
                        break;
                    case "W":
                        return new Wall(x, y, "W");
                        break;
                    case "T":
                        return new Dirt(x, y, "T");
                        break;
                    case "V":
                        return new Case(x, y, "V");
                        break;
                    case undefined:
                        return new Case(x, y, "V");
                }
            });
        });
        return casees;
    }




    applyGravity() {
        for (let y = 0; y < this.cases.length; y++) {
            for (let x = 0; x < this.cases[y].length; x++) {
                if (this.cases[y][x].type == "R") {
                    let caseBelow = this.getCase(x+1, y);
                    if (caseBelow != undefined && caseBelow.type == "V") {
                        console.log("rock fall");
                        this.cases[y][x].y++;
                        this.cases[y][x].type = "V";
                        this.cases[y][x + 1].type = "R";
                        this.cases[y][x + 1].falling = true;
                    } else if (caseBelow != undefined && caseBelow.type == "T") {
                        this.cases[y][x].falling = false;
                    }
                }
            }
        }
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


    /**
     *  method to display the map in the grid element
     */
    display() {
        let grid = document.querySelector("grid");
        grid.innerHTML = "";
        this.cases.forEach((line, y) => {
            var div = document.createElement("div");
            line.forEach((casee) => {
                let c = document.createElement("div");
                c.className = casee.type;
                c.classList.add("case");
                div.appendChild(c);
            });
            grid.appendChild(div);
        });
    }

    


    // method to check the collision between player and diamond
    checkCollision(x, y) {
        let casee = this.getCase(x, y);
        if (casee.type === "D") {
            this.#itemPickUpSound.play();
            return true;
        }
    }




    // method to move the player
    movePlayer(direction) {
        let x = this.player.getPosition().x;
        let y = this.player.getPosition().y;
        switch (direction) {
            case "q":
                if (this.cases[y - 1][x] !== undefined && (this.cases[y - 1][x].type === "V" || this.cases[y - 1][x].type === "D" || this.cases[y - 1][x].type === "T")) {
                    this.checkCollision(x, y - 1);
                    this.cases[y - 1][x].type = "P";
                    this.cases[y][x].type = "V";
                    this.player.setPosition(x, y - 1);
                    this.countMovement();
                }
                break;
            case "d":
                if (this.cases[y + 1][x] !== undefined && this.cases[y + 1][x].type === "V" || this.cases[y + 1][x].type === "D" || this.cases[y + 1][x].type === "T") {
                    this.checkCollision(x, y + 1);
                    this.cases[y + 1][x].type = "P";
                    this.cases[y][x].type = "V";
                    this.player.setPosition(x, y + 1);
                    this.countMovement();
                }
                break;
            case "z":
                if (this.cases[y][x - 1] !== undefined && this.cases[y][x - 1].type === "V" || this.cases[y][x - 1].type === "D" || this.cases[y][x - 1].type === "T") {
                    this.checkCollision(x - 1, y);
                    this.cases[y][x - 1].type = "P";
                    this.cases[y][x].type = "V";
                    this.player.setPosition(x - 1, y);
                    this.countMovement();
                }
                break;
            case "s":
                if (this.cases[y][x + 1] !== undefined && this.cases[y][x + 1].type === "V" || this.cases[y][x + 1].type === "D" || this.cases[y][x + 1].type === "T") {
                    this.checkCollision(x + 1, y);
                    this.cases[y][x + 1].type = "P";
                    this.cases[y][x].type = "V";
                    this.player.setPosition(x + 1, y);
                    this.countMovement();
                }
                break;
        }
    }




    // method to handle player death, if the player is on a rock, the player dies and the game ends
    death() {
        let x = this.player.getPosition().x;
        let y = this.player.getPosition().y;
        if (!(this.cases[y][x-1] == undefined) &&  (this.cases[y][x-1].type === "R" && this.cases[y][x-1].falling === true)) {
            this.cases[y][x].type = "V";
            this.cases[y][x].falling = false;
            this.player.setPosition(x, y);
            this.player.updateLife();
            this.#deathSound.play();
            window.location = "#popupDeath";
            this.reset()
        }
    }


    // method : the player win if he has collected all the diamonds
    win() {
        let diamonds = this.getDiamonds();
        if (diamonds === 0) {
            // window.location = "#popupWin";
            this.nextLevel();
            this.display();
        }
    }





    // methof to reset the map at the death of the player
    reset() {
        this.cases = this.jsonToCase(JSON.parse(window.localStorage.getItem(this.#currentMap)));
    }


    // methode update
    update() {
        if (!(this.cases.length == 0)) {
            this.death();
            this.applyGravity();
            this.win();
            this.saveProgress();
        }
        this.display();
    }


   countMovement() {
        this.player.movement++;
    }


    // method to pass to the next level in the local storage
    nextLevel() {
        let mapNames = new utils().getKeyList();
        let index = mapNames.indexOf(this.#currentMap);
        this.#currentMap = mapNames[index + 1];
        this.cases = this.jsonToCase(JSON.parse(window.localStorage.getItem(this.#currentMap)));
    }

    // methode so save the current progress of the player
    saveProgress() {
        window.localStorage.setItem("save", JSON.stringify(this.cases));
    }


    // method to let the player push the rock horizontally if there is nothing in the way
    pushRock(x, y) {
        if (this.cases[y][x - 1] !== undefined && this.cases[y][x - 1].type === "V") {
            this.cases[y][x - 1].type = "R";
            this.cases[y][x - 1].falling = true;
            this.cases[y][x].type = "V";
            this.player.setPosition(x - 1, y);
        }
    }

    //method to get saved map
    getSavedMap() {
        return JSON.parse(window.localStorage.getItem("save"));
    }

}
