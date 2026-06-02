import { CGFobject } from '../lib/CGF.js';

export class MySphere extends CGFobject {

    constructor(scene, slices, stacks, radius) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.radius = radius;
        this.initBuffers();
    }

    initBuffers() {

        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        for (let lat = 0; lat <= this.stacks; lat++) {

            let phi = Math.PI * lat / this.stacks;

            for (let lon = 0; lon <= this.slices; lon++) {

                let theta = 2 * Math.PI * lon / this.slices;

                let x = this.radius * Math.sin(phi) * Math.cos(theta);
                let y = this.radius * Math.cos(phi);
                let z = this.radius * Math.sin(phi) * Math.sin(theta);

                this.vertices.push(x, y, z);

                this.normals.push(
                    x / this.radius,
                    y / this.radius,
                    z / this.radius
                );

                this.texCoords.push(
                    lon / this.slices,
                    lat / this.stacks
                );
            }
        }
        
        for (let lat = 0; lat < this.stacks; lat++) {
            for (let lon = 0; lon < this.slices; lon++) {

                let first = lat * (this.slices + 1) + lon;
                let second = first + this.slices + 1;

                this.indices.push(first, first + 1, second);
                this.indices.push(second, first + 1, second + 1);
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}