/**
 * MyClock
 * @constructor
 */
function MyClock(scene) {
    CGFobject.call(this, scene);

    this.clock = new MyCylinder(this.scene,12,1);

    this.clockFront = new MyPolygon(this.scene,12);

    this.seg = new MyClockHand(this.scene,1);
    this.min = new MyClockHand(this.scene,2);
    this.hor = new MyClockHand(this.scene,3);

    this.lastUpdate = -1;

    this.seg.setAngle(90);
    this.min.setAngle(180);
    this.hor.setAngle(270);

}
;MyClock.prototype = Object.create(CGFobject.prototype);
MyClock.prototype.constructor = MyClock;

MyClock.prototype.display = function() {

    //segundos
    this.scene.pushMatrix();
    this.scene.translate(0, 0, 0.32);
    this.scene.rotate(-Math.PI / 2, 1, 0, 0);
    this.seg.display();
    this.scene.popMatrix();

    //minutos
    this.scene.pushMatrix();
    this.scene.translate(0, 0, 0.32);
    this.scene.rotate(-Math.PI / 2, 1, 0, 0);
    this.min.display();
    this.scene.popMatrix();

    //horas
    this.scene.pushMatrix();
    this.scene.translate(0, 0, 0.32);
    this.scene.rotate(-Math.PI / 2, 1, 0, 0);
    this.hor.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0, 0, 0);
    this.scene.scale(0.7, 0.7, 0.3);
    this.clock.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.clockAppearance.apply();
    this.scene.translate(0, 0, 0.3);
    this.scene.scale(0.7, 0.7, 0.3);
    this.clockFront.display();
    this.scene.popMatrix();

}

MyClock.prototype.update = function(currTime) {

    if (this.lastUpdate == -1) {
        this.lastUpdate = currTime;
        deltaSec = 0;
    } else {
        var diff = currTime - this.lastUpdate;
        this.lastUpdate = currTime;
        deltaSec = diff * (360 / (60 * 1000));
    }

    this.seg.setAngle(this.seg.angle - deltaSec);
    this.min.setAngle(this.min.angle - deltaSec / 60);
    this.hor.setAngle(this.hor.angle - deltaSec / 3600);

}
