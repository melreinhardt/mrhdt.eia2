"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Http = require("http");
const Url = require("url");
const Mongo = require("mongodb");
var Moorhuhn;
(function (Moorhuhn) {
    let highscores;
    let port = process.env.PORT;
    if (port == undefined)
        port = 5001;
    let databaseUrl = "mongodb+srv://Felix:30061999@moorhuhn-bszfl.mongodb.net/test?retryWrites=true&w=majority";
    startServer(port);
    connectToDatabase(databaseUrl);
    function startServer(_port) {
        let server = Http.createServer();
        console.log("Server starting on port:" + _port);
        server.listen(_port);
        server.addListener("request", handleRequest);
    }
    async function connectToDatabase(_url) {
        let options = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        highscores = mongoClient.db("Moorhuhn").collection("Highscores");
        console.log("Database connection ", highscores != undefined);
    }
    async function handleRequest(_request, _response) {
        console.log("What's up?");
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        if (_request.url) {
            let url = Url.parse(_request.url, true);
            // for (let key in url.query) {
            //    _response.write(key + ":" + url.query[key] + "<br/>");
            //}
            if (url.query["command"] == "retrieve") {
                let report = await retrieveHighscore();
                if (report == "We encountered tecnical problems. Please try again later")
                    _response.write(report);
                else
                    _response.write(JSON.stringify(report));
            }
            else {
                console.log("urlQuery: ", url.query);
                let jsonString = JSON.stringify(url.query);
                _response.write(jsonString);
                storeScore(url.query);
                console.log(jsonString);
            }
        }
        _response.end();
    }
    async function retrieveHighscore() {
        // console.log("Asking DB about Orders ", orders.find());
        let cursor = await highscores.find().sort({ "highscores.score": 1, "highscores.name": 1 });
        let answer = await cursor.toArray();
        console.log("DB CursorToArray", answer);
        if (answer != null) {
            return answer;
        }
        else
            return "We encountered tecnical problems. Please try again later";
    }
    function storeScore(_score) {
        highscores.insert(_score);
    }
})(Moorhuhn = exports.Moorhuhn || (exports.Moorhuhn = {}));
//# sourceMappingURL=Server.js.map