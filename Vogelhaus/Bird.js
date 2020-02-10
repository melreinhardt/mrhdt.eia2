"use strict";
var Moorhuhn;
(function (Moorhuhn) {
    class Bird extends Moorhuhn.Movables {
        constructor(_position) {
            super(_position);
            this.setBack = () => {
                this.position = this.savedPosition; // wie bekomme ich die vögel wieder zurück an den punkt an dem sie gekommen sind?
                this.velocity = new Moorhuhn.Vector(4, 0);
                //console.log(this.savedPosition);
            };
            this.velocity = new Moorhuhn.Vector(4, 0);
            this.wingColor = this.getRandomColor();
            //this.savedPosition = _position;
        }
        move() {
            this.position.add(this.velocity);
            if (this.position.x > 1200)
                this.position.x -= Moorhuhn.crc2.canvas.width;
            //hier so eine lange if bedingung weil wir einen bereich definiern sonst stimmen die positionen nie überein
            if (Moorhuhn.foodThrown == true && Moorhuhn.food.position.x - 35 < this.position.x && Moorhuhn.food.position.x + 35 > this.position.x && Moorhuhn.food.position.y - 35 < this.position.y && Moorhuhn.food.position.y + 35 > this.position.y) {
                this.velocity = new Moorhuhn.Vector(0, 0);
                console.log("stehen bleiben");
                setTimeout(this.setBack, 5000);
            }
        }
        drawFlying() {
            //1. fliegend
            Moorhuhn.crc2.save();
            Moorhuhn.crc2.translate(this.position.x, this.position.y);
            //Körper
            Moorhuhn.crc2.beginPath();
            Moorhuhn.crc2.arc(0, 0, 15, 0, 2 * Math.PI);
            Moorhuhn.crc2.arc(10, -5, 10, 0, 2 * Math.PI);
            Moorhuhn.crc2.fillStyle = "#000000";
            Moorhuhn.crc2.fill();
            Moorhuhn.crc2.closePath();
            // Auge
            Moorhuhn.crc2.beginPath();
            Moorhuhn.crc2.arc(10, -8, 3, 0, 7);
            Moorhuhn.crc2.fillStyle = "#FFFFFF";
            Moorhuhn.crc2.fill();
            Moorhuhn.crc2.closePath();
            //Schnabel
            Moorhuhn.crc2.beginPath();
            Moorhuhn.crc2.moveTo(10, 0);
            Moorhuhn.crc2.lineTo(35, 5);
            Moorhuhn.crc2.lineTo(20, -10);
            Moorhuhn.crc2.fillStyle = "#ffa31a";
            Moorhuhn.crc2.fill();
            Moorhuhn.crc2.closePath();
            //Flügel
            Moorhuhn.crc2.beginPath();
            Moorhuhn.crc2.stroke();
            Moorhuhn.crc2.rotate(-45);
            Moorhuhn.crc2.fillStyle = this.wingColor;
            Moorhuhn.crc2.fillRect(-5, -15, 5, 15);
            Moorhuhn.crc2.closePath();
            Moorhuhn.crc2.restore();
        }
        drawStanding() {
            //2. Sitzend
            //Körper
            Moorhuhn.crc2.save();
            Moorhuhn.crc2.translate(this.position.x, this.position.y);
            Moorhuhn.crc2.beginPath();
            Moorhuhn.crc2.arc(0, 0, 15, 0, 2 * Math.PI); // x-Werte auf anfang damit von anfang vom canvas kommen
            Moorhuhn.crc2.arc(10, -5, 10, 0, 2 * Math.PI);
            Moorhuhn.crc2.fillStyle = "#000000";
            Moorhuhn.crc2.fill();
            Moorhuhn.crc2.closePath();
            // Auge
            Moorhuhn.crc2.beginPath();
            Moorhuhn.crc2.arc(13, -7, 3, 0, 7);
            Moorhuhn.crc2.fillStyle = "#FFFFFF";
            Moorhuhn.crc2.fill();
            Moorhuhn.crc2.closePath();
            //Schnabel
            Moorhuhn.crc2.beginPath();
            Moorhuhn.crc2.moveTo(20, 0);
            Moorhuhn.crc2.lineTo(25, -5);
            Moorhuhn.crc2.lineTo(20, -10);
            Moorhuhn.crc2.fillStyle = "#ffa31a";
            Moorhuhn.crc2.fill();
            Moorhuhn.crc2.closePath();
            //Füße
            Moorhuhn.crc2.beginPath();
            Moorhuhn.crc2.moveTo(0, 15);
            Moorhuhn.crc2.lineTo(0, 25);
            Moorhuhn.crc2.fill();
            Moorhuhn.crc2.stroke();
            Moorhuhn.crc2.closePath();
            Moorhuhn.crc2.restore();
        }
        getRandomColor() {
            let letters = "0123456789ABCDEF";
            let color = "#";
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }
        update() {
            if (this.position.y <= 300)
                this.drawFlying();
            else
                this.drawStanding();
            this.move();
        }
    }
    Moorhuhn.Bird = Bird;
})(Moorhuhn || (Moorhuhn = {}));
//# sourceMappingURL=Bird.js.map