import { CGFobject } from '../lib/CGF.js';

/**
 * MyPetal
 */

export class MyPetal extends CGFobject {

	constructor(scene, scale) {
		super(scene);
		this.scale = scale;
		this.initBuffers();
	}

	setDefaultAppearance() {

        this.scene.setAmbient(1.0, 0.4, 0.7, 1.0);
        this.scene.setDiffuse(1.0, 0.4, 0.7, 1.0);
		this.scene.setSpecular(1.0, 1.0, 1.0, 1.0);
		this.scene.setShininess(10.0);
    }

	initBuffers() {

		this.vertices = [
			0.0, 0.0, 0.0,
			0.22, 0.18, 0.0,
			0.18, 0.55, 0.0,
			0.0, 1.0, 0.0,
			-0.18, 0.55, 0.0,
			-0.22, 0.18, 0.0,

			0.0, 0.0, 0.0,
			0.22, 0.18, 0.0,
			0.18, 0.55, 0.0,
			0.0, 1.0, 0.0,
			-0.18, 0.55, 0.0,
			-0.22, 0.18, 0.0
		];

		for (let i = 0; i < this.vertices.length; i++) {
			this.vertices[i] *= this.scale;
		}

		this.indices = [

            0, 1, 2,
            0, 2, 3,
            0, 3, 4,
            0, 4, 5,

			6, 8, 7,
			6, 9, 8,
			6, 10, 9,
			6, 11, 10
        ];

		this.normals = [
			    0, 0, 1,
				0, 0, 1,
				0, 0, 1,
				0, 0, 1,
				0, 0, 1,
				0, 0, 1,

				// trás
				0, 0, -1,
				0, 0, -1,
				0, 0, -1,
				0, 0, -1,
				0, 0, -1,
				0, 0, -1
		];

	

		this.texCoords = [

			0.5, 1.0,
			1.0, 0.8,
			0.9, 0.4,
			0.5, 0.0,
			0.1, 0.4,
			0.0, 0.8,
			
			0.5, 1.0,
            1.0, 0.8,
            0.9, 0.4,
            0.5, 0.0,
            0.1, 0.4,
            0.0, 0.8
		];

		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}