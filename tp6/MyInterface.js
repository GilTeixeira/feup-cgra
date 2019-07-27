/**
 * MyInterface
 * @constructor
 */
 
 
function MyInterface() {
	//call CGFinterface constructor 
	CGFinterface.call(this);
};

MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;

/**
 * init
 * @param {CGFapplication} application
 */
MyInterface.prototype.init = function(application) {
	// call CGFinterface init
	CGFinterface.prototype.init.call(this, application);
	
	
	
	this.gui = new dat.GUI();

	// add a group of controls (and open/expand by defult)
	
	var lights=this.gui.addFolder("Lights");
	lights.open();

	lights.add(this.scene, 'light1');
	lights.add(this.scene, 'light2');
	lights.add(this.scene, 'light3');
	lights.add(this.scene, 'light4');
	lights.add(this.scene, 'light5');

	this.gui.add(this.scene, 'moveClock');
	
	this.gui.add(this.scene, 'currSubmarineAppearance', this.scene.submarineAppearanceList ).name('Textures');


	return true;
};

/**
 * processKeyboard
 * @param event {Event}
 */
MyInterface.prototype.processKeyboard = function(event) {
	// call CGFinterface default code (omit if you want to override)
	CGFinterface.prototype.processKeyboard.call(this,event);
	
	// Check key codes e.g. here: http://www.asciitable.com/
	// or use String.fromCharCode(event.keyCode) to compare chars
	
	// for better cross-browser support, you may also check suggestions on using event.which in http://www.w3schools.com/jsref/event_key_keycode.asp
	switch (event.keyCode)
	{
		case (87):	// only works for capital 'W', as it is
			this.scene.speedUp();
			break;
		case (119):	// only works for lower 'w', as it is
			this.scene.speedUp();
			break;
		case (83):	// only works for capital 'S', as it is
			this.scene.speedDown();
			break;
		case (115):	// only works for lower 's', as it is
			this.scene.speedDown();
			break;
		case (65):	// only works for capital 'A', as it is
			this.scene.rotateSubmarine(1);
			break;
		case (97):	// only works for lower 'a', as it is
			this.scene.rotateSubmarine(1);
			break;
		case (68):	// only works for capital 'D', as it is
			this.scene.rotateSubmarine(-1);
			break;
		case (100):	// only works for lower 'd', as it is
			this.scene.rotateSubmarine(-1);
			break;
		case (81):	// only works for capital 'Q', as it is
			this.scene.moveY(1);
			break;
		case (113):	// only works for lower 'q', as it is
			this.scene.moveY(1);
			break;
		case (69):	// only works for capital 'E', as it is
			this.scene.moveY(-1);
			break;
		case (101):	// only works for lower 'e', as it is
			this.scene.moveY(-1);
			break;
		case (80):	// only works for capital 'P', as it is
			this.scene.movePeris(1);
			break;
		case (112):	// only works for lower 'p', as it is
			this.scene.movePeris(1);
			break;
		case (76):	// only works for capital 'L', as it is
			this.scene.movePeris(-1);
			break;
		case (108):	// only works for lower 'l', as it is
			this.scene.movePeris(-1);
			break;
		case (70):	// only works for capital 'L', as it is
			this.scene.setUpTorpedo();
			break;
		case (102):	// only works for lower 'l', as it is
			this.scene.setUpTorpedo();
			break;
	};
};

