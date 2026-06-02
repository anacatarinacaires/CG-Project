import { CGFobject, CGFshader, CGFtexture } from '../lib/CGF.js';
import { MyGrass } from './MyGrass.js';
import { MyUtils } from './MyUtils.js';

export class MyGrassSet extends CGFobject {
    constructor(scene, count, radius) {
        super(scene);
        this.scene = scene;
        this.instances = [];

        const utils = new MyUtils(radius);

        this.heightMapTexture = new CGFtexture(scene, "images/Heightmap.png");
        this.shader = new CGFshader(scene.gl, "shaders/grass.vert", "shaders/grass.frag");
        this.shader.setUniformsValues({
            timeFactor: 0,
            heightMapTexture: 3,
            uHeight: 30,
            uRadius: radius,
        });

        const grassColors = [
            [0.12, 0.20, 0.08], // Verde escuro
            [0.15, 0.24, 0.10], // Verde musgo natural
            [0.18, 0.28, 0.12], // Verde floresta baço
            [0.22, 0.28, 0.09], // Oliva escuro
            [0.30, 0.34, 0.12], // Verde amarelado
            [0.36, 0.39, 0.14], 
            [0.32, 0.30, 0.11], // Acastanhado escuro
        
        ];

        for (let i = 0; i < count * 3.5; i++) {
            const x = (Math.random() * 2 - 1) * radius;
            const z = (Math.random() * 2 - 1) * radius;
            
            const shape = utils.getShape(x, z);
            const dist = utils.distanceToRoad(x, z);


            if (dist < 19 || dist > 155) continue;
            if (Math.random() < (dist - 19) / 121.0) continue;

            this.instances.push({
                grass: new MyGrass(scene, grassColors[Math.floor(Math.random() * grassColors.length)]),
                x, z,
                scale: 1.7 + Math.random() * 0.5,
                rot: (Math.random() - 0.5) * 1.2,
            });
        }
    }

    update(t) {
        this.shader.setUniformsValues({ timeFactor: t / 1500 % 100 });
    }

    display() {
        this.scene.setActiveShader(this.shader);
        this.heightMapTexture.bind(3);

        for (const { grass, x, z, scale, rot } of this.instances) {
            this.shader.setUniformsValues({
                uColor:   [grass.color[0], grass.color[1], grass.color[2], 1.0],
                uBasePos: [x, z],
                uScale: scale
            });
            this.scene.pushMatrix();
            this.scene.translate(x, 0, z);
            this.scene.rotate(rot, 0, 1, 0);
            this.scene.scale(scale, scale, scale);
            grass.display();
            this.scene.popMatrix();
        }

        this.scene.setActiveShader(this.scene.defaultShader);
    }  
}