namespace Moorhuhn {
    export class Snowflake extends Movables {

        constructor(_position: Vector) {
            super(_position);
            this.velocity = new Vector(0, 3);
        }

        move(): void {

            this.position.add(this.velocity);

            if (this.position.y > 550)
                this.position.y -= crc2.canvas.height;
        }

        draw(): void {

            crc2.save();
            crc2.translate(this.position.x, this.position.y);
            crc2.beginPath();
            crc2.arc(0, 0, 5, 0, 2 * Math.PI);
            crc2.fillStyle = "#b3e6ff";
            crc2.fill();
            crc2.closePath();
            crc2.restore();

        }

        update(): void {
            this.move();
            this.draw();
        }
    }
}