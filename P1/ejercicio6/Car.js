import * as THREE from '../libs/three.module.js'
import { MTLLoader } from '../libs/MTLLoader.js'
import { OBJLoader } from '../libs/OBJLoader.js'

class Car extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);
    
    var that = this;
    var materialLoader = new MTLLoader();
    var objectLoader = new OBJLoader();
    materialLoader.load(
        '../models/porsche911/911.mtl',
        function (materials) {
          objectLoader.setMaterials(materials);
          objectLoader.load(
              '../models/porsche911/Porsche_911_GT2.obj',
              function (object) {
                that.modelo = object;
                that.add(that.modelo);
              }, null, null)
        }
    );
  }
  
  createGUI (gui,titleGui) {
  }
  
  update () {
    if(this.parent.guiControls.giroContinuo)
      this.rotateY(0.01);
  }
}

export { Car };
