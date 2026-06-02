import { CGFobject } from '../lib/CGF.js';

export class MyQuad extends CGFobject {

    constructor(scene, width = 1, height = 1, thickness = 0.1) {
        super(scene);

        const w = width / 2;
        const h = height / 2;
        const t = thickness / 2;

        this.vertices = [];
        this.indices = [];
        this.normals = [];

        let v = 0;

        const addFaceIndices = (base) => {
            this.indices.push(
                base, base + 1, base + 2,
                base + 2, base + 1, base + 3
            );
        };

        this.vertices.push(
            -w, -h,  t,
             w, -h,  t,
            -w,  h,  t,
             w,  h,  t
        );
        this.normals.push(0, 0, 1,  0, 0, 1,  0, 0, 1,  0, 0, 1);
        addFaceIndices(v);
        v += 4;

        this.vertices.push(
             w, -h, -t,
            -w, -h, -t,
             w,  h, -t,
            -w,  h, -t
        );
        this.normals.push(0, 0, -1,  0, 0, -1,  0, 0, -1,  0, 0, -1);
        addFaceIndices(v);
        v += 4;

        this.vertices.push(
            -w, -h, -t,
            -w, -h,  t,
            -w,  h, -t,
            -w,  h,  t
        );
        this.normals.push(-1, 0, 0,  -1, 0, 0,  -1, 0, 0,  -1, 0, 0);
        addFaceIndices(v);
        v += 4;

        this.vertices.push(
             w, -h,  t,
             w, -h, -t,
             w,  h,  t,
             w,  h, -t
        );
        this.normals.push(1, 0, 0,  1, 0, 0,  1, 0, 0,  1, 0, 0);
        addFaceIndices(v);
        v += 4;

        this.vertices.push(
            -w,  h,  t,
             w,  h,  t,
            -w,  h, -t,
             w,  h, -t
        );
        this.normals.push(0, 1, 0,  0, 1, 0,  0, 1, 0,  0, 1, 0);
        addFaceIndices(v);
        v += 4;

        this.vertices.push(
            -w, -h, -t,
             w, -h, -t,
            -w, -h,  t,
             w, -h,  t
        );
        this.normals.push(0, -1, 0,  0, -1, 0,  0, -1, 0,  0, -1, 0);
        addFaceIndices(v);
        v += 4;

        this.texCoords = [];
        for (let i = 0; i < 6; i++) {
            this.texCoords.push(
                0, 1,
                1, 1,
                0, 0,
                1, 0
            );
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}