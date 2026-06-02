import { CGFappearance, CGFobject, CGFtexture, CGFshader } from '../lib/CGF.js';
import { CGFobjModel } from "../lib/extra/CGFobjModel.js";
import { MyPrism } from './MyPrism.js';
import { MyWheels } from './wagon/MyWheels.js';
import { MyWagonBed } from './wagon/MyWagonBed.js';
import { MyWagonCloth } from './wagon/MyWagonCloth.js';
import { MyHayBale } from './MyHayBale.js';
import { MyCilinder } from './MyCilinder.js';
import { MyQuad } from './MyQuad.js';

export class MyWagon extends CGFobject {
    constructor(scene) {
        super(scene);
        this.wagonWheels = new MyWheels(scene);
        this.wagonBed = new MyWagonBed(scene, 4, 1, 1, 3);
        this.wagonCloth = new MyWagonCloth(scene);
        this.halebay = new MyHayBale(scene);
        this.yoke = new MyCilinder(scene, 8, 1, 19, 0.3);
        this.quad = new MyQuad(scene, 15,3,1);

        this.horse = new CGFobjModel(scene, "models/horse.obj");

        this.initMaterials();
        
        this.speed = 0;
        this.wheelAngle = 0; 
        this.steerAngle = 0; 

        this.baleObj = new MyHayBale(scene);
        this.balesCount = 0;   
        this.maxBales = 5;
    }

    initMaterials() {
        this.woodTexture = new CGFtexture(this.scene, 'images/wood1.jpg'); 
        
        this.woodMaterial = new CGFappearance(this.scene);
        this.woodMaterial.setAmbient(0.3, 0.3, 0.3, 1);
        this.woodMaterial.setDiffuse(0.7, 0.7, 0.7, 1);
        this.woodMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.woodMaterial.setShininess(10.0);
        this.woodMaterial.setTexture(this.woodTexture);
        this.woodMaterial.setTextureWrap('REPEAT', 'REPEAT');

        this.clothTexture = new CGFtexture(this.scene, 'images/cloth1.png'); 
        
        this.clothMaterial = new CGFappearance(this.scene);
        this.clothMaterial.setAmbient(0.4, 0.4, 0.4, 1);
        this.clothMaterial.setDiffuse(0.8, 0.8, 0.8, 1);
        this.clothMaterial.setSpecular(0.0, 0.0, 0.0, 1); 
        this.clothMaterial.setShininess(1.0);
        this.clothMaterial.setTexture(this.clothTexture);
        this.clothMaterial.setTextureWrap('REPEAT', 'REPEAT');

        this.horseTexture = new CGFtexture(this.scene, 'images/horse3.jpg'); 
    
        this.horseMaterial = new CGFappearance(this.scene);
        this.horseMaterial.setAmbient(0.3, 0.3, 0.3, 1);
        this.horseMaterial.setDiffuse(0.8, 0.8, 0.8, 1);
        this.horseMaterial.setSpecular(0.1, 0.1, 0.1, 1); 
        this.horseMaterial.setShininess(10.0);
        this.horseMaterial.setTexture(this.horseTexture);
    }

    accelerate(val) {
        this.speed += val;
        if (this.speed < 0) this.speed = 0; 
    }

    turn(val) {
        if (this.speed !== 0) {
            this.orientation += val;
        }
    }
    
    pickUpBale() {
        if (this.balesCount < this.maxBales) {
            this.balesCount++;
            return true; 
        }
        return false; 
    }

    dropBale() {
        if (this.balesCount > 0) {
            this.balesCount--;
            return true;
        }
        return false;
    }

    update(t) {
        this.x -= this.speed * Math.cos(this.orientation);
        this.z += this.speed * Math.sin(this.orientation);

        this.wheelAngle += this.speed * 1.2; 
        this.steerAngle *= 0.4;
    }

    display() {
        this.scene.pushMatrix();
            this.scene.translate(this.x, 7, this.z);
            this.scene.scale(0.75, 0.75, 0.75); 
            this.scene.rotate(this.orientation, 0, 1, 0);

            this.scene.pushMatrix()
                this.wagonCloth.display(this.clothMaterial, this.woodMaterial);
                this.woodMaterial.apply();
                this.wagonBed.display();
                this.wagonWheels.display(this.wheelAngle, this.steerAngle);
                

                for (let i = 0; i < this.balesCount; i++) {
                        this.scene.pushMatrix();
                            this.scene.translate(-12 + i*6.5, 6,-7); 
                            this.scene.scale(1.20, 1.20,1.20);
                            this.baleObj.display();
                        this.scene.popMatrix();
                    
                }

                 this.woodMaterial.apply();
                    this.scene.pushMatrix();
                        this.scene.translate(-17, -0.5, -5);
                        this.scene.rotate( Math.PI / 3, 0, 0, 1);
                        this.yoke.display();
                    this.scene.popMatrix();

                    this.scene.pushMatrix();
                        this.scene.translate(-17, -0.5, 5);
                        this.scene.rotate( Math.PI / 3, 0, 0, 1);
                        this.yoke.display();
                    this.scene.popMatrix();

                this.scene.pushMatrix();
                    this.scene.translate(-35, 9, 0);
                    this.scene.rotate( Math.PI / 2, 0, 1, 0);
                    this.scene.rotate( Math.PI / 2, 1, 0, 0);
                    this.quad.display();
                this.scene.popMatrix();
              
            this.scene.popMatrix();

            this.scene.pushMatrix();
                this.scene.scale(0.014, 0.014, 0.014);
                this.scene.translate(-3000, -500, -350);
                this.scene.rotate(-Math.PI/2, 0, 1, 0);
                this.scene.rotate(-Math.PI/2, 1, 0, 0);
                this.horseMaterial.apply();
                this.horse.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
                this.scene.scale(0.014, 0.014, 0.014);
                this.scene.translate(-3000, -500, 350);
                this.scene.rotate(-Math.PI/2, 0, 1, 0);
                this.scene.rotate(-Math.PI/2, 1, 0, 0);
                this.horseMaterial.apply();
                this.horse.display();
            this.scene.popMatrix();
        
        this.scene.popMatrix();
    }
}

