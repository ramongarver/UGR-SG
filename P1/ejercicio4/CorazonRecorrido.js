import * as THREE from '../libs/three.module.js'
import {
  BufferGeometry,
  ExtrudeBufferGeometry,
  Mesh,
  MeshNormalMaterial,
  ShapeGeometry,
  SphereBufferGeometry
} from "../libs/three.module.js";

class CorazonRecorrido extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);
    
    var corazon = new THREE.Shape();
    corazon.moveTo(0.0, 4.2);
    corazon.quadraticCurveTo(0.0, 7.0, 2.5, 7.0);
    corazon.quadraticCurveTo(5.0, 7.0, 5.0, 2.8);
    corazon.quadraticCurveTo(5.0, -1.4, 0.0, -7.0);
    corazon.quadraticCurveTo(-5.0, -1.4, -5.0, 2.8);
    corazon.quadraticCurveTo(-5.0, 7.0, -2.5, 7.0);
    corazon.quadraticCurveTo(0.0, 7.0, 0.0, 4.2);
    var path = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-10, 0, 3),
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(5, -2, 4),
      new THREE.Vector3(10, 0, 8)
        /*new THREE.Vector3(1.0, -2.0, 1.0),
      new THREE.Vector3(0.0, 1.0, 0.0),
      new THREE.Vector3(1.0, 1.0, 1.0),
      new THREE.Vector3(0.0, 2.0, 0.0)*/
    ]);
    var corazonOptions = {
      depth: 1,
      bevelEnabled: true,
      bevelThickness: 0.25,
      bevelSize: 0.25,
      bevelSegments: 16,
      curveSegments: 16,
      steps: 1,
      extrudePath: path
    }

    var corazonGeom = new ExtrudeBufferGeometry(corazon, corazonOptions);
    var redMat = new THREE.MeshPhongMaterial({ color: 0x00FF00 });
    this.corazon = new Mesh(corazonGeom, redMat);

    this.add(this.corazon);
  }
  
  createGUI (gui,titleGui) {
  }
  
  update () {

  }
}

export { CorazonRecorrido };
