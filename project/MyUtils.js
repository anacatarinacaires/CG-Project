export class MyUtils {
    constructor(radius = 150) {
        this.radius = radius;
        this.uHeight = 5.5; 
        
        this.roadWidth  = 0.06;
        this.roadFreq1  = 1.5;
        this.roadAmp1   = 0.12;
        this.roadFreq2  = 3.0;
        this.roadAmp2   = 0.05;
    }

    getRoadCenter(uvZ) {
        return 0.5
            + Math.sin(uvZ * Math.PI * this.roadFreq1) * this.roadAmp1
            + Math.sin(uvZ * Math.PI * this.roadFreq2) * this.roadAmp2;
    }

    distanceToRoad(x, z) {
        const planeSize = this.radius * 2;
        const uvX = x / planeSize + 0.5;
        const uvZ = z / planeSize + 0.5;
        const center = this.getRoadCenter(uvZ);
        return Math.abs(uvX - center) * planeSize;
    }

    smoothstep(edge0, edge1, x) {
        const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
        return t * t * (3 - 2 * t);
    }

    getHeight(x, z) {
        const u = x / (this.radius * 2) + 0.5;
        const distX = Math.abs(u - 0.3) * 1.8;
        return this.smoothstep(0.0, 0.85, distX);
    }

    getShape(x, z) { //of the hieghtt map
        const u = x / (this.radius * 2) + 0.5;
        const distX = Math.abs(u - 0.5) * 1.5;
        return this.smoothstep(0.0, 0.85, distX); 
    }
    getWorldHeight(x, z) {
        const valeShape = this.getShape(x, z);
        return valeShape * this.uHeight; 
    }
}