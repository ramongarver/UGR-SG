import * as THREE from '../libs/three.module.js'
import {
  BoxGeometry,
  BufferGeometry,
  CylinderGeometry,
  ExtrudeBufferGeometry,
  Mesh,
  SphereBufferGeometry
} from "../libs/three.module.js";
import {ThreeBSP} from "../libs/ThreeBSP.js";
 
class Escuadra extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);

    var escuadraShape = new THREE.Shape();
    escuadraShape.moveTo(0.5, -5.0);
    escuadraShape.lineTo(-0.5, -5.0);
    escuadraShape.lineTo(-0.5, 5.0);
    escuadraShape.lineTo(9.5, 5.0);
    escuadraShape.lineTo(9.5, 4.0);
    escuadraShape.lineTo(1.5, 4.0);
    escuadraShape.quadraticCurveTo(0.5, 4.0, 0.5, 3.0);
    escuadraShape.lineTo(0.5, -5.0);

    var escuadraShapeOptions = {
      depth: 3,
      bevelEnabled: false
    }

    var escuadraShapeGeom = new THREE.ExtrudeGeometry(escuadraShape, escuadraShapeOptions);
    escuadraShapeGeom.translate(0.0, 0.0, -1.5);
    var escuadraSinAgujerosBSP = new ThreeBSP(escuadraShapeGeom);

    var perforacionSuperior = new CylinderGeometry(2/3, 1/3, 0.5, 24);
    perforacionSuperior.translate(0.0, 0.25, 0.0);
    var perforacionInferior = new CylinderGeometry(1/3, 1/3, 0.5, 24);
    perforacionInferior.translate(0.0, -0.25, 0.0);

    var perforacionSuperiorBSP = new ThreeBSP(perforacionSuperior);
    var perforacionInferiorBSP = new ThreeBSP(perforacionInferior);
    var perforacionBSP = perforacionSuperiorBSP.union(perforacionInferiorBSP);

    var perforacion1 = perforacionBSP.toGeometry();
    perforacion1.rotateX(Math.PI);
    perforacion1.translate(5.0, 4.5, 0.0);
    var perforacion2 = perforacionBSP.toGeometry();
    perforacion2.rotateZ(-Math.PI/2);
    perforacion2.translate(0.0, -0.5, 0.0);

    var perforacion1BSP = new ThreeBSP(perforacion1);
    var perforacion2BSP = new ThreeBSP(perforacion2);
    var perforacionesBSP = perforacion1BSP.union(perforacion2BSP);

    var escuadraBSP = escuadraSinAgujerosBSP.subtract(perforacionesBSP);

    var escuadraGeomNB = escuadraBSP.toGeometry();
    var escuadraGeom = new BufferGeometry().fromGeometry(escuadraGeomNB);
    var escuadraMat = new THREE.MeshNormalMaterial();
    this.escuadra = new Mesh(escuadraGeom, escuadraMat);
    this.add(this.escuadra);
  }
  
  createGUI (gui,titleGui) {
  }
  
  update () {

  }
}

export { Escuadra };
