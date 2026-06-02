import { CGFobject, CGFshader } from '../lib/CGF.js';

class MyArrowQuad extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }
    initBuffers() {
    this.vertices  = [
        0, 0, 0,   // 0 - baixo esquerdo
        1, 0, 0,   // 1 - baixo direito
        0, 1, 0,   // 2 - cima esquerdo
        1, 1, 0,   // 3 - cima direito
    ];
    this.indices   = [0, 1, 2,  1, 3, 2];
    this.normals   = [0,0,1,  0,0,1,  0,0,1,  0,0,1];
    this.texCoords = [
        0, 0,   // 0
        1, 0,   // 1
        0, 1,   // 2
        1, 1,   // 3
    ];
    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
}
}

export class MyArrow extends CGFobject {
    constructor(scene) {
        super(scene);
        this.quad = new MyArrowQuad(scene);

        this.shader = new CGFshader(
            scene.gl,
            "shaders/arrow.vert",
            "shaders/arrow.frag"
        );
    }

    display(x, y, z, timeFactor) {
        this.shader.setUniformsValues({ timeFactor: timeFactor });

        this.scene.gl.disable(this.scene.gl.CULL_FACE);
        this.scene.pushMatrix();
            this.scene.translate(x, y, z);
            this.scene.scale(4, 4, 4); 
            this.scene.setActiveShader(this.shader);
            this.quad.display();
            this.scene.setActiveShader(this.scene.defaultShader);
        this.scene.popMatrix();
        this.scene.gl.enable(this.scene.gl.CULL_FACE);
    }
}
