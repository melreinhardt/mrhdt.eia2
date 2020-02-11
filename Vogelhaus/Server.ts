import * as Http from "http";
import * as Url from "url";
import * as Mongo from "mongodb";

export namespace Moorhuhn {
    interface HighSLists {
        [type: string]: string | string[];
    }

    let highscores: Mongo.Collection;

    let port: number | string | undefined = process.env.PORT;
    if (port == undefined)
        port = 5001;

    let databaseUrl: string = "mongodb+srv://Felix:30061999@moorhuhn-bszfl.mongodb.net/test?retryWrites=true&w=majority";

    startServer(port);
    connectToDatabase(databaseUrl);

    function startServer(_port: number | string): void {
        let server: Http.Server = Http.createServer();
        console.log("Server starting on port:" + _port);
        server.listen(_port);
        server.addListener("request", handleRequest);
    }

    async function connectToDatabase(_url: string): Promise<void> {
        let options: Mongo.MongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        highscores = mongoClient.db("Moorhuhn").collection("Highscores");
        console.log("Database connection ", highscores != undefined);
    }

    async function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): Promise<void> {
        console.log("What's up?");

        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");

        if (_request.url) {
            let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);
            // for (let key in url.query) {
            //    _response.write(key + ":" + url.query[key] + "<br/>");
            //}

            if (url.query["command"] == "retrieve") { 
                let report: string[] | string = await retrieveHighscore();
                if (report == "We encountered tecnical problems. Please try again later")
                    _response.write(report);

                else
                    _response.write(JSON.stringify(report));
            } 
            else {
                console.log("urlQuery: ", url.query);
                let jsonString: string = JSON.stringify(url.query);
                _response.write(jsonString);
                storeScore(url.query);
                console.log(jsonString);
            }
        }
        _response.end(); 
    }

    async function retrieveHighscore(): Promise<string[] | string> {
        // console.log("Asking DB about Orders ", orders.find());
        let cursor: Mongo.Cursor = await highscores.find().sort({score: -1});
        let answer: Promise<string[]> = await cursor.toArray();
        console.log("DB CursorToArray", answer);
        if (answer != null) {
            return answer;
        }
        else
            return "We encountered tecnical problems. Please try again later";
    }

    function storeScore(_score: HighSLists): void { //muss hier nicht noch name rein?
        highscores.insert(_score);
    }
}