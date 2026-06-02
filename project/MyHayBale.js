import { CGFobject, CGFappearance, CGFtexture } from '../lib/CGF.js';
import { MyCilinder } from './MyCilinder.js';

export class MyHayBale extends CGFobject {
    constructor(scene) {
        super(scene);

        this.scale =  3 + Math.random() * 0.8;

        this.cylinder = new MyCilinder(scene, 16, 1, 3.5, 1, false, 0.99);

        this.hayMaterial = new CGFappearance(scene);
        this.hayMaterial.setAmbient(1, 1, 1, 1);
        this.hayMaterial.setDiffuse(1, 1, 1, 1);
        this.hayMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.hayMaterial.setTexture(new CGFtexture(scene, "images/hay.jpg"));
        this.hayMaterial.setTextureWrap('REPEAT', 'REPEAT');
    }

    display() {
    this.hayMaterial.apply();

    this.scene.pushMatrix();
    this.scene.scale(this.scale,this.scale,this.scale)
    this.scene.rotate(Math.PI / 2, 1, 0, 0); 
    this.cylinder.display();
    this.scene.popMatrix();
    }
}