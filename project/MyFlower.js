import { CGFobject, CGFappearance } from '../lib/CGF.js';
import { MyPetal } from './MyPetal.js';
import { MySphere } from './MySphere.js';

export class MyFlower extends CGFobject {

    constructor(scene,texturePetal,scale) {
        super(scene);
        this.height = scale;

        this.petalMaterial = new CGFappearance(scene);
        this.petalMaterial.setAmbient(1,1,1,1);
        this.petalMaterial.setDiffuse(1,1,1,1);
        this.petalMaterial.setTexture(texturePetal);
        this.petalMaterial.setTextureWrap('REPEAT', 'REPEAT');
        
        this.center = new MySphere(scene, 10, 10, 0.05);
        this.petal = new MyPetal(scene, Math.random()*0.3 +0.1);
    }
    
    display() {

        this.scene.pushMatrix();
        this.scene.scale(this.height,this.height,this.height);

        this.petalMaterial.apply();
        for(let i = 0; i < 7 + Math.floor(Math.random()); i++) {
            this.scene.pushMatrix();

            let angle = i * (Math.PI * 2.0 / 6.0);
            this.scene.rotate(angle,0,0,1);
            this.petal.display();

            this.scene.popMatrix();
        }

        this.scene.popMatrix();
    }
}