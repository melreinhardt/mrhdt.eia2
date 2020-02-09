namespace Moorhuhn {
    export class Food {
        position: Vector;

        constructor(_position: Vector) {
            this.position = _position;
            setTimeout(deleteFood, 10000); //funktion handle was dann nach dem time out (--> nach den 10000 millisekunden = 10 sek) passieren soll
        }
    
        draw(): void {
            crc2.save();
            crc2.translate(this.position.x, this.position.y);

            crc2.beginPath();
            crc2.arc(0, 0, 4, 0, 7);
            crc2.fillStyle = "#ffb84d";
            crc2.fill();
            crc2.closePath();

            crc2.restore();
        }

        update(): void {
            this.draw();
        }
    }


}