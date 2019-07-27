/**
 * MyPolygon
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyPolygon(scene, slices) {
    CGFobject.call(this, scene);

    this.slices = slices;

    this.initBuffers();
}
;MyPolygon.prototype = Object.create(CGFobject.prototype);
MyPolygon.prototype.constructor = MyPolygon;

MyPolygon.prototype.initBuffers = function() {
    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];

    var deltaAng = 2 * Math.PI / this.slices;

    //center
    this.vertices.push(0);
    this.vertices.push(0);
    this.vertices.push(0);

    this.normals.push(0);
    this.normals.push(0);
    this.normals.push(1);
    
    this.texCoords.push(0.5,0.5);
     


    var ang = 0;
    for (i = 0; i < this.slices; i++) {
        this.vertices.push(Math.cos(ang));
        this.vertices.push(Math.sin(ang));
        this.vertices.push(0);

        this.normals.push(0);
        this.normals.push(0);
        this.normals.push(1);

        this.texCoords.push(0.5+0.5*Math.cos(ang));
        this.texCoords.push(0.5-0.5*Math.sin(ang));
        

        ang += deltaAng;

    }

    for (i = 0; i < this.slices; i++) {
        this.indices.push(0);
        this.indices.push(i + 1);

        if (i + 1 == this.slices)
            this.indices.push(1);
        else
            this.indices.push(i + 2);

    }



    this.primitiveType = this.scene.gl.TRIANGLES;

    
    this.initGLBuffers();

}
;
