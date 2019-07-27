/**
 * MyClockHand
 * @constructor
 */
function MyClockHand(scene, size) {
    CGFobject.call(this, scene);

    this.clockHand = new MyCylinder(this.scene,12,1);
    this.angle = 0;
    this.size = size;

}
;MyClockHand.prototype = Object.create(CGFobject.prototype);
MyClockHand.prototype.constructor = MyClockHand;

MyClockHand.prototype.display = function() {

    this.scene.pushMatrix();

    this.scene.rotate(-this.angle * Math.PI / 180, 0, 1, 0);

    if (this.size == 1)
        this.scene.scale(0.015, 0.015, 0.6);
    else if (this.size == 2)
        this.scene.scale(0.02, 0.02, 0.5);
    else
        this.scene.scale(0.022, 0.022, 0.35);

    this.clockHand.display();
    this.scene.popMatrix();

}

MyClockHand.prototype.setAngle = function(angle) {
    this.angle = angle;

}
