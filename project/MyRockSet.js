import { CGFobject, CGFtexture, CGFshader } from '../lib/CGF.js';
import { MyRock } from './MyRock.js';
import { MyUtils } from './MyUtils.js';

export class MyRockSet extends CGFobject {
    constructor(scene, count, radius) {
        super(scene);

        const utils = new MyUtils(radius);

        this.heightMapTexture = new CGFtexture(scene, "images/Heightmap.png");
        this.shader = new CGFshader(scene.gl, "shaders/rock.vert", "shaders/rock.frag");
        this.shader.setUniformsValues({
            heightMapTexture: 3,
            uHeight: 30,
            uRadius: radius,
        });

        const textures = [
            new CGFtexture(scene, "images/rock1.jpg"),
            new CGFtexture(scene, "images/rock2.jpg"),
            new CGFtexture(scene, "images/rock3.jpg"),
            new CGFtexture(scene, "images/rock4.jpg"),
        ];

        this.instances = [];
        let big = 0, medium = 0, small = 0;

        while (this.instances.length < count) {
            const x = (Math.random() * 2 - 1) * radius;
            const z = (Math.random() * 2 - 1) * radius;
            const dist = utils.distanceToRoad(x, z);
            const shape = utils.getShape(x, z);

            if (shape > 0.80) continue;

            const tex = textures[Math.floor(Math.random() * textures.length)];

            if (dist > 80 && dist < radius && big < count * 0.03) {
                this.instances.push({ 
                    rock: new MyRock(scene, tex, Math.random()*100, 1.2+Math.random()*0.6, 15, 15, 1.8+Math.random()*1.0), 
                    x, z, rotY: Math.random()*Math.PI*2 });
                big++;
            } else if (dist > 30 && dist < radius && medium < count * 0.17) {
                this.instances.push({ 
                    rock: new MyRock(scene, tex, Math.random()*100, 0.8+Math.random()*0.5, 10, 10, 1.3+Math.random()*1.0), 
                    x, z, rotY: Math.random()*Math.PI*2 });
                medium++;
            } else if (dist < 40 && dist > 16 && small < count * 0.80) {
                this.instances.push({ 
                    rock: new MyRock(scene, tex, Math.random()*120, 0.3+Math.random()*0.3, 10, 10, 0.6+Math.random()*0.3), 
                    x, z, rotY: Math.random()*Math.PI*2 });
                small++;
            }
        }
    }

    display() {
        this.scene.setActiveShader(this.shader);
        this.heightMapTexture.bind(3);

        this.instances.forEach(({ rock, x, z, rotY }) => {
            this.shader.setUniformsValues({ uBasePos: [x, z] });
            this.scene.pushMatrix();
            this.scene.translate(x, 0, z);
            this.scene.rotate(rotY, 0, 1, 0);
            rock.display(this.shader);
            this.scene.popMatrix();
        });

        this.scene.setActiveShader(this.scene.defaultShader);
    }
}