import * as THREE from '../libs/three.module.js'
 
class Caja extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);
    
    // Un Mesh se compone de geometría y material
    var cajaGeom = new THREE.BoxBufferGeometry (1,1,1);
    // Como material se crea uno a partir de un color
    var cajaMat = new THREE.MeshNormalMaterial();
    
    // Ya podemos construir el Mesh
    this.caja = new THREE.Mesh (cajaGeom, cajaMat);
    // Y añadirlo como hijo del Object3D (el this)
    this.add (this.caja);
  }
  
  createGUI (gui,titleGui) {
    // Controles para el tamaño de la caja
    this.guiControls = new function () {
      this.sizeX = 1.0;
      this.sizeY = 1.0;
      this.sizeZ = 1.0;

      this.axisOnOff = true;

      this.reset = function () {
        this.sizeX = 1.0;
        this.sizeY = 1.0;
        this.sizeZ = 1.0;
      }
    }


      // Se crea una sección para los controles de la caja
      var folder = gui.addFolder(titleGui);
      // Estas lineas son las que añaden los componentes de la interfaz
      // Las tres cifras indican un valor mínimo, un máximo y el incremento
      // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
      folder.add(this.guiControls, 'sizeX', 0.1, 5.0, 0.1).name('Dimensión X : ').listen();
      folder.add(this.guiControls, 'sizeY', 0.1, 5.0, 0.1).name('Dimensión Y : ').listen();
      folder.add(this.guiControls, 'sizeZ', 0.1, 5.0, 0.1).name('Dimensión Z : ').listen();

      folder.add(this.guiControls, 'reset').name ('[ Reset ]');

      folder.add(this.guiControls, 'axisOnOff').name('Mostrar ejes: ').listen();
  }
  
  update () {
    this.scale.set (this.guiControls.sizeX,this.guiControls.sizeY,this.guiControls.sizeZ);
    this.caja.material.flatShading = this.parent.guiControls.flatShading;
    this.caja.material.needsUpdate = true;
    this.rotateY(0.008);
    this.rotateX(0.008);
  }
}

export { Caja };