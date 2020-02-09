"use strict";
var Moorhuhn;
(function (Moorhuhn) {
    window.addEventListener("load", handleLoad);
    function handleLoad(_event) {
        document.getElementById("Highscoreliste").addEventListener("click", handleRetriveHS);
    }
    async function handleRetriveHS(_event) {
        let query = "command=retrieve";
        let response = await fetch(Moorhuhn.url + "?" + query);
        let responseText = await response.text();
        alert(responseText);
        let highscorelists = document.querySelector("div#report");
        highscorelists.innerText = responseText;
    }
})(Moorhuhn || (Moorhuhn = {}));
//# sourceMappingURL=Highscore.js.map