import {
    Map
} from "./Map.js";
import {
    MapGenerator
} from "./mapGenerator.js";


window.onload = () => {

    window.localStorage.clear();
    let map = new Map();
    console.log(map.getDiamonds());
    var audio = new Audio('../sound/d_e1m1.mp3');
    audio.play();

    // loop to run the game
    let loop = setInterval(() => {
        map.update();
    }, 1000 / 10); // 10 fps


    // on button press go back to menu  
    document.getElementById("menu").addEventListener("click", () => {
        window.location.href = "./index.html";
    });
}