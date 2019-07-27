var degToRad = Math.PI / 180.0;

function LightingScene() {
    CGFscene.call(this);
}

LightingScene.prototype = Object.create(CGFscene.prototype);
LightingScene.prototype.constructor = LightingScene;

LightingScene.prototype.init = function(application) {
    CGFscene.prototype.init.call(this, application);

    this.initCameras();

    this.initLights();

    this.gl.clearColor(65 / 255, 105 / 255, 225 / 255, 1.0);
    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    this.axis = new CGFaxis(this);

    // Scene elements

    this.ocean = new MyQuad(this,0,10,0,12);
    this.post = new MyCylinder(this,8,20);
    this.clock = new MyClock(this);
    this.submarine = new MySubmarine(this);

    this.targets = [];
    this.currTarget = 0;
    this.targets.push(new MyTarget(this,3,0,5));
    this.targets.push(new MyTarget(this,20,0,5));

    this.torp = new MyTorpedo(this);

    this.explosion = new MyExplosion(this,0,0,0);

    //Target Related
    this.FirstUpdateTorp = -1;
    this.showTorp = false;
    
    this.distTorpToTarget;
    this.P1;
    this.P2;
    this.P3;
    this.P4;
    this.showExplosion = false;
    this.prevPos = [];

    // Materials
    this.materialDefault = new CGFappearance(this);

    //Textures
    this.enableTextures(true);

    this.submarineAppearances = [];
    this.submarineAppearanceList = {
        Black: 0,
        Grey: 1,
        Yellow: 2
    }

    this.currSubmarineAppearance = 0;

    this.oceanAppearance = new CGFappearance(this);
    this.oceanAppearance.loadTexture("../resources/images/oceanBottom.png");
    this.oceanAppearance.setSpecular(0.1, 0.1, 0.1, 1);
    this.oceanAppearance.setShininess(10);
    this.oceanAppearance.setDiffuse(0.9, 0.9, 0.9, 1);

    this.postAppearance = new CGFappearance(this);
    this.postAppearance.loadTexture("../resources/images/post.png");
    this.postAppearance.setSpecular(0.5, 0.5, 0.5, 1);
    this.postAppearance.setShininess(80);
    this.postAppearance.setDiffuse(0.8, 0.8, 0.8, 1);

    this.clockAppearance = new CGFappearance(this);
    this.clockAppearance.loadTexture("../resources/images/clock.png");
    this.clockAppearance.setSpecular(0.1, 0.1, 0.1, 1);
    this.clockAppearance.setShininess(10);
    this.clockAppearance.setDiffuse(0.8, 0.8, 0.8, 1);

    this.submarineAppearance1 = new CGFappearance(this);
    this.submarineAppearance1.loadTexture("../resources/images/sub1.png");
    this.submarineAppearance1.setSpecular(0.1, 0.1, 0.1, 1);
    this.submarineAppearance1.setShininess(10);
    this.submarineAppearance1.setDiffuse(0.8, 0.8, 0.8, 1);
    this.submarineAppearances.push(this.submarineAppearance1);

    this.submarineAppearance2 = new CGFappearance(this);
    this.submarineAppearance2.loadTexture("../resources/images/sub2.png");
    this.submarineAppearance2.setSpecular(0.1, 0.1, 0.1, 1);
    this.submarineAppearance2.setShininess(10);
    this.submarineAppearance2.setDiffuse(0.8, 0.8, 0.8, 1);
    this.submarineAppearances.push(this.submarineAppearance2);

    this.submarineAppearance3 = new CGFappearance(this);
    this.submarineAppearance3.loadTexture("../resources/images/sub3.png");
    this.submarineAppearance3.setSpecular(0.1, 0.1, 0.1, 1);
    this.submarineAppearance3.setShininess(10);
    this.submarineAppearance3.setDiffuse(0.8, 0.8, 0.8, 1);
    this.submarineAppearances.push(this.submarineAppearance3);

    this.targetAppearance = new CGFappearance(this);
    this.targetAppearance.loadTexture("../resources/images/Target.png");
    this.targetAppearance.setSpecular(0.1, 0.1, 0.1, 1);
    this.targetAppearance.setShininess(10);
    this.targetAppearance.setDiffuse(0.8, 0.8, 0.8, 1);

    this.torpedoAppearance = new CGFappearance(this);
    this.torpedoAppearance.loadTexture("../resources/images/Torpedo.png");
    this.torpedoAppearance.setSpecular(0.1, 0.1, 0.1, 1);
    this.torpedoAppearance.setShininess(10);
    this.torpedoAppearance.setDiffuse(0.8, 0.8, 0.8, 1);

    this.explosionAppearance = new CGFappearance(this);
    this.explosionAppearance.loadTexture("../resources/images/Explosion.png");
    this.explosionAppearance.setSpecular(0.1, 0.1, 0.1, 1);
    this.explosionAppearance.setShininess(10);
    this.explosionAppearance.setDiffuse(0.8, 0.8, 0.8, 1);

    this.setUpdatePeriod(10);

    //GUI

    this.light1 = true;
    this.light2 = true;
    this.light3 = true;
    this.light4 = true;
    this.light5 = true;
    this.moveClock = true;

}
;

LightingScene.prototype.initCameras = function() {
    this.camera = new CGFcamera(0.4,0.1,500,vec3.fromValues(30, 30, 30),vec3.fromValues(0, 0, 0));
}
;

LightingScene.prototype.initLights = function() {
    this.setGlobalAmbientLight(0, 0, 0, 1.0);

    // Positions for four lights
    this.lights[0].setPosition(4, 6, 1, 1);
    this.lights[0].setVisible(false);

    this.lights[1].setPosition(10.5, 6.0, 1.0, 1.0);
    this.lights[1].setVisible(false);

    this.lights[2].setPosition(10.5, 6.0, 5.0, 1.0);
    this.lights[2].setVisible(false);

    this.lights[3].setPosition(4, 6.0, 5.0, 1.0);
    this.lights[3].setVisible(false);

    this.lights[4].setPosition(0, 4.0, 7.0, 1.0);
    this.lights[4].setVisible(false);

    //Lights Properties 
    this.lights[0].setAmbient(0, 0, 0, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].setSpecular(1.0, 1.0, 0, 1.0);
    this.lights[0].enable();

    this.lights[1].setAmbient(0, 0, 0, 1);
    this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[1].enable();

    this.lights[2].setAmbient(0, 0, 0, 1);
    this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[2].setSpecular(1.0, 1.0, 1.0, 1.0);
    this.lights[2].setConstantAttenuation(0);
    this.lights[2].setLinearAttenuation(1.0);
    this.lights[2].setQuadraticAttenuation(0);
    this.lights[2].enable();

    this.lights[3].setAmbient(0, 0, 0, 1);
    this.lights[3].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[3].setSpecular(1.0, 1.0, 0, 1.0);
    this.lights[3].setConstantAttenuation(0);
    this.lights[3].setLinearAttenuation(0);
    this.lights[3].setQuadraticAttenuation(0.2);
    this.lights[3].enable();

    this.lights[4].setAmbient(0, 0, 0, 1);
    this.lights[4].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[4].setSpecular(0.6, 0.6, 0.6, 1.0);
    this.lights[4].enable();

}
;

LightingScene.prototype.updateLights = function() {
    for (i = 0; i < this.lights.length; i++)
        this.lights[i].update();
}

LightingScene.prototype.display = function() {
    // ---- BEGIN Background, camera and axis setup

    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

    // Initialize Model-View matrix as identity (no transformation)
    this.updateProjectionMatrix();
    this.loadIdentity();

    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    // Update all lights used
    this.updateLights();

    // Draw axis
    this.axis.display();

    this.materialDefault.apply();

    // ---- END Background, camera and axis setup

    // ---- BEGIN Objects drawing section

    //Clock
    this.pushMatrix();

    this.translate(8, 5, 0);
    this.clock.display();
    this.popMatrix();

    //Poste
    this.pushMatrix();
    this.postAppearance.apply();
    this.translate(8, 0, 0.15);
    this.rotate(-90 * degToRad, 1.0, 0.0, 0.0);
    this.scale(0.15, 0.15, 5);
    this.post.display();
    this.popMatrix();

    // Floor
    this.pushMatrix();
    this.oceanAppearance.apply();
    this.translate(12.5, 0, 12.5);
    this.rotate(-90 * degToRad, 1, 0, 0);
    this.scale(25, 25, 0.2);
    this.ocean.display();
    this.popMatrix();

    //Submarine

    this.pushMatrix();
    this.submarineAppearances[this.currSubmarineAppearance].apply();
    this.submarine.update();
    this.submarine.display();
    this.popMatrix();

    //targets
    this.materialDefault.apply();

    for (i = this.currTarget; i < this.targets.length; i++)
        this.targets[i].display();


    if (this.showTorp)
        this.torp.display();

    if (this.showExplosion)
        this.explosion.display();

        console.log(this.submarine);


    // ---- END Drawing section
}
;

LightingScene.prototype.update = function(currTime) {
    if (this.moveClock)
        this.clock.update(currTime);

    if (this.light1)
        this.lights[0].enable();
    else
        this.lights[0].disable();

    if (this.light2)
        this.lights[1].enable();
    else
        this.lights[1].disable();

    if (this.light3)
        this.lights[2].enable();
    else
        this.lights[2].disable();

    if (this.light4)
        this.lights[3].enable();
    else
        this.lights[3].disable();

    if (this.light5)
        this.lights[4].enable();
    else
        this.lights[4].disable();

    this.submarine.updateHelix(currTime);

    if (this.showTorp)
        this.moveTorpedo(currTime);

    if (this.showExplosion) {
        this.explosion.grow();
        if (this.explosion.getsize() >= 2) {
            this.showExplosion = false;
            this.explosion.resetSize();

        }
    }

}


LightingScene.prototype.speedDown = function(direction) {

    this.submarine.speedDown();

}
;

LightingScene.prototype.speedUp = function(direction) {

    this.submarine.speedUp();

}
;

LightingScene.prototype.rotateSubmarine = function(degrees, currTime) {

    this.submarine.rotate(degrees, currTime);

}
;

LightingScene.prototype.moveY = function(direction) {

    this.submarine.moveY(direction);

}
;

LightingScene.prototype.movePeris = function(direction) {

    this.submarine.movePeris(direction);

}
;

LightingScene.prototype.setUpTorpedo = function() {
    if (this.currTarget >= this.targets.length)
        return;

    this.showTorp = true;

    this.torp = new MyTorpedo(this);
    var posTorped = this.submarine.getPos()
    posTorped[1] = posTorped[1] - 0.7;

    this.torp.setPos(posTorped);
    this.torp.setOri(this.submarine.getOri());

    this.torp.setPosTarget(this.targets[this.currTarget].getPos());
    this.explosion.setPos(this.targets[this.currTarget].getPos());

 
}
;

LightingScene.prototype.moveTorpedo = function(currTime) {

    if (this.FirstUpdateTorp == -1) {
        this.FirstUpdateTorp = currTime;
        t = 0;
        this.P1 = this.torp.getPos();
        this.P2 = this.torp.getPosP2();
        this.P3 = this.torp.getPosP3();
        this.P4 = this.torp.getPosP4();
        this.prevPos = this.P1;
        this.distTorpToTarget = this.torp.distTorpToTarget();
    } else {
        var diff = currTime - this.FirstUpdateTorp;
        t = diff / (1000 * this.distTorpToTarget);
    }

    var newTorpX = Math.pow(1 - t, 3) * this.P1[0] + Math.pow(3 * t * (1 - t), 2) * this.P2[0] + 3 * t * t * (1 - t) * this.P3[0] + Math.pow(t, 3) * this.P4[0];
    var newTorpY = Math.pow(1 - t, 3) * this.P1[1] + Math.pow(3 * t * (1 - t), 2) * this.P2[1] + 3 * t * t * (1 - t) * this.P3[1] + Math.pow(t, 3) * this.P4[1];
    var newTorpZ = Math.pow(1 - t, 3) * this.P1[2] + Math.pow(3 * t * (1 - t), 2) * this.P2[2] + 3 * t * t * (1 - t) * this.P3[2] + Math.pow(t, 3) * this.P4[2];

    var newTorpPos = [newTorpX, newTorpY, newTorpZ];
    this.torp.setPos(newTorpPos);

    var deltax = this.prevPos[0] - newTorpPos[0];
    var deltay = this.prevPos[1] - newTorpPos[1];
    var deltaz = this.prevPos[2] - newTorpPos[2];

    var angXZ = Math.atan2(deltaz, deltax);
    var angY = Math.atan2(deltaz, deltay);
    var newOri = [angXZ, angY];


    this.prevPos = newTorpPos;

    if (t >= 1) {
        this.FirstUpdateTorp = -1;
        this.showTorp = false;
        this.torp = new MyTorpedo(this);
        this.distTorpToTarget;
        this.showExplosion = true;
        this.currTarget++;
    }

}
;
