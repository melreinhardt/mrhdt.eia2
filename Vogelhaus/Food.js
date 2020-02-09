"use strict";
var Moorhuhn;
(function (Moorhuhn) {
    class Food {
        constructor(_position) {
            this.position = _position;
            setTimeout(Moorhuhn.deleteFood, 10000); //funktion handle was dann nach dem time out (--> nach den 10000 millisekunden = 10 sek) passieren soll
        }
        draw() {
            Moorhuhn.crc2.save();
            Moorhuhn.crc2.translate(this.position.x, this.position.y);
            Moorhuhn.crc2.beginPath();
            Moorhuhn.crc2.arc(0, 0, 4, 0, 7);
            Moorhuhn.crc2.fillStyle = "#ffb84d";
            Moorhuhn.crc2.fill();
            Moorhuhn.crc2.closePath();
            Moorhuhn.crc2.restore();
        }
        update() {
            this.draw();
        }
    }
    Moorhuhn.Food = Food;
})(Moorhuhn || (Moorhuhn = {}));
//# sourceMappingURL=Food.js.map