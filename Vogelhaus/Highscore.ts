namespace Moorhuhn {
    window.addEventListener("load", handleLoad);

    let url: string = "https://elfried.herokuapp.com/";

    function handleLoad(_event: Event): void {
        document.getElementById("Highscoreliste").addEventListener("click", handleRetriveHS);

    }

    //interface Highscore {
        //spieler: string;
        //score: string;
    //}



    async function handleRetriveHS(_event: Event): Promise<void> {
        let query: string = "command=retrieve";
        let response: Response = await fetch(url + "?" + query);
        let responseText: string = await response.text();   // das im letzten
        //let finalResponse: any[] = JSON.parse(responseText); //any?

        let highscorelists: HTMLDivElement = <HTMLDivElement>document.querySelector("div#report");
        highscorelists.innerText = responseText;

        //let nameArray: string[] = [];
        //let scoreArray: string[] = [];

        //let final: Highscore[] | null = [];

        //for (let i: number = 0; i < finalResponse.length; i++) {
        //  let entry: Highscore = { spieler: finalResponse[i].name, score: finalResponse[i].score };
        //final.push(entry);
        //let nme: string = finalResponse[i].name;
        //let nbr: string = finalResponse[i].score;
        //nameArray.push(nme);
        //scoreArray.push(nbr);

        //nameArray.push(nme);
        //scoreArray.push(nbr);


    }
}



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
*/
