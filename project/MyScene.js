import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFtexture } from "../lib/CGF.js";
import { MySky } from "./MySky.js";
import { MyTerrain } from "./MyTerrain.js";
import { MyRockSet } from "./MyRockSet.js";
import { MyFlowerSet } from "./MyFlowerSet.js";
import { MyGrassSet } from "./MyGrassSet.js";
import { MyBarn } from "./MyBarn.js";
import { MyWagon } from "./MyWagon.js";
import { MyTreeSet } from "./MyTreeSet.js";
import { MyHayBale } from "./MyHayBale.js";
import { MyHUD } from "./MyHUD.js";
import { MyBushSet } from "./MyBushSet.js";
import { MyArrow } from "./MyArrow.js";
import { MyCilinder } from "./MyCilinder.js";
import { MyDepositZone } from "./MyDepositZone.js";
/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
    constructor() {
        super();
    }

    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();

        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        const radius = 250;

        this.axis = new CGFaxis(this);
        this.sky = new MySky(this, radius);
        this.terrain = new MyTerrain(this, radius);
        this.rocks = new MyRockSet(this, 80, radius);
        this.flowers = new MyFlowerSet(this, 1000, radius);
        this.grass = new MyGrassSet(this, 15000, radius);
        this.wagon = new MyWagon(this);
        this.trees = new MyTreeSet(this, 12, radius);
        this.barn = new MyBarn(this);
        this.bushes = new MyBushSet(this, 3, radius);

        this.woodTexture = new CGFtexture(this, "images/pine_wood.jpg");
        this.woodMaterial = new CGFappearance(this);
        this.woodMaterial.setAmbient(0.3, 0.3, 0.3, 1);
        this.woodMaterial.setDiffuse(0.7, 0.7, 0.7, 1);
        this.woodMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.woodMaterial.setTexture(this.woodTexture);
        this.woodMaterial.setTextureWrap('REPEAT', 'REPEAT');

        this.obstacles = [
            { obj: new MyCilinder(this, 16, 4, 6,  0.10), x: 15, z: 80,   radius: 6,  scale: 0.10 },
            { obj: new MyCilinder(this, 16, 4, 8,  0.4),  x: 15, z: 82,   radius: 8,  scale: 0.4  },
            { obj: new MyCilinder(this, 16, 4, 6,  0.25), x: 15, z: 80,   radius: 6,  scale: 0.25 },

            { obj: new MyCilinder(this, 16, 4, 10, 0.7),  x: 22, z: 20,   radius: 10, scale: 0.7  },
            { obj: new MyCilinder(this, 16, 4, 7,  0.3),  x: 20, z: 22,   radius: 7,  scale: 0.3  },

            { obj: new MyCilinder(this, 16, 4, 14, 0.5),  x: 80, z: -120, radius: 14, scale: 0.5  },
            { obj: new MyCilinder(this, 16, 4, 9,  0.3),  x: 80, z: -122, radius: 9,  scale: 0.3  },

            { obj: new MyCilinder(this, 16, 4, 10, 0.4),  x: 30, z: -140, radius: 10, scale: 0.4  },
            { obj: new MyCilinder(this, 16, 4, 8,  0.5),  x: 31, z: -138, radius: 8,  scale: 0.5  },
            { obj: new MyCilinder(this, 16, 4, 6,  0.3),  x: 29, z: -142, radius: 6,  scale: 0.3  },
        ];

        this.bales = [
            { obj: new MyHayBale(this), x: -5, z:  120, active: true },
            { obj: new MyHayBale(this), x:  0, z:   40, active: true },
            { obj: new MyHayBale(this), x: 35, z:  -30, active: true },
            { obj: new MyHayBale(this), x: 55, z: -100, active: true },
            { obj: new MyHayBale(this), x: 60, z: -180, active: true },
        ];

        this.enableTextures(true);
        this.setUpdatePeriod(16);

        this.pickupRadius = 50;
        this.barnRadius = 100;
        this.barnBalesCount = 0;
        this.collisionCooldown = 1000;

        this.hud = new MyHUD();
        this.arrow = new MyArrow(this);
        this.startTime = -1;
        this.time = 0;

        this.depositZone = new MyDepositZone(this);

        //init game loop
        this.initGame();
    }

    initLights() {
        this.lights[0].setPosition(5, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }

    initCameras() {
        this.camera1 = new CGFcamera(0.45, 0.1, 500, vec3.fromValues(-100, 50, 100), vec3.fromValues(0, 0, 0));
        this.camera2 = new CGFcamera(0.5, 0.1, 500, vec3.fromValues(0, 50, 100), vec3.fromValues(0, 0, 0));

        this.camera = this.camera1; 
        this.activeCamera = 1;
    }

    updateCamera() {
        const cos = Math.cos(this.wagon.orientation);
        const sin = Math.sin(this.wagon.orientation);

        const cx1 = this.wagon.x + cos * 140 - sin * 80;
        const cy1 = 130;
        const cz1 = this.wagon.z - sin * 140 - cos * 80;
        this.camera1.setTarget(vec3.fromValues(this.wagon.x, 35, this.wagon.z));
        this.camera1.setPosition(vec3.fromValues(cx1, cy1, cz1));

        const cx2 = this.wagon.x - sin * 150;
        const cy2 = 50;
        const cz2 = this.wagon.z - cos * 80;
        this.camera2.setTarget(vec3.fromValues(this.wagon.x, 10, this.wagon.z));
        this.camera2.setPosition(vec3.fromValues(cx2, cy2, cz2));
    }


    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }

    initGame() {
        this.gameStarted = false;
        this.hp = 100;
        this.lastUpdate = 0;
        this.score = 0;
        this.barnBalesCount = 0;

        this.wagon.x = -35;
        this.wagon.z = 200;
        this.wagon.speed = 0;
        this.wagon.steerAngle = 0;
        this.wagon.orientation = -3 * Math.PI / 5;
        this.wagon.balesCount = 0;

        this.lKeyPressed = false;
        this.fKeyPressed = false;

        for (const bale of this.bales) {
            bale.active = true;
        }

        this.hud.setHP(this.hp);
        this.gameOver = false;
        this.hud.hideOverlay();
    }

    checkKeys() {
        this.wagon.steerAngle = 0;

        if (this.gui.isKeyPressed("KeyW")) this.wagon.accelerate(0.05);
        if (this.gui.isKeyPressed("KeyS")) this.wagon.accelerate(-0.1);

        if (this.gui.isKeyPressed("KeyA")) {
            this.wagon.turn(0.02);
            this.wagon.steerAngle = 0.1;
        }
        if (this.gui.isKeyPressed("KeyD")) {
            this.wagon.turn(-0.02);
            this.wagon.steerAngle = -0.1;
        }

        if (this.gui.isKeyPressed("KeyP")) {
            for (const bale of this.bales) {
                if (!bale.active) continue;
                const distance = Math.hypot(this.wagon.x - bale.x, this.wagon.z - bale.z);
                if (distance <= this.pickupRadius && this.wagon.pickUpBale()) {
                    bale.active = false;
                    this.hp += 10;
                    this.hud.setHP(this.hp);
                    this.hud.setHeal(10);
                    break;
                }
            }
        }

        if (this.gui.isKeyPressed("KeyL") && !this.lKeyPressed) {
            const distBarn = Math.hypot(this.wagon.x - (-20), this.wagon.z - (-200));
            if (distBarn < this.barnRadius && this.wagon.balesCount > 0) {
                this.wagon.balesCount--;
                this.barnBalesCount++;
                this.hp += 15;
                this.hp = Math.min(this.hp, 100);
                this.hud.setHP(this.hp);
                this.hud.setHeal(15);
                this.hud.setBarnBales(this.barnBalesCount);
                this.hud.setWagonBales(this.wagon.balesCount);
            }
            this.lKeyPressed = true;
        }
        if (!this.gui.isKeyPressed("KeyL")) {
            this.lKeyPressed = false;
        }

        //camera update
        if (this.gui.isKeyPressed("KeyF") && !this.fKeyPressed) {
            this.activeCamera = this.activeCamera === 1 ? 2 : 1;
            this.camera = this.activeCamera === 1 ? this.camera1 : this.camera2;
            this.fKeyPressed = true;
        }
        if (!this.gui.isKeyPressed("KeyF")) {
            this.fKeyPressed = false;
        }

    }

    hpUpdate(t) {
        if (this.lastUpdate === 0) this.lastUpdate = t;
        const dt = (t - this.lastUpdate) / 1000;
        this.lastUpdate = t;

        // Only starts after the wagon first moves
        if (this.wagon.speed > 0) this.gameStarted = true;

        if (this.gameStarted && this.barnBalesCount < this.bales.length) {
            this.hp -= 2 * dt; // Always decreases after starting
            this.score += dt;
        }
    }

    collisions() {
        const wagonRadius = 10;
        const horsesRadius = 8;

        const cos = Math.cos(this.wagon.orientation);
        const sin = Math.sin(this.wagon.orientation);
        const hx = this.wagon.x - 31.5 * cos;
        const hz = this.wagon.z + 31.5 * sin;

        for (const obs of this.obstacles) {
            const obsRadius = obs.radius / 3.45;
            const distWagon  = Math.hypot(this.wagon.x - obs.x, this.wagon.z - obs.z);
            const distHorses = Math.hypot(hx - obs.x, hz - obs.z);

            if (distWagon < wagonRadius + obsRadius || distHorses < horsesRadius + obsRadius) {
                this.hp = Math.max(0, this.hp - 10);
                this.wagon.speed = -0.4;
                this.hud.setDamage(10);
                this.hud.setHP(this.hp);
                break;
            }
        }
    }
    

    update(t) {
    if (this.gameOver) return;
    this.sky.update(t);
    this.grass.update(t);
    this.flowers.update(t);
    this.wagon.update(t);

    this.checkKeys();
    this.collisions();
    this.hpUpdate(t);
    // this.updateCamera();

    this.hud.setHP(this.hp);
    this.hud.setScore(this.score);
    this.hud.setWagonBales(this.wagon.balesCount);
    this.hud.setBarnBales(this.barnBalesCount);

    if (this.startTime === -1) this.startTime = t;
    this.time = (t - this.startTime) / 1000;

    // Game Over por HP
    if (this.hp <= 0) {
        this.gameOver = true;
        const btn = this.hud.showGameOver(this.score);
        btn.addEventListener('click', () => this.initGame());
        return;
    }

    // Win
    const totalBales = this.bales.length;
    if (this.barnBalesCount >= totalBales) {
        this.gameOver = true;
        const btn = this.hud.showWin(this.score, totalBales);
        btn.addEventListener('click', () => this.initGame());
        return;
    }
    const distFromCenter = Math.hypot(this.wagon.x, this.wagon.z);
    
    if (distFromCenter > 250) {
        this.gameOver = true;
        const btn = this.hud.showGameOver(this.score);
        btn.addEventListener('click', () => this.initGame());
        return;
    }
}

    display() {
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        this.updateProjectionMatrix();
        this.loadIdentity();
        this.applyViewMatrix();
        this.setDefaultAppearance();

        this.pushMatrix();
        this.sky.display();
        this.terrain.display();
        this.rocks.display();
        this.flowers.display();
        this.grass.display();
        this.wagon.display();
        this.trees.display();
        this.bushes.display();

        const nextBale = this.bales.find(b => b.active);
        if (nextBale) {
            this.arrow.display(nextBale.x, 20, nextBale.z, this.time);
        }
        

        this.popMatrix();

        this.pushMatrix();
        this.translate(-20, 0, -200);
        this.scale(1.3, 1.3, 1.3);
        this.rotate(Math.PI / 4, 0, 1, 0);
        this.barn.display(this.barnBalesCount);
        this.popMatrix();

        for (let i = 0; i < this.bales.length; i++) {
            let bale = this.bales[i];
            if (bale.active) {
                this.pushMatrix();
                this.translate(bale.x, 4, bale.z); 
                bale.obj.display();
                this.popMatrix();
            }
        }

        for (let i = 0; i < this.obstacles.length; i++) {
            const obs = this.obstacles[i];
            this.pushMatrix();
            this.woodMaterial.apply();
            this.translate(obs.x, 1.5, obs.z);
            this.rotate(Math.PI / 10 * i, 0, 1, 0);
            this.rotate(Math.PI / 2, 0, 0, 1);
            obs.obj.display();
            this.popMatrix();
        }
        
        const distToZone = Math.hypot(this.wagon.x - 30, this.wagon.z - (-165));
        this.depositZone.display(30, -165, this.time, distToZone < 30 && this.wagon.balesCount > 0);

        // ---- END Primitive drawing section
    }
}