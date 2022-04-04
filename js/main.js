import { Map } from "/js/Map.js";



window.onload = () => {


    let map = new Map();
    map.getMapFromFetch();
    console.log(map.getDiamonds());

    // window.addEventListener("keydown", () => {map.display()});


}
