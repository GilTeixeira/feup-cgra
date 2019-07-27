/**
 * MyFlipper
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyFlipper(scene, base, top, alt, larg) {
	CGFobject.call(this,scene);

	this.trap= new MyTrapeze(this.scene,base, top, alt);
	this.quad= new MyQuad(this.scene,0,1,0,1);
	this.larg = larg;
	this.base = base;
	this.top = top;
	this.alt = alt;

};

MyFlipper.prototype = Object.create(CGFobject.prototype);
MyFlipper.prototype.constructor=MyFlipper;

MyFlipper.prototype.display = function () {


	//face de trás
	this.scene.pushMatrix();
	this.scene.rotate(Math.PI, 0.0, 1.0, 0.0);
	this.trap.display();
	this.scene.popMatrix();

	//face da frente
	this.scene.pushMatrix();
	this.scene.translate(0.0,0.0,this.larg);
	this.trap.display();
	this.scene.popMatrix();

	//face da cima
	this.scene.pushMatrix();	
	this.scene.translate(0,this.alt,this.larg/2);
	this.scene.scale(this.top,1,this.larg);
	this.scene.rotate(-0.5*Math.PI, 1.0, 0.0, 0.0);
	this.quad.display();
	this.scene.popMatrix();

	//face de baixo
	this.scene.pushMatrix();	
	this.scene.translate(0,0,this.larg/2);
	this.scene.scale(this.base,1,this.larg);
	this.scene.rotate(0.5*Math.PI, 1.0, 0.0, 0.0);
	this.quad.display();
	this.scene.popMatrix();
	

	//face da esquerda
	var baseTri=(this.base-this.top)/2;
	var ang=Math.atan2(this.alt, baseTri);
	var hipotenusa = Math.pow(baseTri*baseTri+this.alt*this.alt,0.5);

	this.scene.pushMatrix();	
	this.scene.translate(-this.base/2+baseTri/2,this.alt/2,this.larg/2)	
	this.scene.rotate(-0.5*Math.PI, 0.0, 1.0, 0.0);
	this.scene.rotate(-0.5*Math.PI+ang, 1.0, 0.0, 0.0);
	this.scene.scale(this.larg,hipotenusa,1);
	this.quad.display();
	this.scene.popMatrix();

	

	//face da direita
	this.scene.pushMatrix();	
	this.scene.translate(+this.base/2-baseTri/2,this.alt/2,this.larg/2)		
	this.scene.rotate(0.5*Math.PI, 0.0, 1.0, 0.0);
	this.scene.rotate(-0.5*Math.PI+ang, 1.0, 0.0, 0.0);
	this.scene.scale(this.larg,hipotenusa,1);
	this.quad.display();
	this.scene.popMatrix();


	

}