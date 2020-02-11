namespace Moorhuhn {


    window.addEventListener("load", handleLoad); // funktion handleLoad wird aufgerufen wenn Seite mit laden fertig ist (notwendig weil: render - imediate Mode)
    export let crc2: CanvasRenderingContext2D; //--> gemerkt als crc2
    export let canvas: HTMLCanvasElement;
    export let golden: number = 0.8;
    let movable: Movables;
    export let food: Food;
    export let foodThrown: boolean;
    let snowball: Snowball;
    export let bird: Bird;
    let moveablesArray: Movables[] = []; //Array für alle Bewegten Objekte für direkten Zugriff
    let foodsArray: Food[] = [];
    let birdsArray: Bird[] = [];
    export let snowballsarray: Snowball[] = [];
    let score: number = 0;
    export let url: string = "https://elfried.herokuapp.com/";

    function handleLoad(_event: Event): void {
        let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
        if (!canvas)
            return;
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");

        let horizon: number = crc2.canvas.height / 2;

        let posMountains: Vector = new Vector(0, horizon);

        drawBackground();
        drawSun(new Vector(100, 75));
        drawMountains(posMountains, 75, 200, "grey", "white");
        drawMountains(posMountains, 50, 150, "grey", "lightgrey");
        drawClouds(10, new Vector(0, 0), new Vector(crc2.canvas.width, crc2.canvas.height / 4));
        drawSnowman(new Vector(600, 600));
        drawBirdHouse(new Vector(300, 500));
        drawTree(new Vector(900, 400));

        let background: ImageData = crc2.getImageData(0, 0, 1200, 550);  //der ganze canvas

        window.setInterval(update, 20, background);

        drawSnowflakes(60); //alle Movable Sub objekte jetzt darunter!
        drawBirds(15);

        window.addEventListener("keydown", handleFood);
        canvas.addEventListener("click", handleSnowball);
        window.setTimeout(handleEnd, 20000);
    }

    function drawBackground(): void {
        //console.log("Background");

        let gradient: CanvasGradient = crc2.createLinearGradient(0, 0, 0, crc2.canvas.height);
        gradient.addColorStop(0, "lightblue");
        gradient.addColorStop(0.5, "white");

        crc2.fillStyle = gradient;
        crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);
    }

    function drawSun(_position: Vector): void {
        //console.log("Sun", _position);

        let r1: number = 30;
        let r2: number = 150;

        let gradient: CanvasGradient = crc2.createRadialGradient(0, 0, r1, 0, 0, r2);


        gradient.addColorStop(0, "HSLA(60, 100%, 90%, 1)");
        gradient.addColorStop(1, "HSLA(60, 100%, 50%, 0)");

        crc2.save();
        crc2.translate(_position.x, _position.y);
        crc2.fillStyle = gradient;
        crc2.arc(0, 0, r2, 0, 2 * Math.PI);
        crc2.fill();
        crc2.restore();
    }

    function drawMountains(_position: Vector, _min: number, _max: number, _colorLow: string, _colorHigh: string): void {
        //console.log("Mountains", _position, _min, _max);
        let stepMin: number = 50;
        let stepMax: number = 150;
        let x: number = 0;

        crc2.save();
        crc2.translate(_position.x, _position.y);

        crc2.beginPath();
        crc2.moveTo(0, 0);
        crc2.lineTo(0, -_max);

        do {
            x += stepMin + Math.random() * (stepMax - stepMin);
            let y: number = -_min - mathRandomMinMax(_min, _max);
            crc2.lineTo(x, y);
        } while (x < crc2.canvas.width);

        crc2.lineTo(x, 0);
        crc2.closePath();

        let gradient: CanvasGradient = crc2.createLinearGradient(0, 0, 0, -_max);
        gradient.addColorStop(0, _colorLow);
        gradient.addColorStop(0.7, _colorHigh);

        crc2.fillStyle = gradient;
        crc2.fill();

        crc2.restore();
    }


    function drawCloud(_position: Vector, _size: Vector): void {
        //console.log("Cloud", _position, _size);

        let nParticles: number = 20;
        let radiusParticle: number = 50;
        let particle: Path2D = new Path2D();
        let gradient: CanvasGradient = crc2.createRadialGradient(0, 0, 0, 0, 0, radiusParticle);

        particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI);
        gradient.addColorStop(0, "HSLA(0, 100%, 100%, 0.5)");
        gradient.addColorStop(1, "HSLA(0, 100%, 100%, 0)");

        crc2.save();
        crc2.translate(_position.x, _position.y);
        crc2.fillStyle = gradient;
        crc2.fill(particle);

        for (let drawn: number = 0; drawn < nParticles; drawn++) {
            crc2.save();
            let x: number = (Math.random() - 0.5) * _size.x;
            let y: number = - (Math.random() * _size.y);
            crc2.translate(x, y);
            crc2.fill(particle);
            crc2.restore();
        }
        crc2.restore();
    }

    function drawClouds(_nClouds: number, _posStart: Vector, _posEnd: Vector): void {
        //console.log("Clouds", _nClouds);

        let size: Vector = new Vector(150, 90);

        for (let drawn: number = 0; drawn < _nClouds; drawn++) {
            let position: Vector = new Vector(mathRandomMinMax(_posStart.x, _posEnd.x), mathRandomMinMax(_posStart.y, _posEnd.y));
            drawCloud(position, size);
        }

    }

    function mathRandomMinMax(_min: number, _max: number): number {
        let result: number = _min + Math.random() * (_max - _min);
        return result;
    }

    function drawSnowman(_position: Vector): void {

        crc2.save();
        crc2.translate(_position.x, _position.y);

        //Körper
        crc2.beginPath();
        crc2.arc(-80, -200, 30, Math.PI * -0.5, Math.PI * 2);
        crc2.arc(-80, -240, 20, Math.PI * -0.5, Math.PI * 2);
        crc2.arc(-80, -270, 15, Math.PI * -0.5, Math.PI * 2);
        crc2.strokeStyle = "black";
        crc2.stroke();
        crc2.fillStyle = "#f2f2f2";
        crc2.fill();
        crc2.closePath();

        crc2.beginPath();
        crc2.arc(-85, -273, 2, Math.PI * -0.5, Math.PI * 2);
        crc2.fillStyle = "black";
        crc2.stroke();
        crc2.fill();
        crc2.closePath();

        crc2.beginPath();
        crc2.arc(-75, -273, 2, Math.PI * -0.5, Math.PI * 2);
        crc2.fillStyle = "black";
        crc2.stroke();
        crc2.fill();
        crc2.closePath();

        crc2.beginPath();
        crc2.arc(-80, -268, 3, Math.PI * -0.5, Math.PI * 2);
        crc2.fillStyle = "orange";
        crc2.fill();
        crc2.stroke();
        crc2.closePath();

        crc2.beginPath();
        crc2.stroke();
        crc2.fillStyle = "black";
        crc2.fillRect(-102, -290, 45, 7);
        crc2.closePath();

        crc2.beginPath();
        crc2.stroke();
        crc2.fillStyle = "black";
        crc2.fillRect(-95, -310, 30, 20);
        crc2.closePath();

        crc2.restore();
    }

    function drawBirdHouse(_position: Vector): void {

        crc2.save();
        crc2.translate(_position.x, _position.y);

        //Haus
        crc2.beginPath();
        crc2.stroke();
        crc2.fillStyle = "#8b4513";
        crc2.fillRect(-90, -160, 100, 70);
        crc2.closePath();

        //Loch
        crc2.beginPath();
        crc2.arc(-40, -125, 20, 0, 2 * Math.PI);
        crc2.fillStyle = "#000000";
        crc2.fill();
        crc2.closePath();

        //Stab
        crc2.beginPath();
        crc2.stroke();
        crc2.fillStyle = "#2c1410";
        crc2.fillRect(-45, -90, 10, 100);
        crc2.closePath();

        //Dach
        crc2.beginPath();
        crc2.moveTo(-100, -160);
        crc2.lineTo(20, -160);
        crc2.lineTo(-40, -200);
        crc2.stroke();
        crc2.fillStyle = "#800000";
        crc2.fill();
        crc2.closePath();

        crc2.restore();


    }

    function drawTree(_position: Vector): void {

        crc2.save();
        crc2.translate(_position.y, _position.y);

        crc2.beginPath();
        crc2.fillStyle = " #b33c00";
        crc2.fillRect(600, 50, 30, 60);
        crc2.stroke();
        crc2.closePath();

        crc2.beginPath();
        crc2.moveTo(510, 50);
        crc2.lineTo(710, 50);
        crc2.lineTo(610, -10);
        crc2.fillStyle = "#00802b";
        crc2.fill();
        crc2.closePath();

        crc2.beginPath();
        crc2.moveTo(530, 0);
        crc2.lineTo(690, 0);
        crc2.lineTo(610, -60);
        crc2.fillStyle = "#00802b";
        crc2.fill();
        crc2.closePath();

        crc2.beginPath();
        crc2.moveTo(550, -50);
        crc2.lineTo(670, -50);
        crc2.lineTo(610, -110);
        crc2.fillStyle = "#00802b";
        crc2.fill();
        crc2.closePath();


        crc2.restore();
    }

    function update(_backgroundData: ImageData): void {

        crc2.putImageData(_backgroundData, 0, 0);

        for (let food of foodsArray) {
            food.update();
        }

        for (let movable of moveablesArray) { 
            movable.update();
        }

        for (let bird of birdsArray) {
            bird.update();
        }

        for (let snowball of snowballsarray) {
            snowball.update();
        }

    }

    function drawSnowflakes(_amount: number): void {

        for (let i: number = 0; i < _amount; i++) {

            let position: Vector = new Vector(0, 0);
            position.x = Math.random() * 1200;
            position.y = Math.random() * 550; // --> das sie zufällig irgendwo auf dem canvas erzeugt werden

            movable = new Snowflake(position);  //--> neue Instanz wird erzeugt 
            moveablesArray.push(movable); // und ins array gepusht
        }
    }



    function drawBirds(_amount: number): void {

        for (let i: number = 0; i < _amount; i++) {
            let position: Vector = new Vector(0, 0);
            position.x = Math.random() * 1200;
            position.y = Math.random() * 550;

            bird = new Bird(position);
            birdsArray.push(bird);

        }
    }

    function handleFood(_event: KeyboardEvent): void {

        let keyPressed: string = _event.code;
        console.log(keyPressed);

        if (keyPressed == "Space") {
            drawFood(10, new Vector(50, 60), new Vector(800, 350));
            foodThrown = true;
            setTimeout(foodGone, 5000); // damit die Vögel nicht immer stehen bleiben!

            for (let i: number = 0; i < 3; i++) {
                // birdsArray[i].velocity = birdsArray[i].position.substract(food.position);
                let zufall: number = Math.floor(mathRandomMinMax(0, birdsArray.length)); // damit eine gerade zahl rauskommt + es zufällige vögel sind und auch nicht mehr die die schon gelöscht/getroffen wurden
                //birdsArray[zufall].savedPosition = birdsArray[zufall].position;
                birdsArray[zufall].velocity.x = (food.position.x - birdsArray[zufall].position.x) / 20;
                birdsArray[zufall].velocity.y = (food.position.y - birdsArray[zufall].position.y) / 20; //warum ist der Vektor so groß??
                //console.log(birdsArray[zufall].position);
                //console.log(birdsArray[zufall].velocity);
            }


        }
    }

    function foodGone(): void {
        foodThrown = false;
    }

    function handleSnowball(_event: MouseEvent): void {
        let x: number = _event.clientX; // maus position wird übergeben
        let y: number = _event.clientY;
        drawSnowball(new Vector(x, y));

    }

    export function collision(): void {
        for (let birdNumber: number = 0; birdNumber < birdsArray.length; birdNumber++) {
            let bird: Bird = birdsArray[birdNumber];

            if (snowball.checkIfHit(bird) == true) { // wie das erst wenn schneeball gewisse Größe??
                birdsArray.splice(birdNumber, 1);
                snowballsarray.splice(0, snowballsarray.length); //wusste nicht wie anders 
                score += 10;
                console.log(score);
            }
        }
    }

    function drawSnowball(_position: Vector): void {
        snowball = new Snowball(_position);
        snowballsarray.push(snowball);
    }

    function drawFood(_amount: number, _size: Vector, _position: Vector): void {

        //let posStart: Vector = new Vector(40, canvas.height /2);
        //let posEnd: Vector = new Vector(1190, 540);

        for (let i: number = 0; i < _amount; i++) {
            let position: Vector = new Vector(0, 0);
            position.x = Math.random() * _size.x + _position.x; //(Math.floor(mathRandomMinMax(posStart.x, posEnd.x));
            position.y = Math.random() * _size.y + _position.y; //Math.floor(mathRandomMinMax(posStart.y, posEnd.y));

            food = new Food(position);
            foodsArray.push(food);
        }

    }

    export function deleteFood(): void {
        foodsArray.splice(0, 1); //an nullter stelle wird 1 element gelöscht
    }

    function handleSendHS(_name: string, _score: number): void {
        let query: string = "score=" + _score + "&name=" + _name;
        let response: Promise<Response> = fetch(url + "?" + query);
        //let responseText: Promise<string> = response.text();
        alert(response);
    }

    function handleEnd(): void {
        let name: string | null = prompt("Your Score " + score, "Please enter your name"); //dann beides in Datenbank! und wenn es ausgefüllt wurde zurück zur startseite!!
        if (name != null) {
            handleSendHS(name, score);

        }
        window.open("https://melreinhardt.github.io/mrhdt.eia2/Vogelhaus/startingPage.html", "_self");
    }




}