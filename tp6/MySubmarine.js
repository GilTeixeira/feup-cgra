/**
 * MySubmarine
 * @constructor
 */
function MySubmarine(scene) {
    CGFobject.call(this, scene);

    this.cylinder = new MyCylinder(this.scene,12,30);
    this.dome = new MyDome(this.scene,12,20);
    this.cube = new MyUnitCubeQuad(this.scene);
    this.leftHelix = new MyHelix(this.scene,1);
    this.rightHelix = new MyHelix(this.scene,-1);

    this.topTrap = new MyFlipper(this.scene,1.42,1,0.2,0.1);
    this.rearTrapVert = new MyFlipper(this.scene,2.34,1.64,0.2,0.1);
    this.rearTrapHori = new MyFlipper(this.scene,2.34,1.64,0.2,0.1);
    this.periscope = new MyPeriscope(this.scene,1.5,0.05,0.3);

    this.tamp = new MyPolygon(this.scene,12);

    this.angY = 198;
    this.angX = 0;
    this.rearTrapVertAng = 0;
    this.HoriTrapAng = 0;

    this.Xpos = 12.5;
    this.Ypos = 1.2;
    this.Zpos = 12.5;
    this.posPeris = 0;
    this.dirPeris = 0;

    this.speed = 0;

}
;MySubmarine.prototype = Object.create(CGFobject.prototype);
MySubmarine.prototype.constructor = MySubmarine;

MySubmarine.prototype.display = function() {

    this.scene.pushMatrix();
    this.scene.translate(this.Xpos, this.Ypos, this.Zpos);
    this.scene.rotate(degToRad * this.angY, 0, 1, 0);
    this.scene.rotate(-degToRad * this.angX, 1, 0, 0);

    this.scene.translate(0, 0, -2.04);

    //Semi-esfera da Frente
    this.scene.pushMatrix();
    this.scene.translate(0, 0, 4.08);
    this.scene.scale(0.365, 0.5, 0.46);
    this.dome.display();
    this.scene.popMatrix();

    //Cilindro do Corpo
    this.scene.pushMatrix();
    this.scene.scale(0.365, 0.5, 4.08);
    this.cylinder.display();
    this.scene.popMatrix();

    //Semi-esfera de Trás
    this.scene.pushMatrix();
    this.scene.rotate(-180 * degToRad, 1.0, 0.0, 0.0);
    this.scene.scale(0.365, 0.5, 0.46);
    this.dome.display();
    this.scene.popMatrix();

    //Cilindro da Torre Superior
    this.scene.pushMatrix();
    this.scene.translate(0, 0.07, 1.5);
    this.scene.rotate(-90 * degToRad, 1.0, 0.0, 0.0);
    this.scene.scale(0.365, 0.44, 1);
    this.cylinder.display();
    this.scene.popMatrix();

    //tampo do cilindro superior
    this.scene.pushMatrix();
    this.scene.translate(0, 1.07, 1.5);
    this.scene.rotate(-90 * degToRad, 1.0, 0.0, 0.0);
    this.scene.scale(0.365, 0.44, 1);
    this.tamp.display();
    this.scene.popMatrix();

    //Periscopio
    this.scene.pushMatrix();
    this.scene.translate(0, 0.1 + this.posPeris, 1.8);
    this.periscope.display();
    this.scene.popMatrix();

    //barbatana do topo
    this.scene.pushMatrix();
    this.scene.translate(0, 0.8, 1.6);
    this.scene.rotate(this.HoriTrapAng * degToRad, 1, 0, 0);
    this.scene.rotate(-90 * degToRad, 1.0, 0.0, 0.0);
    this.topTrap.display();
    this.scene.popMatrix();

    //barbatana traseira horizontal
    this.scene.pushMatrix();
    this.scene.rotate(this.HoriTrapAng * degToRad, 1, 0, 0);
    this.scene.translate(0, 0.05, -0.2);
    this.scene.rotate(90 * degToRad, 1.0, 0.0, 0.0);
    this.rearTrapHori.display();
    this.scene.popMatrix();

    //barbatana traseira vertical
    this.scene.pushMatrix();
    this.scene.rotate(this.rearTrapVertAng * degToRad, 0, 1, 0);
    this.scene.translate(-0.05, 0, -0.2);
    this.scene.rotate(90 * degToRad, 1.0, 0.0, 0.0);
    this.scene.rotate(90 * degToRad, 0, 1.0, 0.0);
    this.rearTrapVert.display();
    this.scene.popMatrix();

    //helix da direita
    this.scene.pushMatrix();
    this.scene.translate(0.49, -0.35, 0.155);
    this.rightHelix.display();
    this.scene.popMatrix();

    //helix da esquerda
    this.scene.pushMatrix();
    this.scene.translate(-0.49, -0.35, .155);
    this.leftHelix.display();
    this.scene.popMatrix();
    this.scene.popMatrix();

}
;

MySubmarine.prototype.update = function() {

    this.Xpos += this.speed * Math.sin(this.angY * degToRad);
    this.Zpos += this.speed * Math.cos(this.angY * degToRad);
    this.Ypos += this.speed * Math.sin(this.angX * degToRad);

    if (this.rearTrapVertAng > 0)
        this.rearTrapVertAng -= .5;
    if (this.rearTrapVertAng < 0)
        this.rearTrapVertAng += .5;

    if (this.HoriTrapAng > 0)
        this.HoriTrapAng -= .5;
    if (this.HoriTrapAng < 0)
        this.HoriTrapAng += .5;

    if (this.dirPeris != 0) {
        if (this.dirPeris == 1) {
            if (this.posPeris > 0.8)
                this.dirPeris = 0;
            else
                this.posPeris += 0.05;
        }

        if (this.dirPeris == -1) {
            if (this.posPeris < -0.4)
                this.dirPeris = 0;
            else
                this.posPeris -= 0.05;
        }

        console.log(this.dirPeris);

    }

}
;

MySubmarine.prototype.rotate = function(degrees) {

    this.angY += degrees;

    this.rearTrapVertAng += degrees * 10;
    if (Math.abs(this.rearTrapVertAng) > 60) {
        if (this.rearTrapVertAng > 0)
            this.rearTrapVertAng = 60;
        else
            this.rearTrapVertAng = -60;
    }

}
;

MySubmarine.prototype.speedUp = function() {

    this.speed += 0.01;
    this.leftHelix.changeSpeed(0.1);
    this.rightHelix.changeSpeed(0.1);

}
;

MySubmarine.prototype.speedDown = function() {

    this.speed -= 0.01;
    this.leftHelix.changeSpeed(-0.1);
    this.rightHelix.changeSpeed(-0.1);

}
;

MySubmarine.prototype.updateHelix = function(currTime) {

    this.leftHelix.update(currTime);
    this.rightHelix.update(currTime);

}
;

MySubmarine.prototype.rotateLemeVertical = function(currTime) {

    this.leftHelix.update(currTime);
    this.rightHelix.update(currTime);

}
;

MySubmarine.prototype.rotateLemeVertical = function(currTime) {
    this.rightHelix.update(currTime);

}
;

MySubmarine.prototype.moveY = function(direction) {
    if (this.angX >= 90 && direction == 1)
        return;

    if (this.angX <= -90 && direction == -1)
        return;

    this.angX += 1 * direction;

    this.HoriTrapAng += 10 * direction;
    if (Math.abs(this.HoriTrapAng) > 60) {
        if (this.HoriTrapAng > 0)
            this.HoriTrapAng = 60;
        else
            this.HoriTrapAng = -60;
    }


}
;

MySubmarine.prototype.movePeris = function(direction) {

    this.dirPeris = direction;

}
;

MySubmarine.prototype.getPos = function() {
    var posSub = [this.Xpos, this.Ypos, this.Zpos];
    return posSub;
}
;

MySubmarine.prototype.getOri = function() {
    var oriSub = [this.angY, this.angX];
    return oriSub;
}
;
