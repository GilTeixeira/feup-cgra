/**
 * MyHelix
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyHelix(scene, dir) {
    CGFobject.call(this, scene);

    this.cube = new MyUnitCubeQuad(this.scene);
    this.cylinder = new MyCylinder(this.scene,12,3,true);
    this.dome = new MyDome(this.scene,12,1);
    this.ang = 0;
    this.dir = dir;

    this.speed = 0;

}
;MyHelix.prototype = Object.create(CGFobject.prototype);
MyHelix.prototype.constructor = MyHelix;

MyHelix.prototype.display = function() {

    //cilindro
    this.scene.pushMatrix();
    this.scene.translate(0, 0, -0.1);
    this.scene.scale(0.2, 0.2, 0.2);
    this.cylinder.display();
    this.scene.popMatrix();

    //semi-esfera
    this.scene.pushMatrix();
    this.scene.translate(0, 0, -0.03);
    this.scene.rotate(Math.PI, 1.0, 0.0, 0.0);
    this.scene.rotate(-degToRad * this.ang, 0.0, 0.0, 1.0);
    this.scene.scale(0.05, 0.05, 0.05);
    this.dome.display();
    this.scene.popMatrix();

    //paralelipípedo
    this.scene.pushMatrix();
    this.scene.rotate(degToRad * this.ang, 0.0, 0.0, 1.0);
    this.scene.scale(0.35, 0.1, 0.05);
    this.cube.display();
    this.scene.popMatrix();

}

MyHelix.prototype.update = function(currTime) {
    if (this.speed != 0)
        if (this.lastUpdate == -1) {
            this.lastUpdate = currTime;
            this.ang = 0;
        } else {
            var diff = currTime - this.lastUpdate;
            this.lastUpdate = currTime;
            if (!isNaN(diff))
                if (this.dir == 1)
                    this.ang -= diff * (360 / 1000) * this.speed;
                else
                    this.ang += diff * (360 / 1000) * this.speed;
        }

}

MyHelix.prototype.changeSpeed = function(delta) {
    if (this.speed != 0)
        this.speed += delta;
    else
        this.speed = delta * 10;

    if (this.speed < 1 && this.speed > -1)
        this.speed = 0;

}
