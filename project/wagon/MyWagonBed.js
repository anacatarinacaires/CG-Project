import {CGFappearance, CGFobject, CGFtexture, CGFshader} from '../../lib/CGF.js';
import { MyCilinder } from '../MyCilinder.js';
import { MyQuad } from '../MyQuad.js';

export class MyWagonBed extends CGFobject {
    constructor(scene) {
        super(scene);
        this.wagonBottom = new MyQuad(scene, 25,10,0.8);
        this.wagonSide = new MyQuad(scene, 25,5,0.8);
        this.wagonSide2 = new MyQuad(scene, 10,5,0.8);
    }

    display() {
        this.scene.pushMatrix();
            this.scene.scale(1.5,1.5,1.5); 

            this.scene.pushMatrix();
            this.scene.translate(0,2,-5);
            this.wagonSide.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(0,2,5);
            this.wagonSide.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(12.1,2,0);
            this.scene.rotate(Math.PI / 2, 0, 1, 0);
            this.wagonSide2.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(-12.1,2,0);
            this.scene.rotate(Math.PI / 2, 0, 1, 0);
            this.wagonSide2.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.rotate(-Math.PI / 2, 1, 0, 0);
            this.wagonBottom.display();
            this.scene.popMatrix();


        this.scene.popMatrix();
    }
}