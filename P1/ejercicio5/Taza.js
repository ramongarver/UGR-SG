import * as THREE from '../libs/three.module.js'
import {BufferGeometry, Mesh, SphereBufferGeometry} from "../libs/three.module.js";
import {ThreeBSP} from "../libs/ThreeBSP.js";
 
class Taza extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);
    
    var cilindroExterno = new THREE.CylinderGeometry(5.0, 5.0, 10.0, 32);
    var cilindroInterno = new THREE.CylinderGeometry(4.5, 4.5, 8.0, 32);
    cilindroInterno.translate(0.0, 1.0, 0.0);
    var asa = new THREE.TorusGeometry(3.0, 0.5, 32, 24);
    asa.translate(-5.0, 0.0, 0.0);

    var cilindroExternoBSP = new ThreeBSP(cilindroExterno);
    var cilindroInternoBSP = new ThreeBSP(cilindroInterno);
    var asaBSP = new ThreeBSP(asa);
    var cuerpoTazaAsaBSP = cilindroExternoBSP.union(asaBSP);
    var tazaBSP = cuerpoTazaAsaBSP.subtract(cilindroInternoBSP);

    var tazaGeomNB = tazaBSP.toGeometry();
    var tazaGeom = new BufferGeometry().fromGeometry(tazaGeomNB);
    var tazaMat = new THREE.MeshNormalMaterial( { flatShading: true } );
    this.taza = new THREE.Mesh(tazaGeom, tazaMat);

    this.add(this.taza);
  }
  
  createGUI (gui,titleGui) {
  }
  
  update () {

  }
}

export { Taza };
