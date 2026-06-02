import {CGFobject,CGFappearance} from '../lib/CGF.js';
import { MyTriangle } from './MyTriangle.js';

/**
* MyLeaf
* @constructor
* @param scene - MyLeaf reference
* @param scale - scale of the leaf

*/

export class MyLeaf extends CGFobject {
	constructor(scene, textureLeaf, scale) {
		super(scene);
		this.height = scale;

		this.leafMaterial = new CGFappearance(scene);
		this.leafMaterial.setAmbient(1,1,1,1);
		this.leafMaterial.setDiffuse(1,1,1,1);
		this.leafMaterial.setTexture(textureLeaf);
		this.leafMaterial.setTextureWrap('REPEAT', 'REPEAT');

		this.leaf = new MyTriangle(scene);
	}

	display() {
        this.scene.pushMatrix();

        this.scene.scale(this.height, this.height, this.height);
        this.leafMaterial.apply();
		this.leaf.display();

        this.scene.popMatrix();
    }

	// initBuffers() {
	// 	var i;

	// 	this.vertices = [
	// 		0, 0, 0, 
	// 		0.5, 0.35, 0,
	// 		0, 1, 0,
	// 		-0.5, 0.35, 0
	// 	];

	// 	this.indices = [];
	// 	this.normals = [];
	// 	for (i=0; i<this.vertices.length/3; ++i){
	// 		this.vertices[i] = this.vertices[i] * this.height;
	// 		this.indices.push(i);
	// 		this.normals.push(0, 0, 1);
	// 	}
	// 	this.texCoords = [
	// 		0.5, 1.0,
	// 		1.0, 0.5,
	// 		0.5, 0.0,
	// 		0.0, 0.5,
	// 	];

	//    this.primitiveType = this.scene.gl.TRIANGLE_FAN;
	//    this.initGLBuffers();
	// }
}



/*
Essa classe deve definir na função initBuffers os 8 vértices do cubo,
e a conectividade entre eles de forma a formar os triângulos que constituem as faces
quadradas do cubo. Recomenda-se que sejam inseridos comentários identificando os
vértices e as faces que estão a ser definidas.

Cubo centrado na origem e de aresta unitária, ou
seja , com coordenadas entre (-0.5, -0.5, -0.5) e (0.5, 0.5, 0.5), construído com uma única
malha de triângulos.

Ordem da escolha dos indices tem de ser no sentido da mao direita!! sentido anti-horario

*/ 