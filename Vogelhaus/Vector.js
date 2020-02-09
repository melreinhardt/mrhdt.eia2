"use strict";
var Moorhuhn;
(function (Moorhuhn) {
    class Vector {
        constructor(_x, _y) {
            this.set(_x, _y);
        }
        set(_x, _y) {
            this.x = _x;
            this.y = _y;
        }
        scale(_factor) {
            this.x *= _factor;
            this.y *= _factor;
        }
        add(_addend) {
            this.x += _addend.x;
            this.y += _addend.y;
        }
        substract(_sub) {
            this.x = _sub.x - this.x;
            this.y = _sub.y - this.y;
        }
        random(_minLength, _maxLength) {
            let length = _minLength + Math.random() * (_maxLength - _minLength);
            let direction = Math.random() * 2 * Math.PI;
            this.set(Math.cos(direction), Math.sin(direction));
            this.scale(length);
        }
        copy() {
            let vector = new Vector(this.x, this.y);
            return vector;
        }
    }
    Moorhuhn.Vector = Vector;
})(Moorhuhn || (Moorhuhn = {}));
//# sourceMappingURL=Vector.js.map