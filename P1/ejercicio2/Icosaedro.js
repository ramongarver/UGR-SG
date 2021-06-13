import * as THREE from '../libs/three.module.js'
 
class Icosaedro extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);
    
    // Un Mesh se compone de geometría y material
    var icosaedroGeom = new THREE.IcosahedronBufferGeometry(this.guiControls.radio, this.guiControls.subdivision);
    // Como material se crea uno a partir de un color
    var icosaedroMat = new THREE.MeshNormalMaterial();
    
    // Ya podemos construir el Mesh
    this.icosaedro = new THREE.Mesh (icosaedroGeom, icosaedroMat);
    // Y añadirlo como hijo del Object3D (el this)
    this.add(this.icosaedro);
  }
  
  createGUI (gui,titleGui) {
    // Controles para el tamaño de la caja
    this.guiControls = new function () {
      this.radio = 1.0;
      this.subdivision = 0.0;

      this.axisOnOff = true;

      this.reset = function () {
        this.radio = 1.0;
        this.subdivision = 0.0;
      }
    }

    // Se crea una sección para los controles de la caja
    var folder = gui.addFolder(titleGui);
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
    folder.add(this.guiControls, 'radio', 1.0, 6.0, 0.1).name('Radio: ').listen();
    folder.add(this.guiControls, 'subdivision', 0, 3, 1).name('Subdivisión: ').listen();

    folder.add(this.guiControls, 'reset').name ('[ Reset ]');

    folder.add(this.guiControls, 'axisOnOff').name('Mostrar ejes: ').listen();
  }
  
  update () {
    this.icosaedro.geometry = new THREE.IcosahedronBufferGeometry(this.guiControls.radio, this.guiControls.subdivision);
    this.icosaedro.material.flatShading = this.parent.guiControls.flatShading;
    this.icosaedro.material.needsUpdate = true;
    this.rotateY(0.008);
    this.rotateX(0.008);
  }
}

export { Icosaedro };
