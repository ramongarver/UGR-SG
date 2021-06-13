import * as THREE from '../libs/three.module.js'
 
class Toroide extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);
    
    // Un Mesh se compone de geometría y material
    var toroideGeom = new THREE.TorusBufferGeometry(this.guiControls.radioPrincipal, this.guiControls.radioTubo, this.guiControls.resolucionTubo, this.guiControls.resolucionToroide);
    // Como material se crea uno a partir de un color
    var toroideMat = new THREE.MeshNormalMaterial();
    
    // Ya podemos construir el Mesh
    this.toroide = new THREE.Mesh (toroideGeom, toroideMat);
    // Y añadirlo como hijo del Object3D (el this)
    this.add(this.toroide);
  }
  
  createGUI (gui,titleGui) {
    // Controles para el tamaño de la caja
    this.guiControls = new function () {
      this.radioPrincipal = 1.0;
      this.radioTubo = 0.2;
      this.resolucionToroide = 3.0;
      this.resolucionTubo = 3.0;

      this.axisOnOff = true;

      this.reset = function () {
        this.radioPrincipal = 1.0;
        this.radioTubo = 0.2;
        this.resolucionToroide = 3.0;
        this.resolucionTubo = 3.0;
      }
    }

    // Se crea una sección para los controles de la caja
    var folder = gui.addFolder(titleGui);
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
    folder.add(this.guiControls, 'radioPrincipal', 1.0, 5.0, 0.1).name('Radio Principal: ').listen();
    folder.add(this.guiControls, 'radioTubo', 0.2, 1.0, 0.1).name('Radio Tubo: ').listen();
    folder.add(this.guiControls, 'resolucionToroide', 3, 16, 1).name('Res. Toroide: ').listen();
    folder.add(this.guiControls, 'resolucionTubo', 3, 16, 1).name('Res. Tubo: ').listen();

    folder.add(this.guiControls, 'reset').name ('[ Reset ]');

    folder.add(this.guiControls, 'axisOnOff').name('Mostrar ejes: ').listen();
  }
  
  update () {
    this.toroide.geometry = new THREE.TorusBufferGeometry(this.guiControls.radioPrincipal, this.guiControls.radioTubo, this.guiControls.resolucionTubo, this.guiControls.resolucionToroide);
    this.toroide.material.flatShading = this.parent.guiControls.flatShading;
    this.toroide.material.needsUpdate = true;
    this.rotateY(0.008);
    this.rotateX(0.008);
  }
}

export { Toroide };
