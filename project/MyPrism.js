import { CGFobject } from '../lib/CGF.js';

export class MyPrism extends CGFobject {
    constructor(scene, slices, stacks, scale, height, innerRadius = null, outerRadius = null) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.height = height;
        this.scale = scale;
        this.innerRadius = innerRadius;
        this.outerRadius = outerRadius;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];

        const alphaAng = (2 * Math.PI) / this.slices;
        const stackHeight = this.height / this.stacks;

        let vertexIndex = 0;

        for (let stack = 0; stack < this.stacks; stack++) {
            const zBottom = stack * stackHeight;
            const zTop = (stack + 1) * stackHeight;

            for (let slice = 0; slice < this.slices; slice++) {
                const ang1 = slice * alphaAng;
                const ang2 = (slice + 1) * alphaAng;
                const angMid = (ang1 + ang2) / 2.0;

                const x1 = Math.cos(ang1), y1 = Math.sin(ang1);
                const x2 = Math.cos(ang2), y2 = Math.sin(ang2);

                this.vertices.push(
                    x1, y1, zBottom,
                    x2, y2, zBottom,
                    x1, y1, zTop,
                    x2, y2, zTop
                );

                const nx = Math.cos(angMid);
                const ny = Math.sin(angMid);

                this.normals.push(
                    nx, ny, 0,
                    nx, ny, 0,
                    nx, ny, 0,
                    nx, ny, 0
                );

                this.indices.push(
                    vertexIndex,     vertexIndex + 1, vertexIndex + 2,
                    vertexIndex + 1, vertexIndex + 3, vertexIndex + 2
                );

                this.indices.push(
                    vertexIndex + 2, vertexIndex + 1, vertexIndex,
                    vertexIndex + 2, vertexIndex + 3, vertexIndex + 1
                );

                vertexIndex += 4;
            }
        }

        if (this.innerRadius !== null && this.outerRadius !== null) {
            const innerRadius = this.innerRadius;
            const outerRadius = this.outerRadius;

            const zLevels = [0, this.height];
            const normals_z = [-1, 1];

            for (let t = 0; t < 2; t++) {
                const z = zLevels[t];
                const nz = normals_z[t];

                for (let slice = 0; slice < this.slices; slice++) {
                    const ang1 = slice * alphaAng;
                    const ang2 = (slice + 1) * alphaAng;

                    const x1i = innerRadius * Math.cos(ang1), y1i = innerRadius * Math.sin(ang1);
                    const x2i = innerRadius * Math.cos(ang2), y2i = innerRadius * Math.sin(ang2);
                    const x1o = outerRadius * Math.cos(ang1), y1o = outerRadius * Math.sin(ang1);
                    const x2o = outerRadius * Math.cos(ang2), y2o = outerRadius * Math.sin(ang2);

                    this.vertices.push(
                        x1i, y1i, z,
                        x1o, y1o, z,
                        x2i, y2i, z,
                        x2o, y2o, z
                    );
                    this.normals.push(
                        0, 0, nz,
                        0, 0, nz,
                        0, 0, nz,
                        0, 0, nz
                    );

                    if (nz === -1) {
                        this.indices.push(vertexIndex, vertexIndex + 2, vertexIndex + 1);
                        this.indices.push(vertexIndex + 1, vertexIndex + 2, vertexIndex + 3);
                    } else {
                        this.indices.push(vertexIndex, vertexIndex + 1, vertexIndex + 2);
                        this.indices.push(vertexIndex + 1, vertexIndex + 3, vertexIndex + 2);
                    }

                    vertexIndex += 4;
                }

                this.texCoords = [];
                for (let i = 0; i < 6; i++) {
                    this.texCoords.push(0, 1, 1, 1, 0, 0, 1, 0);
                }
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    display() {
        this.scene.pushMatrix();
            this.scene.rotate(-Math.PI / 2, 1, 0, 0);
            this.scene.scale(this.height, this.height, this.scale);
            super.display();
        this.scene.popMatrix();
    }
}