import { CGFobject } from '../../lib/CGF.js';
import { MyCilinder } from '../MyCilinder.js';
import { MyQuad } from '../MyQuad.js';

export class MyWagonCloth extends CGFobject {
    constructor(scene) {
        super(scene);   
        this.wagonWidth = 20;    
        this.wagonLength = 10; 

        this.cloth = new MyCilinder(scene, 20, 1, 35, 9, true);
        this.arc = new MyCilinder(scene, 20, 1, 1, 9.2, true,0.05);
        this.side = new MyQuad(scene, 35, 10, 0.01);
        this.tab = new MyQuad(scene, 9, 1, 0.5);
    }

    display(clothMaterial, woodMaterial) {
        this.scene.pushMatrix();
        woodMaterial.apply();
        const spacing = this.wagonLength / (4 - 1);
        for (let i = 0; i < 6; i++) {
            this.scene.pushMatrix();
                this.scene.translate(-this.wagonWidth+2.2, 0,0);
                this.scene.translate(i * spacing*2.08, 14.7,0);
                this.scene.rotate( Math.PI/2, 1, 0, 0);
                this.scene.rotate( -Math.PI/2, 0, 0, 1);
                this.arc.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
                this.scene.translate(-this.wagonWidth+2.7, 0,-8.05);
                this.scene.translate(i * spacing*2.08, 10.5,0);
                this.scene.rotate( -Math.PI/15, 1, 0, 0);
                this.scene.rotate( -Math.PI/2, 0, 0, 1);
                this.tab.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
                this.scene.translate(-this.wagonWidth+2.7, 0,8.05);
                this.scene.translate(i * spacing*2.08, 10.5,0);
                this.scene.rotate( Math.PI/15, 1, 0, 0);
                this.scene.rotate( -Math.PI/2, 0, 0, 1);
                this.tab.display();
            this.scene.popMatrix();
        }
        this.scene.popMatrix();

        this.scene.pushMatrix();
        clothMaterial.apply()
            this.scene.pushMatrix();
                this.scene.rotate( Math.PI/2, 1, 0, 0);
                this.scene.rotate( -Math.PI/2, 0, 0, 1);
                this.scene.translate(0, -17.5, -14.5);
                this.cloth.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
                this.scene.translate(0, 10, -8);
                this.scene.rotate( -Math.PI/15, 1, 0, 0);
                this.side.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
                this.scene.translate(0, 10, 8);
                this.scene.rotate(Math.PI/15, 1, 0, 0);
                this.side.display();
            this.scene.popMatrix();
        this.scene.popMatrix();
    }
}