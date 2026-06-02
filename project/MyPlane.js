import { CGFobject } from '../lib/CGF.js';

export class MyPlane extends CGFobject {
	constructor(scene, size, nrDivs, minS, maxS, minT, maxT) {
		super(scene);

		this.nrDivs = (nrDivs !== undefined) ? nrDivs : 1;
		this.size = size || 1;

		this.patchLength = this.size / this.nrDivs;

		this.minS = minS || 0;
		this.maxS = maxS || 1;
		this.minT = minT || 0;
		this.maxT = maxT || 1;

		this.q = (this.maxS - this.minS) / this.nrDivs;
		this.w = (this.maxT - this.minT) / this.nrDivs;

		this.initBuffers();
	}

	initBuffers() {
		this.vertices = [];
		this.normals = [];
		this.texCoords = [];
		this.indices = [];

		const half = this.size / 2;

		let yCoord = half;

		// Vértices, normais e texCoords
		for (let j = 0; j <= this.nrDivs; j++) {
			let xCoord = -half;

			for (let i = 0; i <= this.nrDivs; i++) {
				this.vertices.push(xCoord, yCoord, 0);
				this.normals.push(0, 0, 1);
				this.texCoords.push(
					this.minS + i * this.q,
					this.minT + j * this.w
				);

				xCoord += this.patchLength;
			}
			yCoord -= this.patchLength;
		}

		// Índices (triangle strip)
		let ind = 0;
		for (let j = 0; j < this.nrDivs; j++) {
			for (let i = 0; i <= this.nrDivs; i++) {
				this.indices.push(ind);
				this.indices.push(ind + this.nrDivs + 1);
				ind++;
			}
			if (j + 1 < this.nrDivs) {
				this.indices.push(ind + this.nrDivs);
				this.indices.push(ind);
			}
		}

		this.primitiveType = this.scene.gl.TRIANGLE_STRIP;
		this.initGLBuffers();
	}

	setFillMode() {
		this.primitiveType = this.scene.gl.TRIANGLE_STRIP;
	}

	setLineMode() {
		this.primitiveType = this.scene.gl.LINES;
	}
}