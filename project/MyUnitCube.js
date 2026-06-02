import {CGFobject} from '../lib/CGF.js';
/**
 * @constructor
 * @param scene - Reference to MyScene object
 */

export class MyUnitCube extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }
    
    initBuffers() { 
        this.vertices = [ //8 vertices 
            //0
            -0.5, -0.5, -0.5, //0xn
            -0.5, -0.5, -0.5, //1yn
            -0.5, -0.5, -0.5,  //2zn
            //1
            -0.5, -0.5, 0.5, //3xn
            -0.5, -0.5, 0.5, //4yn
            -0.5, -0.5, 0.5, //5zp
            //2
            -0.5, 0.5, -0.5, //6xn
            -0.5, 0.5, -0.5, //7yp
            -0.5, 0.5, -0.5, //8zn
            //3
            -0.5, 0.5, 0.5, //9xn
            -0.5, 0.5, 0.5, //10yp
            -0.5, 0.5, 0.5,// 11zp
            //4
            0.5, -0.5, -0.5,//12xp
            0.5, -0.5, -0.5,//13yn
            0.5, -0.5, -0.5,//14zn
            //5
            0.5, -0.5, 0.5,	//15xp
            0.5, -0.5, 0.5,//16yn
            0.5, -0.5, 0.5,  //17zp
            //6
            0.5, 0.5, -0.5, //18xp
            0.5, 0.5, -0.5,//19yp
            0.5, 0.5, -0.5,//20zn
            //7
            0.5, 0.5, 0.5,  //21xp
            0.5, 0.5, 0.5, //22yp
            0.5, 0.5, 0.5,    //23 zp

        ];

        //Counter-clockwise reference of vertices
        this.indices = [
            //X neg
            6, 0, 3, 
            6, 3, 9,
            //X pos
            15, 12, 18,
            15, 18, 21, 
            //Y neg
            16, 1, 13,
            16, 4, 1,
            //Y pos
            22, 19, 7,
            22, 7, 10,
            //Z neg
            20, 14, 2,
            20, 2, 8,
            //Z pos
            23, 5, 17,
            23, 11, 5
        ];

        this.normals = [
            -1, 0, 0,  // 0xn
            0, -1, 0,  // 1yn
            0, 0, -1,  // 2zn
            -1, 0, 0,  // 3xn
            0, -1, 0,  // 4yn
            0, 0, 1,   // 5zp
            -1, 0, 0,  // 6xn
            0, 1, 0,   // 7yp
            0, 0, -1,  // 8zn
            -1, 0, 0,  // 9xn
            0, 1, 0,   // 10yp
            0, 0, 1,   // 11zp  
            1, 0, 0,   // 12xp
            0, -1, 0,  // 13yn
            0, 0, -1,  // 14zn
            1, 0, 0,   // 15xp
            0, -1, 0,  // 16yn
            0, 0, 1,   // 17zp
            1, 0, 0,   // 18xp
            0, 1, 0,   // 19yp
            0, 0, -1,  // 20zn
            1, 0, 0,   // 21xp
            0, 1, 0,   // 22yp
            0, 0, 1,   // 23zp
        ]
        
        //The defined indices (and corresponding vertices)
        //will be read in groups of three to draw triangles
        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }
}

