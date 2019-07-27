/**
 * MyCylinder
 * @constructor
 */
function MyCylinder(scene, slices, stacks, doInside=false) {
    CGFobject.call(this, scene);

    this.slices = slices;
    this.stacks = stacks;
    this.doInside = doInside;

    this.initBuffers();
}
;MyCylinder.prototype = Object.create(CGFobject.prototype);
MyCylinder.prototype.constructor = MyCylinder;

MyCylinder.prototype.initBuffers = function() {

    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];

    var deltaAng = 2 * Math.PI / this.slices;
    var deltaZ = 1 / this.stacks;
    var z = 0;
    
    //texture
    var x=0;
    var y=0;
    var deltaY = 1 / this.slices;

    for (j = 0; j <= this.stacks; j++) {

        var ang = 0;
        for (i = 0; i <= this.slices; i++) {
            this.vertices.push(Math.cos(ang));
            this.vertices.push(Math.sin(ang));
            this.vertices.push(z);

            this.normals.push(Math.cos(ang))
            this.normals.push(Math.sin(ang))
            this.normals.push(0)

            ang += deltaAng;

            this.texCoords.push(x,y);
            x += deltaY;
        }
        z += deltaZ;

        x = 0;
        y += deltaZ;

        
    }

    for (j = 0; j < this.stacks; j++) {
        for (i = 0; i < this.slices; i++) {
            
            //1o triangulo
            this.indices.push(i + j * (this.slices+1));
            this.indices.push(i + 1 + j * (this.slices+1));
            this.indices.push(i  + (j + 1) * (this.slices+1));
            
            //2o triangulo
            this.indices.push(i + 1 + j * (this.slices+1));
            this.indices.push(i  + 1 + (j + 1) * (this.slices+1));
            this.indices.push(i  + (j + 1) * (this.slices+1));


            if(this.doInside){

            //1o triangulo
           this.indices.push(i  + (j + 1) * (this.slices+1));
           this.indices.push(i + 1 + j * (this.slices+1));            
           this.indices.push(i + j * (this.slices+1));
            
            //2o triangulo
            this.indices.push(i  + (j + 1) * (this.slices+1));
            this.indices.push(i  + 1 + (j + 1) * (this.slices+1));            
            this.indices.push(i + 1 + j * (this.slices+1));




            }
            

        }
    }

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
    


}
;
