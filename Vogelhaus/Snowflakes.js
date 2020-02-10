"use strict";
var Moorhuhn;
(function (Moorhuhn) {
    class Snowflake extends Moorhuhn.Movables {
        constructor(_position) {
            super(_position);
            this.velocity = new Moorhuhn.Vector(0, 3);
        }
        move() {
            this.position.add(this.velocity);
            if (this.position.y > 550)
                this.position.y -= Moorhuhn.crc2.canvas.height;
        }
        draw() {
            Moorhuhn.crc2.save();
            Moorhuhn.crc2.translate(this.position.x, this.position.y);
            Moorhuhn.crc2.beginPath();
            Moorhuhn.crc2.arc(0, 0, 5, 0, 2 * Math.PI);
            Moorhuhn.crc2.fillStyle = "#b3e6ff";
            Moorhuhn.crc2.fill();
            Moorhuhn.crc2.closePath();
            Moorhuhn.crc2.restore();
        }
        update() {
            this.move();
            this.draw();
        }
    }
    Moorhuhn.Snowflake = Snowflake;
})(Moorhuhn || (Moorhuhn = {}));
//# sourceMappingURL=Snowflakes.js.map