import { CGFobject, CGFshader } from '../lib/CGF.js';

class MyCircle extends CGFobject {
    constructor(scene, slices) {
        super(scene);
        this.slices = slices;
        this.initBuffers();
    }
    initBuffers() {
        this.vertices  = [0, 0, 0];
        this.normals   = [0, 1, 0];
        this.texCoords = [0.5, 0.5];
        this.indices   = [];

        for (let i = 0; i <= this.slices; i++) {
            const ang = (2 * Math.PI * i) / this.slices;
            this.vertices.push(Math.cos(ang), 0, Math.sin(ang));
            this.normals.push(0, 1, 0);
            this.texCoords.push(0.5 + 0.5 * Math.cos(ang), 0.5 + 0.5 * Math.sin(ang));
            if (i > 0) this.indices.push(0, i, i + 1);
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}

export class MyDepositZone extends CGFobject {
    constructor(scene) {
        super(scene);
        this.circle = new MyCircle(scene, 32);

        this.shader = new CGFshader(
            scene.gl,
            "shaders/deposit.vert",
            "shaders/deposit.frag"
        );
    }

    display(x, z, time, isActive) {
        this.shader.setUniformsValues({
            timeFactor: time,
            uActive: isActive ? 1.0 : 0.0
        });

        this.scene.gl.disable(this.scene.gl.CULL_FACE);
        this.scene.pushMatrix();
            this.scene.translate(x, 0.5, z);
            this.scene.scale(35, 1, 35);
            this.scene.setActiveShader(this.shader);
            this.circle.display();
            this.scene.setActiveShader(this.scene.defaultShader);
        this.scene.popMatrix();
        this.scene.gl.enable(this.scene.gl.CULL_FACE);
    }
}