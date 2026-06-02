// MyLSPlant.js
import { MyLSystem } from "./MyLSystem.js";
import { MyBranch } from "./MyBranch.js";
import { MyLeaf } from "./MyLeaf.js";
import { MyFlower } from "./MyFlower.js";

export class MyLSPlant extends MyLSystem {
    constructor(scene, texturePetal, textureLeaf,colorBranch, scale) {
        super(scene, "F", 1 +  Math.floor(Math.random() * 2), 20 + Math.random() * 15);
        this.scale = scale;

        this.iniGrammar(texturePetal,textureLeaf,colorBranch);
        this.initProductions();
        this.iterate();
    }

    iniGrammar(texturePetal, textureLeaf,colorBranch) {
        this.grammar.push("F")
        this.primitives.push(new MyBranch(this.scene,colorBranch, 0.015, 0.9 + Math.random()*0.3));
        this.grammar.push("L")
        this.primitives.push(new MyBranch(this.scene,colorBranch,0.007, 0.25));
        this.grammar.push("R")
        this.primitives.push(new MyLeaf(this.scene,textureLeaf, 0.5));
        this.grammar.push("X")
        this.primitives.push(new MyFlower(this.scene, texturePetal, 1));
    }

    initProductions() {
        this.predecessor = ["F"];
        this.successor   = [
            "F[-R][+L[&R]-LX]-L[X]",
            "F[-R][+R][LX]",
            "F[-L[\\R]+LX]+L[+R][-R]",
            "F[+L-LX][&R]",
        ];
    }
}