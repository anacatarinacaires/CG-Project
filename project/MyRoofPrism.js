import { CGFobject } from '../lib/CGF.js';

export class MyRoofPrism extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }

    initBuffers() {
    this.vertices = [
        -0.5, 0, 0,   
         0.5, 0, 0,   
         0,   1, 0,   

        -0.5, 0, 1,   
         0.5, 0, 1,   
         0,   1, 1,   
        
        -0.5, 0, 0,   
        -0.5, 0, 1,   
         0,   1, 0,   
         0,   1, 1,   
        
         0.5, 0, 0,   
         0.5, 0, 1,   
         0,   1, 0,   
         0,   1, 1,   
    ];

    this.indices = [
        0, 2, 1,            // front
        3, 4, 5,            // back
        6, 7, 9,  6, 9, 8,  // left
        10, 12, 11,  11, 12, 13, // right
    ];

    this.normals = [
        0,0,-1,  0,0,-1,  0,0,-1,
        0,0, 1,  0,0, 1,  0,0, 1,
        -1,1,0,  -1,1,0,  -1,1,0,  -1,1,0,
         1,1,0,   1,1,0,   1,1,0,   1,1,0,
    ];

    this.texCoords = [
        0,1,  1,1,  0.5,0,
        0,1,  1,1,  0.5,0,
        0,1,  1,1,  0,0,  1,0,
        0,1,  1,1,  0,0,  1,0,
    ];

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
}
}