/**
 * MySubmarineTemp
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

function MySubmarineTemp(scene) {
    CGFobject.call(this, scene);



    this.initBuffers();
}
;MySubmarineTemp.prototype = Object.create(CGFobject.prototype);
MySubmarineTemp.prototype.constructor = MySubmarineTemp;



MySubmarineTemp.prototype.initBuffers = function() {
   this.vertices = [  
            0.5, 0.3, 0, 
            -0.5, 0.3, 0,
            0, 0.3, 2
			];

	this.indices = [
            0, 1, 2, 
        ];

    this.primitiveType = this.scene.gl.TRIANGLES;

    this.normals = [
            0, 0, 1,
            0, 0, 1,
            0, 0, 1
		];

			
    this.initGLBuffers();


}
;

