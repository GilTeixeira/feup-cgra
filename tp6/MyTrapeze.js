/**
 * MyTrapeze
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyTrapeze(scene, base, top, alt) {
    CGFobject.call(this, scene);

    this.base = base;
	this.top = top;
	this.alt = alt;

    this.initBuffers();
}
;MyTrapeze.prototype = Object.create(CGFobject.prototype);
MyTrapeze.prototype.constructor = MyTrapeze;



MyTrapeze.prototype.initBuffers = function() {
   this.vertices = [
            0, 0, 0,
            -this.base/2, 0, 0,
            this.base/2, 0, 0,
            -this.top/2, this.alt, 0,
            this.top/2, this.alt, 0        
			];

	this.indices = [
            1, 0, 3, 
			0, 2, 4,
			0, 4, 3
        ];

    this.primitiveType = this.scene.gl.TRIANGLES;

    this.normals = [
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1
		];

	 this.texCoords = [
	 			0.5, 1,
	 			0, 1,
	 			1, 1,
	 			0, 0,
	 			1, 0 
			];
			
    this.initGLBuffers();


}
;
