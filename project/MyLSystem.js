// MyLSystem.js
import { CGFobject } from '../lib/CGF.js';

export class MyLSystem extends CGFobject {
    constructor(scene, axiom, iterations, angle, texturePetal,textureLeaf, colorBranch) {
        super(scene);
        this.texturePetal = texturePetal;
        this.textureLeaf = textureLeaf;
        this.colorBranch= colorBranch;
        this.axiom= axiom;
        this.iterations = iterations;
        this.angle= angle * Math.PI / 180;
        this.grammar= [];
        this.primitives = [];
        this.predecessor = [];
        this.successor= [];
    }

    iniGrammar() {}
    initProductions() {}

    iterate() {
        for (let i = 0; i < this.iterations; i++) {
            let next = "";
            for (let c of this.axiom) {
                let replaced = false;
                for (let p = 0; p < this.predecessor.length; p++) {
                    if (c === this.predecessor[p]) {
                        next += this.successor[p];
                        replaced = true;
                        break;
                    }
                }
                if (!replaced) next += c;
            }
            this.axiom = next;
        }

    }

    display() {
        for (let c of this.axiom) {
            switch (c) {
                case "+":
                    // roda a esquerda
                    this.scene.rotate(this.angle, 0, 0, 1);
                    break;

                case "-":
                    // roda a direita
                    this.scene.rotate(-this.angle, 0, 0, 1);
                    break;

                case "\\":
                    // roda a esquerda
                    this.scene.rotate(-this.angle, 0, 1, 0);
                    break;

                case "/":
                    // roda a esquerda
                    this.scene.rotate(-this.angle, 0, 1, 0);
                    break;

                case "^":
                    // roda a esquerda
                    this.scene.rotate(-this.angle, 1, 0, 0);
                    break;

                case "&":
                    // roda a esquerda
                    this.scene.rotate(-this.angle, 1, 0, 0);
                    break;

                case "[":
                    // push
                    this.scene.pushMatrix();
                    break;

                case "]":
                    // pop
                    this.scene.popMatrix();
                    break;
                default:
                    const idx = this.grammar.indexOf(c);
                    if (idx >= 0) {
                        this.scene.pushMatrix();
                        if (this.primitives[idx].material)
                            this.primitives[idx].material.apply();
                        this.primitives[idx].display();
                        this.scene.popMatrix();
                        this.scene.translate(0, this.primitives[idx].height, 0);
                    }
                    break;
            }
        }
    }
}