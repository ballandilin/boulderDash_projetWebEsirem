import {
    MapGenerator
} from "./mapGenerator.js";


window.onload = () => {

    let mGen = new MapGenerator();
    mGen.display()

    // on button press create a map
    document.getElementById("gen").addEventListener("click", () => {
        let mapName = document.querySelector("#mapName").value;
        mGen.displayCreatedMap();
        mGen.saveMap();
    });
}