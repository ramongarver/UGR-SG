import * as THREE from '../libs/three.module.js'
import {BufferGeometry, Mesh, SphereBufferGeometry} from "../libs/three.module.js";
import {ThreeBSP} from "../libs/ThreeBSP.js";
 
class Tuerca extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);
    
    var cilindro = new THREE.CylinderGeometry(5.0, 5.0, 4.0, 6);
    var esfera = new THREE.SphereGeometry(5.1, 32, 32);

    var cilindroBSP = new ThreeBSP(cilindro);
    var esferaBSP = new ThreeBSP(esfera);
    var tuercaSinAgujerosBSP = cilindroBSP.intersect(esferaBSP);

    var agujero = crear_dientes();
    agujero.scale(6.0, 6.0, 6.0);
    var agujeroBSP = new ThreeBSP(agujero);

    var tuercaBSP = tuercaSinAgujerosBSP.subtract(agujeroBSP);

    var tuercaGeomNB = tuercaBSP.toGeometry();
    var tuercaGeom = new BufferGeometry().fromGeometry(tuercaGeomNB);
    var tuercaMat = new THREE.MeshNormalMaterial({
      transparent: true,
      opacity: 0.7,
      backSide: true
    });
    this.tuerca = new THREE.Mesh(tuercaGeom, tuercaMat);

    this.add(this.tuerca);
  }

  createGUI (gui,titleGui) {
  }
  
  update () {

  }
}

function crear_dientes() {
  var puntos = [];

  puntos.push(new THREE.Vector3(0, -0.7, 0));
  puntos.push(new THREE.Vector3(0.5, -0.7, 0));
  puntos.push(new THREE.Vector3(0.4, -0.65, 0));
  puntos.push(new THREE.Vector3(0.5, -0.6, 0));
  puntos.push(new THREE.Vector3(0.4, -0.55, 0));
  puntos.push(new THREE.Vector3(0.5, -0.5, 0));
  puntos.push(new THREE.Vector3(0.4, -0.45, 0));
  puntos.push(new THREE.Vector3(0.5, -0.4, 0));
  puntos.push(new THREE.Vector3(0.4, -0.35, 0));
  puntos.push(new THREE.Vector3(0.5, -0.3, 0));
  puntos.push(new THREE.Vector3(0.4, -0.25, 0));
  puntos.push(new THREE.Vector3(0.5, -0.2, 0));
  puntos.push(new THREE.Vector3(0.4, -0.15, 0));
  puntos.push(new THREE.Vector3(0.5, -0.1, 0));
  puntos.push(new THREE.Vector3(0.4, -0.05, 0));
  puntos.push(new THREE.Vector3(0.5, 0, 0));
  puntos.push(new THREE.Vector3(0.4, 0.05, 0));
  puntos.push(new THREE.Vector3(0.5, 0.1, 0));
  puntos.push(new THREE.Vector3(0.4, 0.15, 0));
  puntos.push(new THREE.Vector3(0.5, 0.2, 0));
  puntos.push(new THREE.Vector3(0.4, 0.25, 0));
  puntos.push(new THREE.Vector3(0.5, 0.3, 0));
  puntos.push(new THREE.Vector3(0.4, 0.35, 0));
  puntos.push(new THREE.Vector3(0.5, 0.4, 0));
  puntos.push(new THREE.Vector3(0.4, 0.45, 0));
  puntos.push(new THREE.Vector3(0.5, 0.5, 0));
  puntos.push(new THREE.Vector3(0, 0.5, 0));

  return new THREE.LatheGeometry(puntos, 12, 0, 2*Math.PI);
}


export { Tuerca };
