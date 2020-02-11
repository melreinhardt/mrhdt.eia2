"use strict";
var Moorhuhn;
(function (Moorhuhn) {
    window.addEventListener("load", handleLoad);
    let url = "https://elfried.herokuapp.com/";
    function handleLoad(_event) {
        document.getElementById("Highscoreliste").addEventListener("click", handleRetriveHS);
    }
    function playerDataSort(_a, _b) {
        let returnNumber;
        if (_b.score > _a.score) {
            returnNumber = -1;
        }
        else if (_b.score < _a.score) {
            returnNumber = 1;
        }
        else {
            returnNumber = 0;
        }
        return returnNumber;
    }
    async function handleRetriveHS(_event) {
        let query = "command=retrieve";
        let response = await fetch(url + "?" + query);
        let responseText = await response.text(); // das im letzten
        let finalResponse = JSON.parse(responseText); //
        let highscorelists = document.querySelector("div#report");
        finalResponse.sort(playerDataSort);
        for (let i = 0; i < 10; i++) {
            console.log(finalResponse.length);
            let place = 1 + i;
            let output = place + ". " + finalResponse[i].spieler + " | Score:" + finalResponse[i].score + "<br>";
            highscorelists.innerText = output;
        }
        //let nameArray: string[] = [];
        //let scoreArray: string[] = [];
        //let final: Highscore[] = [];
        /*for (let i: number = 0; i < finalResponse.length; i++) {
            let entry: Highscore = { spieler: finalResponse[i].name, score: finalResponse[i].score };
            for (let j: number = 0; 0 < final.length; j++) {
                if (finalResponse[i].score > final[j].score) {
                    final.splice(j, 0, entry);
                    break;
                }
                else
                    final.push(entry);

                //let nme: string = finalResponse[i].name;
                //let nbr: string = finalResponse[i].score;
                //nameArray.push(nme);
                //scoreArray.push(nbr);
            }
            //console.log(nameArray);
            //console.log(scoreArray);

        }

        for (let m: number = 0; m < final.length; m++) {
            let elem: HTMLParagraphElement = document.createElement("p");
            highscorelists.appendChild(elem);
            elem.innerText = final[m].score + "  " + final[m].spieler;
        }

        //highscorelists.innerText = final; //
        //console.log(final);

        */
    }
})(Moorhuhn || (Moorhuhn = {}));
//# sourceMappingURL=Highscore.js.map