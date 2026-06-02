
import { CGFobject, CGFappearance, CGFtexture } from '../lib/CGF.js';
import { MyRoofPrism } from './MyRoofPrism.js';
import { MyQuad } from './MyQuad.js';
import { MyPrism } from './MyPrism.js';
import { MyHayBale } from './MyHayBale.js';

export class MyBarn extends CGFobject {
    constructor(scene) {
        super(scene);

        this.roof      = new MyRoofPrism(scene);
        this.frontWall = new MyQuad(scene,40,20);
        this.sideWall  =  new MyQuad(scene,30,20);
        this.floor     =  new MyQuad(scene,40,30,0.75);
        this.roofquad =  new MyQuad(scene,45,23,0.5);
        this.details =  new MyQuad(scene,35,1.5,0.75);
        this.details2 =  new MyQuad(scene,20,1,0.75);
        this.details3 =  new MyQuad(scene,7.5,10,0.5);
        this.windowQuad = new MyQuad(scene, 7, 7,0.5);

        this.hayBale = new MyHayBale(scene);

        this.wallMaterial = new CGFappearance(scene);
        this.wallMaterial.setAmbient(1, 1, 1, 1);
        this.wallMaterial.setDiffuse(1, 1, 1, 1);
        this.wallMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.wallMaterial.setTexture(new CGFtexture(scene, "images/wood1.jpg"));
        this.wallMaterial.setTextureWrap('REPEAT', 'REPEAT');

        this.roofMaterial = new CGFappearance(scene);
        this.roofMaterial.setAmbient(1, 1, 1, 1);
        this.roofMaterial.setDiffuse(1, 1, 1, 1);
        this.roofMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.roofMaterial.setTexture(new CGFtexture(scene, "images/dark_wood.jpg"));
        this.roofMaterial.setTextureWrap('REPEAT', 'REPEAT');

        this.windowMaterial = new CGFappearance(scene);
        this.windowMaterial.setAmbient(1, 1, 1, 1);
        this.windowMaterial.setDiffuse(1, 1, 1, 1);
        this.windowMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.windowMaterial.setTexture(new CGFtexture(scene, "images/barn_window.png"));
        this.windowMaterial.setTextureWrap('REPEAT', 'REPEAT');
    }

    display(droppedBalesCount = 0) {
        // Back
        this.scene.pushMatrix();
        this.scene.translate(0, 10, -15);
        this.wallMaterial.apply();  
        this.frontWall.display();
        this.scene.popMatrix();

        // Left side
        this.scene.pushMatrix();
        this.scene.translate(-20, 10, 0);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.wallMaterial.apply();
        this.sideWall.display();
        this.scene.popMatrix();

        // Right side
        this.scene.pushMatrix();
        this.scene.translate(20, 10, 0);
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.wallMaterial.apply();
        this.sideWall.display();
        this.scene.popMatrix();

        // Floor
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.roofMaterial.apply();
        this.floor.display();
        this.scene.popMatrix();

        // Roof
        this.scene.pushMatrix();
        this.scene.translate(-20, 20, 0);
        this.scene.scale(40, 15, 30);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.wallMaterial.apply();
        this.roof.display();
        this.scene.popMatrix();

        //roof quads
        this.scene.pushMatrix();
        this.scene.translate(0, 27, 8);
        this.scene.rotate(-Math.PI/4, 1, 0, 0);
        this.roofMaterial.apply();
        this.roofquad.display();
        this.scene.popMatrix();

         this.scene.pushMatrix();
        this.scene.translate(0, 27, -8);
        this.scene.rotate(Math.PI/4, 1, 0, 0);
        this.roofMaterial.apply();
        this.roofquad.display();
        this.scene.popMatrix();

        //side walls details
         this.scene.pushMatrix();
        this.scene.translate(-20, 10, 0);
        this.scene.rotate(Math.PI/5, 1, 0, 0);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.roofMaterial.apply();
        this.details.display();
        this.scene.popMatrix();

         this.scene.pushMatrix();
        this.scene.translate(-20, 10, 0);
        this.scene.rotate(-Math.PI/5, 1, 0, 0);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.roofMaterial.apply();
        this.details.display();
        this.scene.popMatrix();

         this.scene.pushMatrix();
        this.scene.translate(20, 10, 0);
        this.scene.rotate(Math.PI/5, 1, 0, 0);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.roofMaterial.apply();
        this.details.display();
        this.scene.popMatrix();

         this.scene.pushMatrix();
        this.scene.translate(20, 10, 0);
        this.scene.rotate(-Math.PI/5, 1, 0, 0);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.roofMaterial.apply();
        this.details.display();
        this.scene.popMatrix();

        //front details
        this.scene.pushMatrix();
        this.scene.translate(-10, 10, 15);
        this.scene.rotate(Math.PI/2, 0, 0, 1);
        this.roofMaterial.apply();
        this.details2.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(10, 10, 15);
        this.scene.rotate(Math.PI/2, 0, 0, 1);
        this.roofMaterial.apply();
        this.details2.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(15, 4, 14.5);
        this.scene.rotate(Math.PI/2, 0, 0, 1);
        this.roofMaterial.apply();
        this.details3.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-15, 4, 14.5);
        this.scene.rotate(Math.PI/2, 0, 0, 1);
        this.roofMaterial.apply();
        this.details3.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(16, 4, -15); 
        this.hayBale.display();
        this.scene.translate(0, 6, 0); 
        this.hayBale.display();
        this.scene.translate(-6, -6, 0);
        this.hayBale.display();
        this.scene.popMatrix();

       this.scene.pushMatrix();
            this.scene.translate(-12, 4, -15); 
            for(let i = 0; i < droppedBalesCount; i++) {
                this.scene.pushMatrix();
                    let z = Math.floor(i / 6) * -7; 
                    let p = i % 6; 
                    let x = 0, y = 0;

                    if (p < 3) {
                        x = p * 6;
                        y = 0;
                    } else if (p < 5) {
                        x = (p - 3) * 6 + 3; 
                        y = 6;    
                    } else {
                        x = 6; 
                        y = 12; 
                    }

                    this.scene.translate(x, y, z);
                    this.hayBale.display();
                this.scene.popMatrix();
            }
        this.scene.popMatrix();


        // //Window
       this.scene.pushMatrix();
            this.scene.translate(-20.05, 25, 0); 
            this.scene.rotate(-Math.PI/2, 0, 1, 0); 
            this.windowMaterial.apply();
            this.windowQuad.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(20.05, 25, 0); 
            this.scene.rotate(Math.PI/2, 0, 1, 0); 
            this.windowMaterial.apply();
            this.windowQuad.display();
        this.scene.popMatrix();
    }
}