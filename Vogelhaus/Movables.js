"use strict";
var Moorhuhn;
(function (Moorhuhn) {
    class Movables {
        //size: number;
        constructor(_position) {
            this.position = _position;
        }
        move() {
            //leer, da überall anders bei schneeflocken, vöglen und schneebällen
        }
        draw() {
            //sehen unterschiedlich aus --> in jeweiligen klassen beschrieben
        }
        update() {
            this.move();
            this.draw();
        }
    }
    Moorhuhn.Movables = Movables;
})(Moorhuhn || (Moorhuhn = {}));
//# sourceMappingURL=Movables.js.map