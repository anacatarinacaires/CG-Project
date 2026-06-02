import { CGFobject } from '../lib/CGF.js';

export class MyCilinder extends CGFobject {
    constructor(scene, slices, stacks, height, scale, isHalf = false, thickness = 0) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.height = height;
        this.scale = scale;
        this.isHalf = isHalf; 
        this.thickness = thickness;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        const maxAng = this.isHalf ? Math.PI : 2 * Math.PI;
        const alphaAng = maxAng / this.slices;
        const stackHeight = 1.0 / this.stacks;
        const vertsPerRow = this.slices + 1;

        const rOut = 1.0;
        const rIn = Math.max(0, 1.0 - this.thickness); 

        for (let stack = 0; stack <= this.stacks; stack++) {
            const z = stack * stackHeight;
            for (let slice = 0; slice <= this.slices; slice++) {
                const ang = slice * alphaAng;
                this.vertices.push(rOut * Math.cos(ang), rOut * Math.sin(ang), z);
                this.normals.push(Math.cos(ang), Math.sin(ang), 0);
                this.texCoords.push(slice / this.slices, stack / this.stacks);
            }
        }

        const interiorOffset = (this.stacks + 1) * vertsPerRow;

        for (let stack = 0; stack <= this.stacks; stack++) {
            const z = stack * stackHeight;
            for (let slice = 0; slice <= this.slices; slice++) {
                const ang = slice * alphaAng;
                this.vertices.push(rIn * Math.cos(ang), rIn * Math.sin(ang), z);
                this.normals.push(-Math.cos(ang), -Math.sin(ang), 0); 
                this.texCoords.push(slice / this.slices, stack / this.stacks);
            }
        }

        for (let stack = 0; stack < this.stacks; stack++) {
            for (let slice = 0; slice < this.slices; slice++) {
                const current = stack * vertsPerRow + slice;
                const next    = current + vertsPerRow;
                this.indices.push(
                    current,     current + 1, next,
                    current + 1, next + 1,    next
                );
            }
        }

        for (let stack = 0; stack < this.stacks; stack++) {
            for (let slice = 0; slice < this.slices; slice++) {
                const current = interiorOffset + stack * vertsPerRow + slice;
                const next    = current + vertsPerRow;
                this.indices.push(
                    next,     current + 1, current,
                    next,     next + 1,    current + 1
                );
            }
        }

        if (this.thickness > 0) {
            let vBase;

            vBase = this.vertices.length / 3;
            for(let slice = 0; slice <= this.slices; slice++) {
                const ang = slice * alphaAng;
                const cosA = Math.cos(ang);
                const sinA = Math.sin(ang);

                this.vertices.push(rOut * cosA, rOut * sinA, 1.0);
                this.normals.push(0, 0, 1);
                this.texCoords.push(slice / this.slices, 1);

                this.vertices.push(rIn * cosA, rIn * sinA, 1.0);
                this.normals.push(0, 0, 1);
                this.texCoords.push(slice / this.slices, 0);

                if (slice > 0) {
                    const currOut = vBase + slice * 2;
                    const currIn = currOut + 1;
                    const prevOut = currOut - 2;
                    const prevIn = currOut - 1;
                    this.indices.push(prevOut, currOut, currIn, prevOut, currIn, prevIn);
                }
            }

            vBase = this.vertices.length / 3;
            for(let slice = 0; slice <= this.slices; slice++) {
                const ang = slice * alphaAng;
                const cosA = Math.cos(ang);
                const sinA = Math.sin(ang);

                this.vertices.push(rOut * cosA, rOut * sinA, 0.0);
                this.normals.push(0, 0, -1);
                this.texCoords.push(slice / this.slices, 1);

                this.vertices.push(rIn * cosA, rIn * sinA, 0.0);
                this.normals.push(0, 0, -1);
                this.texCoords.push(slice / this.slices, 0);

                if (slice > 0) {
                    const currOut = vBase + slice * 2;
                    const currIn = currOut + 1;
                    const prevOut = currOut - 2;
                    const prevIn = currOut - 1;
                    this.indices.push(prevIn, currIn, currOut, prevIn, currOut, prevOut);
                }
            }

            if (this.isHalf) {
                vBase = this.vertices.length / 3;
                for (let stack = 0; stack <= this.stacks; stack++) {
                    const z = stack * stackHeight;

                    this.vertices.push(rOut, 0, z);
                    this.normals.push(0, -1, 0);
                    this.texCoords.push(stack / this.stacks, 1);

                    this.vertices.push(rIn, 0, z);
                    this.normals.push(0, -1, 0);
                    this.texCoords.push(stack / this.stacks, 0);

                    if (stack > 0) {
                        const currOut = vBase + stack * 2;
                        const currIn = currOut + 1;
                        const prevOut = currOut - 2;
                        const prevIn = currOut - 1;
                        this.indices.push(prevIn, prevOut, currOut, prevIn, currOut, currIn);
                    }
                }

                vBase = this.vertices.length / 3;
                for (let stack = 0; stack <= this.stacks; stack++) {
                    const z = stack * stackHeight;

                    this.vertices.push(-rOut, 0, z);
                    this.normals.push(0, -1, 0); 
                    this.texCoords.push(stack / this.stacks, 1);

                    this.vertices.push(-rIn, 0, z);
                    this.normals.push(0, -1, 0); 
                    this.texCoords.push(stack / this.stacks, 0);

                    if (stack > 0) {
                        const currOut = vBase + stack * 2;
                        const currIn = currOut + 1;
                        const prevOut = currOut - 2;
                        const prevIn = currOut - 1;
                        this.indices.push(prevOut, prevIn, currIn, prevOut, currIn, currOut);
                    }
                }
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    display() {
        this.scene.pushMatrix();
            this.scene.rotate(-Math.PI / 2, 1, 0, 0);
            this.scene.scale(this.scale, this.scale, this.height);
            super.display();
        this.scene.popMatrix();
    }
}