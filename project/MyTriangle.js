import { CGFobject } from '../lib/CGF.js';

export class MyTriangle extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [
            -0.05, 0, 0,
             0.05, 0, 0,
             0.05, 0.6, 0,

            -0.05, 0, 0,
             0.05, 0, 0,
             0.05, 0.6, 0,
        ];

        this.indices = [
            0, 1, 2,
            0, 2, 3,

            4, 6, 5,
            4, 7, 6
        ];

        this.normals = [
            0,0,1,
            0,0,1,
            0,0,1,
            0,0,1,

            0,0,-1,
            0,0,-1,
            0,0,-1,
            0,0,-1
        ];

        this.texCoords = [
            0,1,
            1,1,
            1,0,
            0,0,

            0,1,
            1,1,
            1,0,
            0,0
        ];

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}