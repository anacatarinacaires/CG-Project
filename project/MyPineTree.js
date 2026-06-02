import { CGFobject, CGFappearance } from '../lib/CGF.js';
import { MyCone } from './MyCone.js';
import { MyBranch } from './MyBranch.js';

export class MyPineTree extends CGFobject {
    constructor(scene, textureLeaf, textureBranch) {
        super(scene);

        this.layers = 5 + Math.floor(Math.random() * 3); 
        this.trunkHeight = 1.5 + Math.random() * 0.5;

        this.coneMaterial = new CGFappearance(scene);
        this.coneMaterial.setAmbient(0.4, 0.5, 0.4, 1); 
        this.coneMaterial.setDiffuse(0.8, 0.9, 0.8, 1); 
        this.coneMaterial.setSpecular(0.1, 0.1, 0.1, 1); 
        this.coneMaterial.setShininess(10);
        this.coneMaterial.setTexture(textureLeaf);
        this.coneMaterial.setTextureWrap('REPEAT', 'REPEAT');

        this.cone  = new MyCone(scene, 12, 1);
        this.trunk = new MyBranch(scene, textureBranch, 0.25, this.trunkHeight);
    }

    display() {
        // Tronco
        this.scene.scale(2.5,2.5,2.5);
        this.scene.pushMatrix();
        this.trunk.material.apply();
        this.trunk.display();
        this.scene.popMatrix();

        this.coneMaterial.apply(); 

        const coneH = 1.4;   
        const overlap = 0.6;

        for (let i = 0; i < this.layers; i++) {
            const scale = 1.0 - (i * (0.7 / this.layers)); 
            const y = (this.trunkHeight * 0.8) + (i * overlap);

            this.scene.pushMatrix();
            this.scene.translate(0, y, 0);
            this.scene.scale(scale, coneH, scale);
            this.cone.display();
            this.scene.popMatrix();
        }
    }
}