import * as THREE from "../libs/three.module.js";
import * as TWEEN from "../libs/tween.esm.js";

class Nave extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();

    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);

    var spline = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.0, 3.0, 0.0),
      new THREE.Vector3(9.0, 2.0, 6.0),
      new THREE.Vector3(15.0, 3.0, 0.0),
      new THREE.Vector3(9.0, 3.5, -6.0),
      new THREE.Vector3(0.0, 2.0, 0.0),
      new THREE.Vector3(-9.0, 1.5, 6.0),
      new THREE.Vector3(-15.0, 2.0, 0.0),
      new THREE.Vector3(-9.0, 3.5, -6.0),
      new THREE.Vector3(0.0, 3.0, 0.0)
    ]);

    var lineaGeom = new THREE.BufferGeometry().setFromPoints(spline.getPoints(100));
    var lineaMat = new THREE.LineBasicMaterial({ color: 0xFF0000 });

    this.linea = new THREE.Line(lineaGeom, lineaMat);
    this.add(this.linea);

    var naveGeom = new THREE.ConeBufferGeometry(0.25, 2.0, 3.0, 2.0);
    naveGeom.translate(0.0, -1.0, 0.0);
    naveGeom.rotateX(Math.PI/2);
    var texture = new THREE.TextureLoader().load("../imgs/textura-ajedrezada-marco.jpg");
    var naveMat = new THREE.MeshBasicMaterial({ map: texture });

    this.nave = new THREE.Mesh(naveGeom, naveMat);
    this.add(this.nave);


    var origen = { p: 0 };
    var destinoIntermedio = { p: 0.5 };
    var destinoFinal = { p: 1 };

    var movimiento1 = new TWEEN.Tween(origen).to(destinoIntermedio, 4000).easing(TWEEN.Easing.Quadratic.InOut);
    var that = this;
    movimiento1.onUpdate(function () {
      var position = spline.getPointAt(origen.p);
      that.nave.position.copy(position);
      var tangente = spline.getTangentAt(origen.p);
      position.add(tangente);
      that.nave.lookAt(position);
    });

    var movimiento2 = new TWEEN.Tween(destinoIntermedio).to(destinoFinal, 8000).easing(TWEEN.Easing.Quadratic.InOut);
    var that = this;
    movimiento2.onUpdate(function () {
      var position = spline.getPointAt(destinoIntermedio.p);
      that.nave.position.copy(position);
      var tangente = spline.getTangentAt(destinoIntermedio.p);
      position.add(tangente);
      that.nave.lookAt(position);
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

export { Nave };
