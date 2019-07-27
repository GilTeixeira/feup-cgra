/**
 * MyTarget
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyTarget(scene, x, y, z) {
	CGFobject.call(this,scene);
	 this.pos = [x, y, z];

	
	this.target = new MyPolygon(this.scene,12);


};

MyTarget.prototype = Object.create(CGFobject.prototype);
MyTarget.prototype.constructor=MyTarget;

MyTarget.prototype.display = function () {


	this.scene.pushMatrix();
	this.scene.translate(this.pos[0],this.pos[1]+0.01,this.pos[2]);
	this.scene.rotate(-90 * degToRad, 1.0, 0.0, 0.0);
	this.scene.targetAppearance.apply();
	this.target.display();
	this.scene.popMatrix();


	

}

MyTarget.prototype.getPos = function () {


	return this.pos;

}