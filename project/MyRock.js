import {CGFappearance, CGFobject, CGFtexture, CGFshader} from '../lib/CGF.js';
import {MySphere} from './MySphere.js';

export class MyRock extends CGFobject {
    constructor(scene, texture, seed = 0.25, scale = 1.0, slices= 1.0, stacks=1.0,radius=1.0) {
        super(scene);
        this.texture = texture;
        this.seed = seed;
        this.scale = scale;
        this.rock = new MySphere(scene, slices, stacks, radius);
    }

    display() {
        this.scene.activeShader.setUniformsValues({ uSeed: this.seed, uStrength: 4.5 });
        this.texture.bind(0);

        this.scene.pushMatrix();
        this.scene.scale(this.scale, this.scale, this.scale);
        this.rock.display();
        this.scene.popMatrix();
    }
}