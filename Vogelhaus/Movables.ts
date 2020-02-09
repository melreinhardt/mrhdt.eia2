namespace Moorhuhn {
    export abstract class Movables {
        position: Vector;
        velocity: Vector;
        //size: number;

        constructor(_position: Vector) { //--> methode zur Instanzierung eines Objekts
            this.position = _position;
        }

        move(): void {
            //leer, da überall anders bei schneeflocken, vöglen und schneebällen
        }
        draw(): void {
            //sehen unterschiedlich aus --> in jeweiligen klassen beschrieben
        }

        update(): void {
            this.move();
            this.draw(); 
        } 
    }
}