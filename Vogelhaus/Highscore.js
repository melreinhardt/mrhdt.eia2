"use strict";
var Moorhuhn;
(function (Moorhuhn) {
    window.addEventListener("load", handleLoad);
    let url = "https://elfried.herokuapp.com/";
    function handleLoad(_event) {
        document.getElementById("Highscoreliste").addEventListener("click", handleRetriveHS);
    }
    async function handleRetriveHS(_event) {
        let query = "command=retrieve";
        let response = await fetch(url + "?" + query);
        let responseText = await response.text(); // das im letzten
        let finalResponse = JSON.parse(responseText); //
        let highscorelists = document.querySelector("div#report");
        let final = [];
        for (let i = 0; i < finalResponse.length; i++) {
            let entry = { spieler: finalResponse[i].name, score: finalResponse[i].score };
            final.push(entry);
            //let nme: string = finalResponse[i].name;
            //let nbr: string = finalResponse[i].score;
            //nameArray.push(nme);
            //scoreArray.push(nbr);
        }
        //console.log(nameArray);
        //console.log(scoreArray);
        //highscorelists.innerText = final; //
        console.log(final);
    }
})(Moorhuhn || (Moorhuhn = {}));
//# sourceMappingURL=Highscore.js.map