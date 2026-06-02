import {CGFappearance, CGFobject, CGFtexture, CGFshader} from '../../lib/CGF.js';
import { MyCilinder } from '../MyCilinder.js';
import { MyPrism } from '../MyPrism.js';

export class MyWheels extends CGFobject {
    constructor(scene) {
        super(scene);
        this.wheel= new MyPrism(scene,20,1,0.3,7,0.87,1.0);
        this.wheelsup= new MyCilinder(scene,10,1,7*0.9,0.4);
        this.wheelsup2= new MyCilinder(scene,15,1,22,0.5);
        this.hub = new MyCilinder(scene, 12, 1, 0.8, 1.5);
    }

    displayWheel(x, y, z, rollAngle, steerAngle) {
        this.scene.pushMatrix();
  
            this.scene.translate(x, y, z);
            
            this.scene.rotate(steerAngle, 0, 1, 0);
            this.scene.rotate(rollAngle, 0, 0, 1); 
            
            this.scene.pushMatrix();
            this.scene.rotate(-Math.PI / 2, 1, 0, 0);
            this.wheel.display();
            this.scene.popMatrix();

            for (let s = 0; s < 8; s++) {
                this.scene.pushMatrix();
                this.scene.translate(0,0,-1);
                this.scene.rotate(s * (2 * Math.PI) / 8, 0, 0, 1);
                this.wheelsup.display();
                this.scene.popMatrix();
            }
        this.scene.popMatrix();
    }

    display(wheelAngle, steerAngle) {
        this.displayWheel( -10, 0, -10, wheelAngle, steerAngle);
        this.displayWheel(-10, 0, 12, wheelAngle, steerAngle);

        this.displayWheel( 10, 0,  12, wheelAngle,0);  
        this.displayWheel(10, 0,  -10, wheelAngle,0);  
        
        

        this.scene.pushMatrix();
            this.scene.translate(10,0,11);
            this.scene.rotate(-Math.PI / 2, 1, 0, 0);
            this.wheelsup2.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
            this.scene.translate(-10,0,11);
            this.scene.rotate(-Math.PI / 2, 1, 0, 0);
            this.wheelsup2.display();
        this.scene.popMatrix();
    }
}