import {CGFappearance, CGFobject, CGFtexture, CGFshader} from '../lib/CGF.js';
import {MyHalfSphere} from './MyHalfSphere.js';

export class MySky extends CGFobject {
    constructor(scene,radius) {
        super(scene);

        this.skyTexture = new CGFtexture(scene, "images/clean_blue_sky.jpg");
        this.blueSkyMaterial = new CGFappearance(scene);
        this.blueSkyMaterial.setTexture(this.skyTexture);
        this.blueSkyMaterial.setTextureWrap('REPEAT', 'REPEAT');

        this.cloudTexture = new CGFtexture(scene, "images/clouds2322.png");
        this.cloudMaterial = new CGFappearance(scene);
        this.cloudMaterial.setTexture(this.cloudTexture);
        this.cloudMaterial.setTextureWrap('REPEAT', 'REPEAT');

        this.skyShader = new CGFshader(scene.gl, "shaders/sky.vert", "shaders/sky.frag");
        this.skyShader.setUniformsValues({ skyTexture: 0, cloudTexture: 1, timeFactor: 1});

        this.halfSphere = new MyHalfSphere(scene, 70, 70, radius);
        
    }

    update(t) {
        this.skyShader.setUniformsValues({timeFactor: t / 100 % 10000 });
    }
    

    display(){
        
        this.scene.setActiveShader(this.skyShader);
        this.scene.pushMatrix();

        this.skyTexture.bind(0);
        this.cloudTexture.bind(1);

        this.halfSphere.display();

       
        this.scene.setActiveShader(this.scene.defaultShader);
        this.scene.popMatrix();
    }


}