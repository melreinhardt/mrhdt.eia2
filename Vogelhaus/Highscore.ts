namespace Moorhuhn {
    window.addEventListener("load", handleLoad);

    let url: string = "https://elfried.herokuapp.com/";

    function handleLoad(_event: Event): void {
        document.getElementById("Highscoreliste").addEventListener("click", handleRetriveHS);

    }

    async function handleRetriveHS(_event: Event): Promise<void> {
        let query: string = "command=retrieve";
        let response: Response = await fetch(url + "?" + query);
        let responseText: string = await response.text();   // das im letzten
        let finalResponse: any[] = JSON.parse(responseText); //

        let highscorelists: HTMLDivElement = <HTMLDivElement>document.querySelector("div#report");
       
        let nameArray: string[] = [];
        let scoreArray: string[] = [];

        for (let i: number = 0; i < finalResponse.length; i++) {
            let nme: string = finalResponse[i].name;
            let nbr: string = finalResponse[i].score;
            nameArray.push(nme);
            scoreArray.push(nbr);
        }
        console.log(nameArray);
        console.log(scoreArray);
        
        highscorelists.innerText = finalResponse; //
        console.log(finalResponse);

    }
}