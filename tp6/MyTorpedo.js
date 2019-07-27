/**
 * MyTorpedo
 * @constructor
 */
function MyTorpedo(scene) {
    CGFobject.call(this, scene);

    this.cylinder = new MyCylinder(this.scene,12,1);
    this.dome = new MyDome(this.scene,12,20);
    this.rearTrap = new MyFlipper(this.scene, 2.34, 1.64, 0.2, 0.1);


    this.angXZ = 0;
    this.angY = 0;

    this.Xpos = 0;
    this.Ypos = 0;
    this.Zpos = 0;

    this.posTarget = [0, 0, 0];

    //this.speed = 0;

}
;MyTorpedo.prototype = Object.create(CGFobject.prototype);
MyTorpedo.prototype.constructor = MyTorpedo;

MyTorpedo.prototype.display = function() {


    this.scene.pushMatrix();
    this.scene.translate(this.Xpos, this.Ypos, this.Zpos);
    this.scene.rotate(degToRad*this.angY, 0, 1, 0);
    this.scene.rotate(-degToRad*this.angXZ, 1, 0, 0);    
    
    this.scene.torpedoAppearance.apply();

    //Semi-esfera da Frente
    this.scene.pushMatrix();
    this.scene.translate(0, 0, .4);
    this.scene.scale(0.1, 0.1, 0.1);
    this.dome.display();
    this.scene.popMatrix();

    //Cilindro do Corpo
    this.scene.pushMatrix();
    this.scene.translate(0, 0, -.4);
    this.scene.scale(0.1, 0.1, .8);
    this.cylinder.display();
    this.scene.popMatrix();

    //Semi-esfera de Trás
    this.scene.pushMatrix();
    this.scene.translate(0, 0, -.4);
    this.scene.rotate(-180 * degToRad, 1.0, 0.0, 0.0);
    this.scene.scale(0.1, 0.1, 0.1);   
    this.dome.display();
    this.scene.popMatrix();


    //barbatana traseira horizontal
    this.scene.pushMatrix();
    this.scene.translate(0,0, -0.45);
    this.scene.rotate(90 * degToRad, 1.0, 0.0, 0.0);
    this.scene.scale(0.2, 0.2, 0.2);   
    this.rearTrap.display();
    this.scene.popMatrix();

    //barbatana traseira vertical
    this.scene.pushMatrix();
    this.scene.translate(0,0, -0.45);
    this.scene.rotate(90 * degToRad, 1.0, 0.0, 0.0);
    this.scene.rotate(90 * degToRad, 0, 1.0, 0.0);
    this.scene.scale(0.2, 0.2, 0.2);   
    this.rearTrap.display();
    this.scene.popMatrix();

    this.scene.popMatrix();



}
;


MyTorpedo.prototype.setPos = function(posSub) {

    this.Xpos = posSub[0];
    this.Ypos = posSub[1];
    this.Zpos = posSub[2];
}
;

MyTorpedo.prototype.getPos = function(posSub) {
    var posTorp=[this.Xpos, this.Ypos, this.Zpos];
    return posTorp;
}
;

MyTorpedo.prototype.setOri = function(oriSub) {

    this.angXZ = oriSub[0];
    this.angY = oriSub[1];
}
;

MyTorpedo.prototype.setPosTarget = function(posTarget) {

    this.posTarget=posTarget;
}
;

MyTorpedo.prototype.distTorpToTarget = function() {

    return Math.sqrt(Math.pow((this.Xpos - this.posTarget[0]),2) + Math.pow((this.Ypos - this.posTarget[1]),2) + Math.pow((this.Zpos - this.posTarget[2]),2));
}
;


MyTorpedo.prototype.getPosP2 = function() {
    var p2=[this.Xpos+6*Math.cos(degToRad*this.angY)*Math.sin(degToRad*this.angXZ), this.Ypos+6*Math.sin(degToRad*this.angY), this.Zpos+6*Math.cos(degToRad*this.angY)*Math.cos(degToRad*this.angXZ)];
    return p2;
}
;

MyTorpedo.prototype.getPosP3 = function() {
    var p3= [this.posTarget[0],this.posTarget[1]+3,this.posTarget[2]];
    return p3;
}
;

MyTorpedo.prototype.getPosP4 = function() {
    var p4= this.posTarget;
    return p4;
}
;

