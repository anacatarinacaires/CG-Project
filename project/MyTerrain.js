import { CGFappearance, CGFobject, CGFtexture, CGFshader } from '../lib/CGF.js';
import { MyPlane } from './MyPlane.js';
import { MyUtils } from './MyUtils.js';

export class MyTerrain extends CGFobject {
    constructor(scene, radius) {
        super(scene);

        const utils = new MyUtils(radius);

        this.heightMapTexture = new CGFtexture(scene, "images/Heightmap.png");
        this.terrainTexture= new CGFtexture(scene, "images/terrain.jpg");
        this.dirtTexture= new CGFtexture(scene, "images/soil7.jpg");

        this.terrainShader = new CGFshader(scene.gl, "shaders/terrain.vert", "shaders/terrain.frag");
        this.terrainShader.setUniformsValues({terrainTexture: 0,dirtTexture:1,heightMapTexture: 2, uHeight:30,
            roadWidth: utils.roadWidth,roadFreq1: utils.roadFreq1,roadAmp1:  utils.roadAmp1,roadFreq2: utils.roadFreq2, roadAmp2:  utils.roadAmp2,
        });

        this.terrain = new MyPlane(scene, radius * 2, 50);
    }

    display() {
        this.scene.pushMatrix();

        this.scene.rotate(-Math.PI / 2, 1.0, 0.0, 0.0);
        this.scene.setActiveShader(this.terrainShader);
        this.terrainTexture.bind(0);
        this.dirtTexture.bind(1);
        this.heightMapTexture.bind(2);

        this.terrain.display();

        this.scene.popMatrix();

        this.scene.setActiveShader(this.scene.defaultShader);
    }
}