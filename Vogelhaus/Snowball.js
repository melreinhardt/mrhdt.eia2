"use strict";
var Moorhuhn;
(function (Moorhuhn) {
    class Snowball extends Moorhuhn.Movables {
        constructor(_position) {
            super(_position);
            this.size = 85;
            this.r1 = 25;
            this.timer = 60;
            this.velocity = new Moorhuhn.Vector(0, 0);
        }
        move() {
            this.position.add(this.velocity);
        }
        draw() {
            let gradient = Moorhuhn.crc2.createRadialGradient(0, 0, this.r1, 0, 0, this.size);
            gradient.addColorStop(0, "HSLA(189, 100%, 45%, 1)");
            gradient.addColorStop(1, "HSLA(184, 100%, 78%, 0)");
            Moorhuhn.crc2.save();
            Moorhuhn.crc2.translate(this.position.x, this.position.y);
            Moorhuhn.crc2.fillStyle = gradient;
            Moorhuhn.crc2.arc(0, 0, this.size, 0, 2 * Math.PI);
            Moorhuhn.crc2.fill();
            Moorhuhn.crc2.closePath();
            Moorhuhn.crc2.restore();
        }
        checkIfHit(bird) {
            if (bird.position.x - 25 < this.position.x && bird.position.x + 25 > this.position.x && bird.position.y - 25 < this.position.y && bird.position.y + 25 > this.position.y) { //&& snowball.size = (snowball.size*0.95)* 5) {//&& size!! )) 
                return true;
            }
            else
                return false;
        }
        update() {
            //this.move();
            this.draw();
            this.size *= (0.95);
            this.r1 *= (0.95);
            this.timer -= 0.5;
            if (this.timer == 45) {
                Moorhuhn.collision();
            }
        }
    }
    Moorhuhn.Snowball = Snowball;
})(Moorhuhn || (Moorhuhn = {}));
//# sourceMappingURL=Snowball.js.map