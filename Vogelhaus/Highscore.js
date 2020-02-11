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
        let responseText = await response.text();
        let finalResponse = JSON.parse(responseText);
        console.log(finalResponse);
        let highscorelists = document.querySelector("div#report");
        highscorelists.innerText = finalResponse;
        console.log(finalResponse);
    }
})(Moorhuhn || (Moorhuhn = {}));
//# sourceMappingURL=Highscore.js.map