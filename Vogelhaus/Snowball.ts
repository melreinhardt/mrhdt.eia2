namespace Moorhuhn {
    export class Snowball extends Movables {
        size: number = 85;
        r1: number = 25;
        timer: number = 60;

        constructor(_position: Vector) {
            super(_position);
            this.velocity = new Vector(0, 0);
        }

        move(): void {
            this.position.add(this.velocity);

        }


        draw(): void {

            let gradient: CanvasGradient = crc2.createRadialGradient(0, 0, this.r1, 0, 0, this.size);


            gradient.addColorStop(0, "HSLA(189, 100%, 45%, 1)");
            gradient.addColorStop(1, "HSLA(184, 100%, 78%, 0)");

            crc2.save();
            crc2.translate(this.position.x, this.position.y);
            crc2.fillStyle = gradient;
            crc2.arc(0, 0, this.size, 0, 2 * Math.PI);
            crc2.fill();
            crc2.closePath();
            crc2.restore();

        }

        checkIfHit(bird: Bird): boolean {
            if (bird.position.x - 25 < this.position.x && bird.position.x + 25 > this.position.x && bird.position.y - 25 < this.position.y && bird.position.y + 25 > this.position.y) {//&& snowball.size = (snowball.size*0.95)* 5) {//&& size!! )) 
                return true;
            }
            else
                return false;
        }

        update(): void {
            //this.move();
            this.draw();
            this.size *= (0.95);
            this.r1 *= (0.95);
            this.timer -= 0.5;
            if (this.timer == 45) {
                collision();
            }
        }
    }
}