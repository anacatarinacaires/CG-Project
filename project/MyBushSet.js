import { CGFobject, CGFtexture, CGFshader } from '../lib/CGF.js';
import { MyBush } from './MyBush.js';
import { MyUtils } from './MyUtils.js';

export class MyBushSet extends CGFobject {
    constructor(scene, count, radius) {
        super(scene);
        this.scene = scene;
        this.instances = [];

        const utils = new MyUtils(radius);
        const leafTexture = new CGFtexture(scene, "images/bush.jpg");

        this.heightMapTexture = new CGFtexture(scene, "images/Heightmap.png");
        this.shader = new CGFshader(scene.gl, "shaders/flower.vert", "shaders/flower.frag");
        this.shader.setUniformsValues({
            uSampler: 0,
            timeFactor: 0,
            heightMapTexture: 3,
            uHeight: 4.3,
            uRadius: radius,
        });

        for (let i = 0; i < count * 2; i++) {
            const angle = Math.random() * Math.PI * 2;
            const distCenter = Math.sqrt(Math.random()) * radius;
            const x = Math.cos(angle) * distCenter;
            const z = Math.sin(angle) * distCenter;
            const shape = utils.getShape(x, z);

            if (utils.distanceToRoad(x, z) < 19) continue;
            if (shape > 0.55)                    continue;
            if (Math.random() > (1.0 - shape))    continue;
            if (z < -160)                         continue;

            this.instances.push({
                bush: new MyBush(scene, leafTexture),
                x, z,
                rotY: Math.random() * Math.PI * 2,
                scale: 3.0 + Math.random() * 2.0, 
            });
        }
    }

    update(t) {
        
    }

    display() {
    for (const { bush, x, z, rotY, scale } of this.instances) {
        this.scene.pushMatrix();
        this.scene.translate(x, -1, z); 
        this.scene.rotate(rotY, 0, 1, 0);
        this.scene.scale(scale, scale, scale);
        bush.display();
        this.scene.popMatrix();
    }
}
}