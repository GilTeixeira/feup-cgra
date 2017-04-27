/**
 * MySubmarine
 * @constructor
 */
function MySubmarine(scene) {
    CGFobject.call(this, scene);

    this.submarine2 = new MySubmarineTemp(this.scene);

    this.moving = 0;
    this.rotating = 0;



};

MySubmarine.prototype = Object.create(CGFobject.prototype);
MySubmarine.prototype.constructor = MySubmarine;

MySubmarine.prototype.display = function() {

   this.scene.pushMatrix();
    this.scene.translate(0, 0, 0+this.moving);
    this.scene.rotate(degToRad*this.rotating, 1, 0, 0);
     this.submarine2.display();
    this.scene.popMatrix();
  

};

MySubmarine.prototype.rotate = function(degrees) {
    this.rotating+=degrees;   
};

MySubmarine.prototype.move = function(position) {
    this.moving+=position;  
};
