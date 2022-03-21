window.onload = () => {



    let getMap = () => {
        fetch("../map/map.json")
        .then(response => {
           return response.json();
        })
        .then(jsondata => {
            // console.log(jsondata);
            // console.log(jsondata["niveau"][0]);
            afficherMap(jsondata);
            // return jsondata;
        }); 
    }
    getMap();
    
    let afficherMap = (maps) => {
    
        let grid = document.querySelector("grid");
    
    
        maps["niveau"][0].forEach(element => {
            var div = document.createElement("div");
            element.forEach(_case => {
                if (_case != null) {
    
                    var c = document.createElement("div");
                    c.classList.add("case");
                    c.innerHTML = _case;
                    div.appendChild(c);
    
                } else {
                    div.appendChild(document.createElement("div"));
                }
            })
            grid.appendChild(div);
            // console.table(element);
        });
    }
}
