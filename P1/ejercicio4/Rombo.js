import * as THREE from '../libs/three.module.js'
import {
  BufferGeometry,
  ExtrudeBufferGeometry,
  Mesh,
  MeshNormalMaterial,
  ShapeGeometry,
  SphereBufferGeometry
} from "../libs/three.module.js";

class Rombo extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);
    
    var rombo = new THREE.Shape();
    rombo.moveTo(0.0, -7.0);
    rombo.lineTo(5.0, 0.0);
    rombo.lineTo(0.0, 7.0);
    rombo.lineTo(-5.0, 0.0);
    rombo.lineTo(0.0, -7.0);
    var romboOptions = {
      depth: 1,
      bevelEnabled: true,
      bevelThickness: 0.25,
      bevelSize: 0.25,
      bevelSegments: 16,
      curveSegments: 16,
      steps: 1,
    }

    var romboGeom = new ExtrudeBufferGeometry(rombo, romboOptions);
    var redMat = new THREE.MeshPhongMaterial({ color: 0xFF0000 });
    this.rombo = new Mesh(romboGeom, redMat);

    this.add(this.rombo);
  }
  
  createGUI (gui,titleGui) {
  }
  
  update () {

  }
}

export { Rombo };
