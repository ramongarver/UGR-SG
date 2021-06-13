import * as THREE from '../libs/three.module.js'
 
class Cilindro extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);
    
    // Un Mesh se compone de geometría y material
    var cilindroGeom = new THREE.CylinderBufferGeometry (this.guiControls.radioSuperior, this.guiControls.radioInferior, this.guiControls.altura, this.guiControls.resolucion);
    // Como material se crea uno a partir de un color
    var cilindroMat = new THREE.MeshNormalMaterial();
    
    // Ya podemos construir el Mesh
    this.cilindro = new THREE.Mesh (cilindroGeom, cilindroMat);
    // Y añadirlo como hijo del Object3D (el this)
    this.add(this.cilindro);
  }
  
  createGUI (gui,titleGui) {
    // Controles para el tamaño de la caja
    this.guiControls = new function () {
      this.radioSuperior = 1.0;
      this.radioInferior = 1.0;
      this.altura = 1.0;
      this.resolucion = 3.0;

      this.axisOnOff = true;

      this.reset = function () {
        this.radioSuperior = 1.0;
        this.radioInferior = 1.0;
        this.altura = 1.0;
        this.resolucion = 3.0;
      }
    }

    // Se crea una sección para los controles de la caja
    var folder = gui.addFolder(titleGui);
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
    folder.add(this.guiControls, 'radioSuperior', 1.0, 5.0, 0.1).name('Radio Superior: ').listen();
    folder.add(this.guiControls, 'radioInferior', 1.0, 5.0, 0.1).name('Radio Inferior: ').listen();
    folder.add(this.guiControls, 'altura', 1.0, 5.0, 0.1).name('Altura : ').listen();
    folder.add(this.guiControls, 'resolucion', 3, 12, 1).name('Resolución : ').listen();

    folder.add(this.guiControls, 'reset').name ('[ Reset ]');

    folder.add(this.guiControls, 'axisOnOff').name('Mostrar ejes: ').listen();
  }
  
  update () {
    this.cilindro.geometry = new THREE.CylinderBufferGeometry(this.guiControls.radioSuperior, this.guiControls.radioInferior, this.guiControls.altura, this.guiControls.resolucion);
    this.cilindro.material.flatShading = this.parent.guiControls.flatShading;
    this.cilindro.material.needsUpdate = true;
    this.rotateY(0.008);
    this.rotateX(0.008);
  }
}

export { Cilindro };
