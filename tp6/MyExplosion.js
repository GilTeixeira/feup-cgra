/**
 * MyExplosion
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyExplosion(scene, x, y, z) {
	CGFobject.call(this,scene);
	 this.pos = [x, y, z];
	 this.size = 0.6;

	
	 this.dome = new MyDome(this.scene,12,20);


};

MyExplosion.prototype = Object.create(CGFobject.prototype);
MyExplosion.prototype.constructor=MyExplosion;

MyExplosion.prototype.display = function () {


	this.scene.pushMatrix();
	this.scene.translate(this.pos[0],this.pos[1],this.pos[2]);
	this.scene.scale(this.size,this.size,this.size);
	this.scene.rotate(-90 * degToRad, 1.0, 0.0, 0.0);
	this.scene.explosionAppearance.apply();
	this.dome.display();
	this.scene.popMatrix();

}



MyExplosion.prototype.setPos = function (newPos) {

	this.pos=newPos;

}

MyExplosion.prototype.grow = function () {

	this.size+=0.015;

}

MyExplosion.prototype.getsize = function () {

	return this.size;

}

MyExplosion.prototype.resetSize = function () {

	this.size=0.6;

}