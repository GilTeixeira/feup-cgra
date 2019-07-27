/**
 * MyCylinder
 * @constructor
 */
function MyCylinder(scene, slices, stacks) {
    CGFobject.call(this, scene);

    this.slices = slices;
    this.stacks = stacks;

    this.initBuffers();
}
;MyCylinder.prototype = Object.create(CGFobject.prototype);
MyCylinder.prototype.constructor = MyCylinder;

MyCylinder.prototype.initBuffers = function() {

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

            this.normals.push(Math.cos(ang))
            this.normals.push(Math.sin(ang))
            this.normals.push(0)

            ang += deltaAng;

        }
        z += deltaZ;
    }

    for (j = 0; j < this.stacks; j++) {
        for (i = 0; i < this.slices; i++) {

            //1o triangulo
            this.indices.push(i + j * this.slices);

            if (i + 1 != this.slices)
                this.indices.push(i + 1 + j * this.slices);
            else
                this.indices.push(0 + j * this.slices);

            this.indices.push(i + (j + 1) * this.slices);

            //2o triangulo

            if (i != (this.slices - 1)) {
                this.indices.push(i + (j + 1) * this.slices + 1);
                this.indices.push(i + (j + 1) * this.slices);
                this.indices.push(i + 1 + j * this.slices);
            } else {
                this.indices.push((j + 1) * this.slices);
                this.indices.push(i + (j + 1) * this.slices);
                this.indices.push(0 + j * this.slices);
            }

        }
    }

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
}
;
