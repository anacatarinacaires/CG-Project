import {CGFobject, CGFappearance} from '../lib/CGF.js';
/**
* MyBranch
* @constructor
* @param scene - Reference to MyScene object
* @param diameter - diameter of the cilinder
*/
export class MyBranch extends CGFobject {
    constructor(scene, textureBranch,radius, height) {
        super(scene);
        this.height = height;
        this.slices = 20;
        this.radius = radius;

        this.material = new CGFappearance(scene);
        this.material.setAmbient(1,1,1,1);
        this.material.setDiffuse(1,1,1,1);
        this.material.setSpecular(0,0,0,1);
        this.material.setTexture(textureBranch);
        this.material.setTextureWrap('REPEAT', 'REPEAT');

        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;

        for(var i = 0; i <= this.slices; i++){

            this.vertices.push(this.radius * Math.cos(ang), 0, -Math.sin(ang) * this.radius);
            this.vertices.push(this.radius * Math.cos(ang), this.height, -Math.sin(ang) * this.radius);
            this.normals.push(Math.cos(ang), 0, -Math.sin(ang));
            this.normals.push(Math.cos(ang), 0, -Math.sin(ang));

            if (i < this.slices){
                this.indices.push(2*i, 2*i+2, 2*i+1);
                this.indices.push(2*i+1, 2*i+2, 2*i+3);
            }
            ang+=alphaAng;
            
            this.texCoords.push(i / this.slices, 0);
            this.texCoords.push(i / this.slices, 1);
        }


        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}


