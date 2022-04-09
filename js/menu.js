window.onload = () => {

    // on button press go to game page
    document.getElementById("play").addEventListener("click", () => {
            window.location.href = "/html/game.html";
        }
    );

    // on button press go to map creation page
    document.getElementById("creator").addEventListener("click", () => {
            window.location.href = "/html/mapGen.html";
        }   
    );



}