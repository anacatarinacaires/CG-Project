// @ts-nocheck
import { CGFobject, CGFappearance, CGFtexture } from '../lib/CGF.js';
import { MySphere } from './MySphere.js';

export class MyBush extends CGFobject {
    constructor(scene, textureLeaf) {
        super(scene);

        this.bushSphere  = new MySphere(scene, 12, 12, 1);
        this.berrySphere = new MySphere(scene, 6, 6, 1);

        this.bushMaterial = new CGFappearance(scene);
        this.bushMaterial.setAmbient(1, 1, 1, 1);
        this.bushMaterial.setDiffuse(1, 1, 1, 1);
        this.bushMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.bushMaterial.setTexture(textureLeaf);
        this.bushMaterial.setTextureWrap('REPEAT', 'REPEAT');

        this.berryMaterial = new CGFappearance(scene);
        this.berryMaterial.setAmbient(0.8, 0.1, 0.1, 1);
        this.berryMaterial.setDiffuse(0.8, 0.1, 0.1, 1);
        this.berryMaterial.setSpecular(0.5, 0.1, 0.1, 1);
        this.berryMaterial.setShininess(20);

        this.berries = [
            { x:  1.4, y:  0.3, z:  0.5 },
            { x: -1.3, y:  0.4, z:  0.6 },
            { x:  1.2, y: -0.2, z: -0.8 },
            { x: -1.4, y:  0.1, z: -0.4 },
            { x:  0.5, y:  1.1, z:  0.3 },
            { x: -0.8, y:  1.0, z: -0.5 },
            { x:  1.3, y: -0.1, z:  0.2 },
        ];
    }

    display() {
        // Main bush
        this.scene.pushMatrix();
        this.scene.scale(1.5, 1.2, 1.5);
        this.bushMaterial.apply();
        this.bushSphere.display();
        this.scene.popMatrix();

        // Secondary bush 
        this.scene.pushMatrix();
        this.scene.translate(0.8, 0, 0.5); 
        this.scene.scale(1.0, 0.9, 1.0);
        this.bushMaterial.apply();
        this.bushSphere.display();
        this.scene.popMatrix();
        

        // Berries
        for (const { x, y, z } of this.berries) {
            this.scene.pushMatrix();
            this.scene.translate(x, y, z);
            this.scene.scale(0.05, 0.05, 0.05);
            this.berryMaterial.apply();
            this.berrySphere.display();
            this.scene.popMatrix();
        }
    }
}