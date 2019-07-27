/**
 * MyPrism
 * @constructor
 */
function MyPrism(scene, slices, stacks) {
    CGFobject.call(this, scene);

    this.slices = slices;
    this.stacks = stacks;

    this.initBuffers();
}
;MyPrism.prototype = Object.create(CGFobject.prototype);
MyPrism.prototype.constructor = MyPrism;

MyPrism.prototype.initBuffers = function() {

    this.vertices = [];
    this.indices = [];
    this.normals = [];

    var deltaAng = 2 * Math.PI / this.slices;
    var deltaZ = 1 / this.stacks;
    var z = 0;

    for (j = 0; j <= this.stacks; j++) {

        var ang = 0;
        for (i = 0; i < this.slices; i++) {
            this.vertices.push(Math.cos(ang));
            this.vertices.push(Math.sin(ang));
            this.vertices.push(z);

            this.normals.push(Math.cos(ang + deltaAng / 2));
            this.normals.push(Math.sin(ang + deltaAng / 2));
            this.normals.push(0);

            this.vertices.push(Math.cos(ang + deltaAng));
            this.vertices.push(Math.sin(ang + deltaAng));
            this.vertices.push(z);

            this.normals.push(Math.cos(ang + deltaAng / 2));
            this.normals.push(Math.sin(ang + deltaAng / 2));
            this.normals.push(0);
            ang += deltaAng;

        }
        z += deltaZ;
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
