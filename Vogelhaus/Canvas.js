"use strict";
var Moorhuhn;
(function (Moorhuhn) {
    window.addEventListener("load", handleLoad); // funktion handleLoad wird aufgerufen wenn Seite mit laden fertig ist (notwendig weil: render - imediate Mode)
    Moorhuhn.golden = 0.8;
    let movable;
    let snowball;
    let moveablesArray = []; //Array für alle Bewegten Objekte für direkten Zugriff
    let foodsArray = [];
    let birdsArray = [];
    Moorhuhn.snowballsarray = [];
    let score = 0;
    Moorhuhn.url = "https://elfried.herokuapp.com/";
    function handleLoad(_event) {
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        Moorhuhn.crc2 = canvas.getContext("2d");
        let horizon = Moorhuhn.crc2.canvas.height / 2;
        //alert("Regeln: 20 sek zeit um so viele wie möglich abzuwerfen mit der space-Taste kann man futter streuen / linke maus taste - werfen");
        let posMountains = new Moorhuhn.Vector(0, horizon);
        drawBackground();
        drawSun(new Moorhuhn.Vector(100, 75));
        drawMountains(posMountains, 75, 200, "grey", "white");
        drawMountains(posMountains, 50, 150, "grey", "lightgrey");
        drawClouds(10, new Moorhuhn.Vector(0, 0), new Moorhuhn.Vector(Moorhuhn.crc2.canvas.width, Moorhuhn.crc2.canvas.height / 4));
        drawSnowman(new Moorhuhn.Vector(600, 600));
        drawBirdHouse(new Moorhuhn.Vector(300, 500));
        drawTree(new Moorhuhn.Vector(900, 400));
        let background = Moorhuhn.crc2.getImageData(0, 0, 1200, 550); //der ganze canvas
        window.setInterval(update, 20, background);
        drawSnowflakes(60); //alle Movable Sub objekte jetzt darunter!
        drawBirds(15);
        window.addEventListener("keydown", handleFood);
        canvas.addEventListener("click", handleSnowball);
        window.setTimeout(handleEnd, 20000);
    }
    function drawBackground() {
        //console.log("Background");
        let gradient = Moorhuhn.crc2.createLinearGradient(0, 0, 0, Moorhuhn.crc2.canvas.height);
        gradient.addColorStop(0, "lightblue");
        gradient.addColorStop(0.5, "white");
        Moorhuhn.crc2.fillStyle = gradient;
        Moorhuhn.crc2.fillRect(0, 0, Moorhuhn.crc2.canvas.width, Moorhuhn.crc2.canvas.height);
    }
    function drawSun(_position) {
        //console.log("Sun", _position);
        let r1 = 30;
        let r2 = 150;
        let gradient = Moorhuhn.crc2.createRadialGradient(0, 0, r1, 0, 0, r2);
        gradient.addColorStop(0, "HSLA(60, 100%, 90%, 1)");
        gradient.addColorStop(1, "HSLA(60, 100%, 50%, 0)");
        Moorhuhn.crc2.save();
        Moorhuhn.crc2.translate(_position.x, _position.y);
        Moorhuhn.crc2.fillStyle = gradient;
        Moorhuhn.crc2.arc(0, 0, r2, 0, 2 * Math.PI);
        Moorhuhn.crc2.fill();
        Moorhuhn.crc2.restore();
    }
    function drawMountains(_position, _min, _max, _colorLow, _colorHigh) {
        //console.log("Mountains", _position, _min, _max);
        let stepMin = 50;
        let stepMax = 150;
        let x = 0;
        Moorhuhn.crc2.save();
        Moorhuhn.crc2.translate(_position.x, _position.y);
        Moorhuhn.crc2.beginPath();
        Moorhuhn.crc2.moveTo(0, 0);
        Moorhuhn.crc2.lineTo(0, -_max);
        do {
            x += stepMin + Math.random() * (stepMax - stepMin);
            let y = -_min - mathRandomMinMax(_min, _max);
            Moorhuhn.crc2.lineTo(x, y);
        } while (x < Moorhuhn.crc2.canvas.width);
        Moorhuhn.crc2.lineTo(x, 0);
        Moorhuhn.crc2.closePath();
        let gradient = Moorhuhn.crc2.createLinearGradient(0, 0, 0, -_max);
        gradient.addColorStop(0, _colorLow);
        gradient.addColorStop(0.7, _colorHigh);
        Moorhuhn.crc2.fillStyle = gradient;
        Moorhuhn.crc2.fill();
        Moorhuhn.crc2.restore();
    }
    function drawCloud(_position, _size) {
        //console.log("Cloud", _position, _size);
        let nParticles = 20;
        let radiusParticle = 50;
        let particle = new Path2D();
        let gradient = Moorhuhn.crc2.createRadialGradient(0, 0, 0, 0, 0, radiusParticle);
        particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI);
        gradient.addColorStop(0, "HSLA(0, 100%, 100%, 0.5)");
        gradient.addColorStop(1, "HSLA(0, 100%, 100%, 0)");
        Moorhuhn.crc2.save();
        Moorhuhn.crc2.translate(_position.x, _position.y);
        Moorhuhn.crc2.fillStyle = gradient;
        Moorhuhn.crc2.fill(particle);
        for (let drawn = 0; drawn < nParticles; drawn++) {
            Moorhuhn.crc2.save();
            let x = (Math.random() - 0.5) * _size.x;
            let y = -(Math.random() * _size.y);
            Moorhuhn.crc2.translate(x, y);
            Moorhuhn.crc2.fill(particle);
            Moorhuhn.crc2.restore();
        }
        Moorhuhn.crc2.restore();
    }
    function drawClouds(_nClouds, _posStart, _posEnd) {
        //console.log("Clouds", _nClouds);
        let size = new Moorhuhn.Vector(150, 90);
        for (let drawn = 0; drawn < _nClouds; drawn++) {
            let position = new Moorhuhn.Vector(mathRandomMinMax(_posStart.x, _posEnd.x), mathRandomMinMax(_posStart.y, _posEnd.y));
            drawCloud(position, size);
        }
    }
    function mathRandomMinMax(_min, _max) {
        let result = _min + Math.random() * (_max - _min);
        return result;
    }
    function drawSnowman(_position) {
        Moorhuhn.crc2.save();
        Moorhuhn.crc2.translate(_position.x, _position.y);
        //Körper
        Moorhuhn.crc2.beginPath();
        Moorhuhn.crc2.arc(-80, -200, 30, Math.PI * -0.5, Math.PI * 2);
        Moorhuhn.crc2.arc(-80, -240, 20, Math.PI * -0.5, Math.PI * 2);
        Moorhuhn.crc2.arc(-80, -270, 15, Math.PI * -0.5, Math.PI * 2);
        Moorhuhn.crc2.strokeStyle = "black";
        Moorhuhn.crc2.stroke();
        Moorhuhn.crc2.fillStyle = "#f2f2f2";
        Moorhuhn.crc2.fill();
        Moorhuhn.crc2.closePath();
        Moorhuhn.crc2.restore();
    }
    function drawBirdHouse(_position) {
        Moorhuhn.crc2.save();
        Moorhuhn.crc2.translate(_position.x, _position.y);
        //Haus
        Moorhuhn.crc2.beginPath();
        Moorhuhn.crc2.stroke();
        Moorhuhn.crc2.fillStyle = "#8b4513";
        Moorhuhn.crc2.fillRect(-90, -160, 100, 70);
        Moorhuhn.crc2.closePath();
        //Loch
        Moorhuhn.crc2.beginPath();
        Moorhuhn.crc2.arc(-40, -125, 20, 0, 2 * Math.PI);
        Moorhuhn.crc2.fillStyle = "#000000";
        Moorhuhn.crc2.fill();
        Moorhuhn.crc2.closePath();
        //Stab
        Moorhuhn.crc2.beginPath();
        Moorhuhn.crc2.stroke();
        Moorhuhn.crc2.fillStyle = "#2c1410";
        Moorhuhn.crc2.fillRect(-45, -90, 10, 100);
        Moorhuhn.crc2.closePath();
        //Dach
        Moorhuhn.crc2.beginPath();
        Moorhuhn.crc2.moveTo(-100, -160);
        Moorhuhn.crc2.lineTo(20, -160);
        Moorhuhn.crc2.lineTo(-40, -200);
        Moorhuhn.crc2.stroke();
        Moorhuhn.crc2.fillStyle = "#800000";
        Moorhuhn.crc2.fill();
        Moorhuhn.crc2.closePath();
        Moorhuhn.crc2.restore();
    }
    function drawTree(_position) {
        Moorhuhn.crc2.save();
        Moorhuhn.crc2.translate(_position.y, _position.y);
        Moorhuhn.crc2.beginPath();
        Moorhuhn.crc2.fillStyle = " #b33c00";
        Moorhuhn.crc2.fillRect(600, 50, 30, 60);
        Moorhuhn.crc2.stroke();
        Moorhuhn.crc2.closePath();
        Moorhuhn.crc2.beginPath();
        Moorhuhn.crc2.moveTo(510, 50);
        Moorhuhn.crc2.lineTo(710, 50);
        Moorhuhn.crc2.lineTo(610, -10);
        Moorhuhn.crc2.fillStyle = "#00802b";
        Moorhuhn.crc2.fill();
        Moorhuhn.crc2.closePath();
        Moorhuhn.crc2.beginPath();
        Moorhuhn.crc2.moveTo(530, 0);
        Moorhuhn.crc2.lineTo(690, 0);
        Moorhuhn.crc2.lineTo(610, -60);
        Moorhuhn.crc2.fillStyle = "#00802b";
        Moorhuhn.crc2.fill();
        Moorhuhn.crc2.closePath();
        Moorhuhn.crc2.beginPath();
        Moorhuhn.crc2.moveTo(550, -50);
        Moorhuhn.crc2.lineTo(670, -50);
        Moorhuhn.crc2.lineTo(610, -110);
        Moorhuhn.crc2.fillStyle = "#00802b";
        Moorhuhn.crc2.fill();
        Moorhuhn.crc2.closePath();
        Moorhuhn.crc2.restore();
    }
    function update(_backgroundData) {
        Moorhuhn.crc2.putImageData(_backgroundData, 0, 0);
        for (let food of foodsArray) {
            food.update();
        }
        for (let movable of moveablesArray) { //wie birds wenn auch in dem Array gespeichert zugriff ohne die schneeflocken auch zu beachten?
            movable.update();
        }
        for (let bird of birdsArray) {
            bird.update();
        }
        for (let snowball of Moorhuhn.snowballsarray) {
            snowball.update();
        }
    }
    function drawSnowflakes(_amount) {
        for (let i = 0; i < _amount; i++) {
            let position = new Moorhuhn.Vector(0, 0);
            position.x = Math.random() * 1200;
            position.y = Math.random() * 550; // --> das sie zufällig irgendwo auf dem canvas erzeugt werden
            movable = new Moorhuhn.Snowflake(position); //--> neue Instanz wird erzeugt 
            moveablesArray.push(movable); // und ins array gepusht
        }
    }
    function drawBirds(_amount) {
        for (let i = 0; i < _amount; i++) {
            let position = new Moorhuhn.Vector(0, 0);
            position.x = Math.random() * 1200;
            position.y = Math.random() * 550;
            Moorhuhn.bird = new Moorhuhn.Bird(position);
            birdsArray.push(Moorhuhn.bird);
        }
    }
    function handleFood(_event) {
        let keyPressed = _event.code;
        console.log(keyPressed);
        if (keyPressed == "Space") {
            drawFood(10, new Moorhuhn.Vector(50, 60), new Moorhuhn.Vector(800, 350));
            Moorhuhn.foodThrown = true;
            setTimeout(foodGone, 5000); // damit die Vögel nicht immer stehen bleiben!
            for (let i = 0; i < 3; i++) {
                // birdsArray[i].velocity = birdsArray[i].position.substract(food.position);
                let zufall = Math.floor(mathRandomMinMax(0, birdsArray.length)); // damit eine gerade zahl rauskommt + es zufällige vögel sind und auch nicht mehr die die schon gelöscht/getroffen wurden
                //birdsArray[zufall].savedPosition = birdsArray[zufall].position;
                birdsArray[zufall].velocity.x = (Moorhuhn.food.position.x - birdsArray[zufall].position.x) / 20;
                birdsArray[zufall].velocity.y = (Moorhuhn.food.position.y - birdsArray[zufall].position.y) / 20; //warum ist der Vektor so groß??
                //console.log(birdsArray[zufall].position);
                //console.log(birdsArray[zufall].velocity);
            }
        }
    }
    function foodGone() {
        Moorhuhn.foodThrown = false;
    }
    function handleSnowball(_event) {
        let x = _event.clientX; // maus position wird übergeben
        let y = _event.clientY;
        drawSnowball(new Moorhuhn.Vector(x, y));
    }
    function collision() {
        for (let birdNumber = 0; birdNumber < birdsArray.length; birdNumber++) {
            let bird = birdsArray[birdNumber];
            if (snowball.checkIfHit(bird) == true) { // wie das erst wenn schneeball gewisse Größe??
                birdsArray.splice(birdNumber, 1);
                Moorhuhn.snowballsarray.splice(0, Moorhuhn.snowballsarray.length); //wusste nicht wie anders 
                score += 10;
                console.log(score);
            }
        }
    }
    Moorhuhn.collision = collision;
    function drawSnowball(_position) {
        snowball = new Moorhuhn.Snowball(_position);
        Moorhuhn.snowballsarray.push(snowball);
    }
    function drawFood(_amount, _size, _position) {
        //let posStart: Vector = new Vector(40, canvas.height /2);
        //let posEnd: Vector = new Vector(1190, 540);
        for (let i = 0; i < _amount; i++) {
            let position = new Moorhuhn.Vector(0, 0);
            position.x = Math.random() * _size.x + _position.x; //(Math.floor(mathRandomMinMax(posStart.x, posEnd.x));
            position.y = Math.random() * _size.y + _position.y; //Math.floor(mathRandomMinMax(posStart.y, posEnd.y));
            Moorhuhn.food = new Moorhuhn.Food(position);
            foodsArray.push(Moorhuhn.food);
        }
    }
    function deleteFood() {
        foodsArray.splice(0, 1); //an nullter stelle wird 1 element gelöscht
    }
    Moorhuhn.deleteFood = deleteFood;
    async function handleSendHS(_name, _score) {
        let query = "_score & _name";
        let response = await fetch(Moorhuhn.url + "?" + query.toString());
        let responseText = await response.text();
        alert(response);
    }
    function handleEnd() {
        let name = prompt("Your Score " + score, "Please enter your name"); //dann beides in Datenbank! und wenn es ausgefüllt wurde zurück zur startseite!!
        if (name != null) {
            handleSendHS(name, score);
        }
    }
})(Moorhuhn || (Moorhuhn = {}));
//# sourceMappingURL=Canvas.js.map