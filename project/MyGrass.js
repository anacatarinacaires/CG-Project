import { CGFobject, CGFappearance } from '../lib/CGF.js';

export class MyGrass extends CGFobject {
    constructor(scene, color) { 
        super(scene);
        this.color = color;

        this.grassMaterial = new CGFappearance(scene);
        this.grassMaterial.setAmbient(color[0], color[1], color[2], 1);
        this.grassMaterial.setDiffuse(color[0], color[1], color[2], 1);
        this.grassMaterial.setSpecular(0.05, 0.05, 0.05, 1);
        this.grassMaterial.setShininess(5);

        this.initBuffers(); 
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        let indexOffset = 0;

        const baseVerts = [
            [-0.05, 0, 0], 
            [ 0.05, 0, 0], 
            [ 0.0,  1, 0]  
        ];

        for (let i = 0; i < 30; i++) {
            const localX = (Math.random() - 0.5) * 2.5; 
            const localZ = (Math.random() - 0.5) * 2.5; 
            const localS = 0.7 + Math.random() * 0.5;    
            const localRot = (Math.random() - 0.5) * 2.0;

            const shade = 0.7 + Math.random() * 0.5;

            const cosR = Math.cos(localRot);
            const sinR = Math.sin(localRot);
            
            const nx = 0 * cosR - 1 * sinR;
            const nz = 0 * sinR + 1 * cosR;

            //front
            for (let v = 0; v < 3; v++) {
                let x = baseVerts[v][0] * localS;
                let y = baseVerts[v][1] * localS;
                let z = baseVerts[v][2] * localS;

                let finalX = (x * cosR - z * sinR) + localX;
                let finalZ = (x * sinR + z * cosR) + localZ;

                this.vertices.push(finalX, y, finalZ);
                this.normals.push(nx, 0, nz);
                
                this.texCoords.push(shade, 0.0);
            }
            this.indices.push(indexOffset, indexOffset + 1, indexOffset + 2);
            indexOffset += 3;

            //back
            for (let v = 0; v < 3; v++) {
                let x = baseVerts[v][0] * localS;
                let y = baseVerts[v][1] * localS;
                let z = baseVerts[v][2] * localS;

                let finalX = (x * cosR - z * sinR) + localX;
                let finalZ = (x * sinR + z * cosR) + localZ;

                this.vertices.push(finalX, y, finalZ);
                this.normals.push(-nx, 0, -nz); 
                
                this.texCoords.push(shade, 0.0);
            }
            this.indices.push(indexOffset, indexOffset + 2, indexOffset + 1);
            indexOffset += 3;
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    display() {
        this.grassMaterial.apply();
        super.display();
    }
}