"use strict";
var Moorhuhn;
(function (Moorhuhn) {
    window.addEventListener("load", handleLoad);
    let url = "https://elfried.herokuapp.com/";
    function handleLoad(_event) {
        document.getElementById("Highscoreliste").addEventListener("click", handleRetriveHS);
    }
    /*interface Highscore {
        spieler: string;
        score: string;
    }*/
    async function handleRetriveHS(_event) {
        let query = "command=retrieve";
        let response = await fetch(query);
        let responseText = await response.text(); // das im letzten
        //let finalResponse: any[] = JSON.parse(responseText); //
        let highscorelists = document.querySelector("div#report");
        highscorelists.innerText = responseText;
    }
})(Moorhuhn || (Moorhuhn = {}));
/*for (let i: number = 0; i < 10; i++) {
    console.log(finalResponse.length);
    finalResponse.sort();
    let place: number = 1 + i;
    let output: string = place + ". " + finalResponse[i].spieler + " | Score:" + finalResponse[i].score + "<br>";
    highscorelists.innerText = output;
}*/
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
/*function playerDataSort(_a: Highscore, _b: Highscore): number {
 let returnNumber: number;
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

}*/
//# sourceMappingURL=Highscore.js.map