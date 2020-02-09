namespace Moorhuhn {
    export class Bird extends Movables {
        //wingColor: string;
        savedPosition: Vector;

        constructor(_position: Vector) {
            super(_position);
            this.velocity = new Vector(4, 0);
            this.savedPosition = _position;

            //this.wingColor = this.getRandomColor()
        }

        setBack: Function = (): void => {       // arrow function sonst this verwiest auf window da event target (NACHLESEN!!)
            this.position = this.savedPosition; // wie bekomme ich die vögel wieder zurück an den punkt an dem sie gekommen sind?
            this.velocity = new Vector(4, 0);
            //console.log(this.savedPosition);
        }


        move(): void {
            this.position.add(this.velocity);

            if (this.position.x > 1200)
                this.position.x -= crc2.canvas.width;

                //hier so eine lange if bedingung weil wir einen bereich definiern sonst stimmen die positionen nie überein
            if (foodThrown == true && food.position.x - 35 < this.position.x && food.position.x + 35 > this.position.x && food.position.y - 35 < this.position.y && food.position.y + 35 > this.position.y) { 
                this.velocity = new Vector(0, 0);
                console.log("stehen bleiben");
                setTimeout(this.setBack, 5000);
            }

            /*if (this.position == food.position){
                this.position = food.position.copy();
                this.velocity = new Vector(0, 0);//stay there till... ? //WARUM NICHT?????
                console.log("geklappt"); 
            }*/
        }




        drawFlying(): void {
            //1. fliegend

            crc2.save();
            crc2.translate(this.position.x, this.position.y);

            //Körper
            crc2.beginPath();
            crc2.arc(0, 0, 15, 0, 2 * Math.PI);
            crc2.arc(10, -5, 10, 0, 2 * Math.PI);
            crc2.fillStyle = "#000000";
            crc2.fill();
            crc2.closePath();

            // Auge
            crc2.beginPath();
            crc2.arc(10, -8, 3, 0, 7);
            crc2.fillStyle = "#FFFFFF";
            crc2.fill();
            crc2.closePath();

            //Schnabel
            crc2.beginPath();
            crc2.moveTo(10, 0);
            crc2.lineTo(35, 5);
            crc2.lineTo(20, -10);
            crc2.fillStyle = "#ffa31a";
            crc2.fill();
            crc2.closePath();

            //Flügel
            crc2.beginPath();
            crc2.stroke();
            crc2.rotate(-45);
            crc2.fillStyle = "#b30000";
            crc2.fillRect(-5, -15, 5, 15);
            crc2.closePath();

            crc2.restore();


        }

        drawStanding(): void {

            //2. Sitzend

            //Körper
            crc2.save();
            crc2.translate(this.position.x, this.position.y);
            crc2.beginPath();
            crc2.arc(0, 0, 15, 0, 2 * Math.PI); // x-Werte auf anfang damit von anfang vom canvas kommen
            crc2.arc(10, -5, 10, 0, 2 * Math.PI);
            crc2.fillStyle = "#000000";
            crc2.fill();
            crc2.closePath();

            // Auge
            crc2.beginPath();
            crc2.arc(13, -7, 3, 0, 7);
            crc2.fillStyle = "#FFFFFF";
            crc2.fill();
            crc2.closePath();

            //Schnabel
            crc2.beginPath();
            crc2.moveTo(20, 0);
            crc2.lineTo(25, -5);
            crc2.lineTo(20, -10);
            crc2.fillStyle = "#ffa31a";
            crc2.fill();
            crc2.closePath();

            //Füße
            crc2.beginPath();
            crc2.moveTo(0, 15);
            crc2.lineTo(0, 25);
            crc2.fill();
            crc2.stroke();
            crc2.closePath();

            crc2.restore();
        }

        update(): void {

            if (this.position.y <= 300)
                this.drawFlying();
            else
                this.drawStanding();

            this.move();
        }
    }
}
