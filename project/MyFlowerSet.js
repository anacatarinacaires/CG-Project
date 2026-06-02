import { CGFobject, CGFtexture, CGFshader } from '../lib/CGF.js';
import { MyLSPlant } from './MyLSPlant.js';
import { MyUtils } from './MyUtils.js';

export class MyFlowerSet extends CGFobject {
    constructor(scene, count, radius) {
        super(scene);
        this.scene = scene;
        this.instances = [];

        const utils = new MyUtils(radius);

        this.heightMapTexture = new CGFtexture(scene, "images/Heightmap.png");

        this.shader = new CGFshader(scene.gl, "shaders/flower.vert", "shaders/flower.frag");
        this.shader.setUniformsValues({
            uSampler:0,
            timeFactor:0,
            heightMapTexture: 3,
            uHeight:30,
            uRadius:radius,
        });

        const petalTextures = [
            new CGFtexture(scene, "images/petal_pink.jpg"),
            new CGFtexture(scene, "images/petal_white.jpg"),
            new CGFtexture(scene, "images/petal_red.jpg"),
        ];

        const textureBranch = new CGFtexture(scene, "images/dark_grass.jpg");
        const textureLeaf   = new CGFtexture(scene, "images/dark_grass.jpg");

        for (let i = 0; i < count * 3; i++) {
            const x = (Math.random() * 2 - 1) * radius;
            const z = (Math.random() * 2 - 1) * radius;
            
            const shape = utils.getShape(x, z);
            const dist = utils.distanceToRoad(x, z);
            

            if (dist < 19 || dist > 155) continue;
            if (Math.random() < (dist - 19) / 121.0) continue;

            this.instances.push({
                plant: new MyLSPlant(
                    scene,
                    petalTextures[Math.floor(Math.random() * petalTextures.length)],
                    textureBranch,
                    textureLeaf,
                    2.1 + Math.random() * 0.8
                ),
                x, z,
                rotY: Math.random() * Math.PI * 2,
            });
        }
    }

    update(t) {
        this.shader.setUniformsValues({ timeFactor: t / 1500 % 100 });
    }

    display() {
        this.scene.setActiveShader(this.shader);
        this.heightMapTexture.bind(3);

        for (const { plant, x, z, rotY } of this.instances) {
            this.shader.setUniformsValues({ uBasePos: [x, z] });
            this.scene.pushMatrix();
            this.scene.translate(x, 0, z);
            this.scene.rotate(rotY, 0, 1, 0);
            plant.display();
            this.scene.popMatrix();
        }

        this.scene.setActiveShader(this.scene.defaultShader);
    }
}