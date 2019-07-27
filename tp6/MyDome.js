/**
 * MyDome
 * @constructor
 */
function MyDome(scene, slices, stacks) {
    CGFobject.call(this, scene);

    this.slices = slices;
    this.stacks = stacks;

    this.initBuffers();
}
;MyDome.prototype = Object.create(CGFobject.prototype);
MyDome.prototype.constructor = MyDome;

MyDome.prototype.initBuffers = function() {

    this.vertices = [];
    this.indices = [];
    this.normals = [];
     this.texCoords = [];

    var deltaPhi = (Math.PI / 2) / this.stacks;
    var deltaTheta = 2 * Math.PI / this.slices;

    //texture
    var x=0;
    var y=0;
    var deltaY = 1 / this.slices;
    var deltaZ = 1 / this.stacks

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
            this.texCoords.push(x,y);
            x += deltaY;
            this.texCoords.push(x,y)
            

        }
        angPhi += deltaPhi;

         x = 0;
        y += deltaZ;
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
