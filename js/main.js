import {
    Map
} from "./Map.js";
import {
    MapGenerator
} from "./mapGenerator.js";


window.onload = () => {

    // window.localStorage.clear();
    let map = new Map();
    var audio = new Audio('../sound/e1m1.mp3');
    audio.play();

    // loop to run the game
    let loop = setInterval(() => {
        map.update();
    }, 1000 / 10); // 10 fps


    // on button press go back to menu  
    document.getElementById("menu").addEventListener("click", () => {
        window.location.href = "./index.html";
    });

    document.getElementById("reset").addEventListener("click", () => {
        map.reset();
    });
}