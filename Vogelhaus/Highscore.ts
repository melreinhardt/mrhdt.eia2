namespace Moorhuhn {
    window.addEventListener("load", handleLoad);

    let url: string = "https://elfried.herokuapp.com/";

    function handleLoad(_event: Event): void {
        document.getElementById("Highscoreliste").addEventListener("click", handleRetriveHS);

    }

    async function handleRetriveHS(_event: Event): Promise<void> {
        let query: string = "command=retrieve";
        let response: Response = await fetch(url + "?" + query);
        let responseText: string = await response.text();
        let finalResponse: any = JSON.parse(responseText);
        console.log(finalResponse);

        let highscorelists: HTMLDivElement = <HTMLDivElement>document.querySelector("div#report");
        highscorelists.innerText = finalResponse;
    }
}