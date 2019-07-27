/**
 * MyUnitCubeQuad
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyUnitCubeQuad(scene) {
	CGFobject.call(this,scene);

	this.quad= new MyQuad(this.scene);
	this.quad.initBuffers();

};

MyUnitCubeQuad.prototype = Object.create(CGFobject.prototype);
MyUnitCubeQuad.prototype.constructor=MyUnitCubeQuad;

MyUnitCubeQuad.prototype.display = function () {

	//face em z=0.5	
	this.scene.pushMatrix();
	this.scene.translate(0.0,0.0,0.5);
	this.quad.display();
	this.scene.popMatrix();

	//face em z=-0.5
	this.scene.pushMatrix();
	this.scene.rotate(Math.PI, 0.0, 1.0, 0.0);
	this.scene.translate(0.0,0.0,0.5);
	this.quad.display();
	this.scene.popMatrix();

	//face em y=-0.5
	this.scene.pushMatrix();
	this.scene.rotate(0.5*Math.PI, 1.0, .0, 0.0);
	this.scene.translate(0.0,0.0,0.5);
	this.quad.display();
	this.scene.popMatrix();

	//face em y=0.5
	this.scene.pushMatrix();
	this.scene.rotate(-0.5*Math.PI, 1.0, .0, 0.0);
	this.scene.translate(0.0,0.0,.5);
	this.quad.display();
	this.scene.popMatrix();
	
	//face em x=0.5
	this.scene.pushMatrix();
	this.scene.rotate(0.5*Math.PI, 0.0, 1.0, 0.0);
	this.scene.translate(0.0,0.0,0.5);
	this.quad.display();
	this.scene.popMatrix();

	//face em x=-0.5
	this.scene.pushMatrix();
	this.scene.rotate(-0.5*Math.PI, 0.0, 1.0, 0.0);
	this.scene.translate(0.0,0.0,0.5);
	this.quad.display();
	this.scene.popMatrix();

}