/**
 * MyPeriscope
 * @constructor
 */
function MyPeriscope(scene, alt, diametro, comp) {
    CGFobject.call(this, scene);

    this.cil = new MyCylinder(this.scene,12,1);
    this.tamp = new MyPolygon(this.scene,12);
    this.alt=alt;
    this.diametro=diametro;
    this.comp=comp;


}
;MyPeriscope.prototype = Object.create(CGFobject.prototype);
MyPeriscope.prototype.constructor = MyPeriscope;

MyPeriscope.prototype.display = function() {

    //top cyl
    this.scene.pushMatrix();
    this.scene.translate(0, this.alt, -this.diametro);
    this.scene.scale(this.diametro,this.diametro,this.comp);
    this.cil.display();
    this.scene.popMatrix();

    //top cyl tamps
    //back cyl tamp
    this.scene.pushMatrix();
    this.scene.translate(0, this.alt, -this.diametro);
    this.scene.rotate(Math.PI , 0, 1, 0);
    this.scene.scale(this.diametro,this.diametro,1);
    this.tamp.display();
    this.scene.popMatrix();

    //front cyl tamp
    this.scene.pushMatrix();
    this.scene.translate(0, this.alt, this.comp-this.diametro);
    this.scene.scale(this.diametro,this.diametro,1);
    this.tamp.display();
    this.scene.popMatrix();

    //cilindro vertical
    this.scene.pushMatrix();
    this.scene.rotate(-Math.PI / 2, 1, 0, 0);
    this.scene.scale(this.diametro,this.diametro,this.alt);
    this.cil.display();
    this.scene.popMatrix();

}

