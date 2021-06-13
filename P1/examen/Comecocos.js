import * as THREE from '../libs/three.module.js'
import {
  BoxGeometry,
  BufferGeometry,
  CylinderGeometry, MeshNormalMaterial,
  MeshPhongMaterial,
  SphereGeometry
} from "../libs/three.module.js";
import {ThreeBSP} from "../libs/ThreeBSP.js";
import * as TWEEN from "../libs/tween.esm.js";
 
class Comecocos extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);
    
    // Modelado del personaje
    var esferaGeom = new SphereGeometry(1, 12, 12);

    var cilindroOjosGeom = new CylinderGeometry(0.1, 0.1, 2, 12, 12);
    cilindroOjosGeom.rotateX(Math.PI/2);
    cilindroOjosGeom.rotateY(Math.PI/2);
    cilindroOjosGeom.translate(0.0, 0.5, 0.5);

    var bocaShape = new THREE.Shape();
    bocaShape.moveTo(0, Math.cos(Math.PI/2));
    bocaShape.lineTo(0, 0);
    bocaShape.lineTo(1, 0);
    bocaShape.quadraticCurveTo(1, -1, Math.cos(Math.PI/2), Math.cos(Math.PI/2));
    var shapeOptions = {
      depth: 4,
      bevelEnabled: false
    }
    var bocaGeom = new THREE.ExtrudeGeometry(bocaShape, shapeOptions);
    bocaGeom.translate(0, 0, -2);
    bocaGeom.rotateY(-Math.PI/2);

    this.esferaGeomBSP = new ThreeBSP(esferaGeom);
    this.cilindroOjosGeomBSP = new ThreeBSP(cilindroOjosGeom);
    this.bocaGeomBSP = new ThreeBSP(bocaGeom);

    var comecocosBSP = this.esferaGeomBSP.subtract(this.cilindroOjosGeomBSP).subtract(this.bocaGeomBSP);
    var comecocosGeom = new BufferGeometry().fromGeometry(comecocosBSP.toGeometry());

    var esferaMat = new MeshPhongMaterial({
      color: 0xFFFF00,
      flatShading: false
    });
    this.comecocos = new THREE.Mesh(comecocosGeom, esferaMat);
    this.add(this.comecocos);

    // Camino para la animación
    var spline = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-5, 4.0, 5.0),
        new THREE.Vector3(-5, 4.0, -10),
        new THREE.Vector3(15, 4.0, -10),
        new THREE.Vector3(15, 4.0, 5),
        new THREE.Vector3(5, 4.0, 5),
        new THREE.Vector3(5, 4.0, 20),
        new THREE.Vector3(-5, 4.0, 20),
        new THREE.Vector3(-5, 4.0, 5.0)
    ])
    var lineaGeom = new THREE.BufferGeometry().setFromPoints(spline.getPoints(100));
    var lineaMat = new THREE.LineBasicMaterial({ color: 0xFF0000 });

    this.linea = new THREE.Line(lineaGeom, lineaMat);
    this.add(this.linea);

    var origen = { p: 0 };
    var destinoIntermedio = { p: 0.6 };
    var destinoFinal = { p: 1 };

    var movimiento1 = new TWEEN.Tween(origen).to(destinoIntermedio, 6000).easing(TWEEN.Easing.Quadratic.InOut);
    var that = this;
    movimiento1.onUpdate(function () {
      var position = spline.getPointAt(origen.p);
      that.comecocos.position.copy(position);
      var tangente = spline.getTangentAt(origen.p);
      position.add(tangente);
      that.comecocos.lookAt(position);
    });

    var movimiento2 = new TWEEN.Tween(destinoIntermedio).to(destinoFinal, 4000).easing(TWEEN.Easing.Quadratic.InOut);
    var that = this;
    movimiento2.onUpdate(function () {
      var position = spline.getPointAt(destinoIntermedio.p);
      that.comecocos.position.copy(position);
      var tangente = spline.getTangentAt(destinoIntermedio.p);
      position.add(tangente);
      that.comecocos.lookAt(position);
    });

    movimiento1.chain(movimiento2);
    movimiento2.chain(movimiento1);

    movimiento1.start();
  }
  
  createGUI (gui,titleGui) {
  }
  
  update () {
    TWEEN.update();
  }
}

export { Comecocos };
