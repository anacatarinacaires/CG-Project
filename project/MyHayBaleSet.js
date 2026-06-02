import { CGFobject } from '../lib/CGF.js';
import { MyHayBale } from './MyHayBale.js';
import { MyUtils } from './MyUtils.js';

export class MyHayBaleSet extends CGFobject {
    constructor(scene, count, radius) {
        super(scene);

        const utils = new MyUtils(radius);
        this.instances = [];

        let minNrBales = 5;

        for (let i = 0; i < 1000; i++) {
            const x = (Math.random() * 2 - 1) * radius;
            const z = (Math.random() * 2 - 1) * radius;
            
            const dist = utils.distanceToRoad(x, z);
         
            if (z>130 || z < -180) continue;
            if (dist > 16) continue;

            let baleTooClose = false;
            for (let bale of this.instances) {
                if (Math.hypot(x - bale.x, z - bale.z) < 40) {
                    baleTooClose = true;
                    break;
                }
            }
            if (baleTooClose) continue;

            this.instances.push({
                haybale: new MyHayBale(
                    scene,
                ),
                x, z,
                rotY: Math.random() * Math.PI * 2,
                active:true
            });

            if(this.instances.length >= minNrBales){
                break;
            }
        }
    }

    display() {
        for (const { haybale, x, z, rotY,active } of this.instances) {
            if (active) {
                this.scene.pushMatrix();
                    this.scene.translate(x, 3.5, z); 
                    this.scene.rotate(rotY, 0, 1, 0);
                    haybale.display();
                this.scene.popMatrix();
            }
        }
    }
}