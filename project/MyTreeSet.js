import { CGFobject, CGFtexture, CGFshader } from '../lib/CGF.js';
import { MyPineTree } from './MyPineTree.js';
import { MyUtils } from './MyUtils.js';

export class MyTreeSet extends CGFobject {
    constructor(scene, count, radius) {
        super(scene);
        this.scene = scene;
        this.instances = [];

        const utils = new MyUtils(radius);

        this.heightMapTexture = new CGFtexture(scene, "images/Heightmap.png");

        this.shader = new CGFshader(scene.gl, "shaders/flower.vert", "shaders/flower.frag");
        this.shader.setUniformsValues({
            uSampler: 0,
            timeFactor: 0,
            heightMapTexture: 3,
            uHeight: 4.3,
            uRadius: radius,
        });

        const branchTexture = new CGFtexture(scene, "images/pine_wood.jpg");
        const leafTexture = new CGFtexture(scene, "images/pinetree_leaves.jpg");


        for (let i = 0; i < count * 2; i++) {
            const angle = Math.random() * Math.PI * 2;
            const distCenter = Math.sqrt(Math.random()) * radius;
            const x = Math.cos(angle) * distCenter;
            const z = Math.sin(angle) * distCenter;

            if(z < -150)continue;
            if (utils.distanceToRoad(x, z) < 40 || utils.distanceToRoad(x, z) > 100) continue;

            this.instances.push({
                tree: new MyPineTree(scene, leafTexture, branchTexture),
                x, z,
                rotY: Math.random() * Math.PI * 2,
                scale: 4.0 + Math.random() * 3.0, 
            });
        }
    }


    display() {
    this.heightMapTexture.bind(3);

    for (const { tree, x, z, rotY, scale } of this.instances) {
        this.scene.pushMatrix();
        this.scene.translate(x, 0, z);
        this.scene.rotate(rotY, 0, 1, 0);
        this.scene.scale(scale, scale, scale);
        tree.display();
        this.scene.popMatrix();
    }
}
}
