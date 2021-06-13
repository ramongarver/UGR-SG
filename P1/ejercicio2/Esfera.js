import * as THREE from '../libs/three.module.js'
 
class Esfera extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);
    
    // Un Mesh se compone de geometría y material
    var esferaGeom = new THREE.SphereBufferGeometry (this.guiControls.radioSuperior, this.guiControls.radioInferior, this.guiControls.altura, this.guiControls.resolucion);
    // Como material se crea uno a partir de un color
    var esferaMat = new THREE.MeshNormalMaterial();
    
    // Ya podemos construir el Mesh
    this.esfera = new THREE.Mesh (esferaGeom, esferaMat);
    // Y añadirlo como hijo del Object3D (el this)
    this.add(this.esfera);
  }
  
  createGUI (gui,titleGui) {
    // Controles para el tamaño de la caja
    this.guiControls = new function () {
      this.radio = 1.0;
      this.resolucionEcuador = 3.0;
      this.resolucionMeridiano = 2.0;

      this.axisOnOff = true;

      this.reset = function () {
        this.radio = 1.0;
        this.resolucionEcuador = 3.0;
        this.resolucionMeridiano = 2.0;
      }
    }

    // Se crea una sección para los controles de la caja
    var folder = gui.addFolder(titleGui);
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
    folder.add(this.guiControls, 'radio', 1.0, 5.0, 0.1).name('Radio: ').listen();
    folder.add(this.guiControls, 'resolucionEcuador', 3, 20, 1).name('Res. Ecuador: ').listen();
    folder.add(this.guiControls, 'resolucionMeridiano', 2, 10, 1).name('Res. Meridiano: ').listen();

    folder.add(this.guiControls, 'reset').name ('[ Reset ]');

    folder.add(this.guiControls, 'axisOnOff').name('Mostrar ejes: ').listen();
  }
  
  update () {
    this.esfera.geometry = new THREE.SphereBufferGeometry(this.guiControls.radio, this.guiControls.resolucionEcuador, this.guiControls.resolucionMeridiano);
    this.esfera.material.flatShading = this.parent.guiControls.flatShading;
    this.esfera.material.needsUpdate = true;
    this.rotateY(0.008);
    this.rotateX(0.008);
  }
}

export { Esfera };
