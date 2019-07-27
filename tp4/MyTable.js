/**
 * MyTable
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

function MyTable(scene) {
    CGFobject.call(this, scene);

    this.cube = new MyUnitCubeQuad(this.scene);
    this.cube.initBuffers();


    this.tableAppearance = new CGFappearance(this.scene);
	this.tableAppearance.loadTexture("../resources/images/table.png");
	this.tableAppearance.setSpecular(0.1,0.1,0.1,1);
	this.tableAppearance.setShininess(10);
	this.tableAppearance.setDiffuse(0.8,0.8,0.8,1);	

	this.legAppearance = new CGFappearance(this.scene);
	this.legAppearance.loadTexture("../resources/images/legTexture.png");
	this.legAppearance.setSpecular(0.8,0.8,0.8,1);
	this.legAppearance.setShininess(100);
	this.legAppearance.setDiffuse(0.8,0.8,0.8,1);	


    
	this.madeira = new CGFappearance(this.scene);
	this.madeira.setAmbient(0.3,0.3,0.3,1);
	this.madeira.setDiffuse(0.3373,0.1843,0.0549,1);
	this.madeira.setSpecular(0.1,0.1,0.1,1);	
	this.madeira.setShininess(120);

	    
	this.metalico = new CGFappearance(this.scene);
	this.metalico.setAmbient(0.3,0.3,0.3,1);
	this.metalico.setDiffuse(0.7529,0.7529,0.7529,1);
	this.metalico.setSpecular(0.9,0.9,0.9,1);	
	this.metalico.setShininess(120);
}
;
MyTable.prototype = Object.create(CGFobject.prototype);
MyTable.prototype.constructor = MyTable;

MyTable.prototype.display = function() {
    
    //tampo
    this.scene.pushMatrix();
	//this.madeira.apply();
	this.tableAppearance.apply();

    this.scene.translate(0, 3.65,0);
    this.scene.scale(5, 0.3, 3);
    this.cube.display();
    this.scene.popMatrix();

    //pernas
    
    this.scene.pushMatrix();
    //this.metalico.apply();

    this.legAppearance.apply();

    this.scene.translate(2.35, 1.75,1.35);
    this.scene.scale(0.3, 3.5, 0.3);
    this.cube.display();
    this.scene.popMatrix();
    
    this.scene.pushMatrix();
    this.scene.translate(2.35, 1.75,-1.35);
    this.scene.scale(0.3, 3.5, 0.3);
    this.cube.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(-2.35, 1.75,1.35);
    this.scene.scale(0.3, 3.5, 0.3);
    this.cube.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(-2.35, 1.75,-1.35);
    this.scene.scale(0.3, 3.5, 0.3);
    this.cube.display();
    this.scene.popMatrix();
 
    
}
