/**
 * myLamp
 * @constructor
 */
function myLamp(scene, slices, stacks) {
    CGFobject.call(this, scene);

    this.slices = slices;
    this.stacks = stacks;

    this.initBuffers();
}
;myLamp.prototype = Object.create(CGFobject.prototype);
myLamp.prototype.constructor = myLamp;

myLamp.prototype.initBuffers = function() {

    this.vertices = [];
    this.indices = [];
    this.normals = [];

    var deltaPhi = (Math.PI / 2) / this.stacks;
    var deltaTheta = 2 * Math.PI / this.slices;

    var angPhi = 0;
    for (j = 0; j <= this.stacks; j++) {

        var angTheta = 0;
        for (i = 0; i < this.slices; i++) {

            this.vertices.push(Math.cos(angPhi) * Math.cos(angTheta));
            this.vertices.push(Math.cos(angPhi) * Math.sin(angTheta));
            this.vertices.push(Math.sin(angPhi));

            this.normals.push(Math.cos(angPhi) * Math.cos(angTheta));
            this.normals.push(Math.cos(angPhi) * Math.sin(angTheta));
            this.normals.push(Math.sin(angPhi));

            this.vertices.push(Math.cos(angPhi) * Math.cos(angTheta + deltaTheta));
            this.vertices.push(Math.cos(angPhi) * Math.sin(angTheta + deltaTheta));
            this.vertices.push(Math.sin(angPhi));

            this.normals.push(Math.cos(angPhi) * Math.cos(angTheta + deltaTheta));
            this.normals.push(Math.cos(angPhi) * Math.sin(angTheta + deltaTheta));
            this.normals.push(Math.sin(angPhi));

            angTheta += deltaTheta;

        }
        angPhi += deltaPhi;
    }

    for (j = 0; j < this.stacks; j++) {
        for (i = 0; i < this.slices; i++) {
            this.indices.push(2 * i + j * 2 * this.slices);
            this.indices.push(2 * i + 1 + j * 2 * this.slices);
            this.indices.push(2 * i + (j + 1) * 2 * this.slices);

            this.indices.push(2 * i + 1 + j * 2 * this.slices);
            this.indices.push(2 * i + 1 + (j + 1) * 2 * this.slices);
            this.indices.push(2 * i + (j + 1) * 2 * this.slices);

        }
    }

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
}
;
