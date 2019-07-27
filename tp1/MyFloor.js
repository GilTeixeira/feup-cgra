/**
 * MyFloor
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

function MyFloor(scene) {
    CGFobject.call(this, scene);

    this.cube = new MyUnitCubeQuad(this.scene);
    this.cube.initBuffers();
}
;
MyFloor.prototype = Object.create(CGFobject.prototype);
MyFloor.prototype.constructor = MyFloor;

MyFloor.prototype.display = function() {
 
    //chao
    
    this.scene.pushMatrix();   
    this.scene.translate(0, -0.05,0); 
    this.scene.scale(8, 0.1,6);    
    this.cube.display();
    this.scene.popMatrix();

 

}
