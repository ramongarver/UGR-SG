import * as THREE from '../libs/three.module.js'
import {MeshPhongMaterial, Object3D} from "../libs/three.module.js";
import * as TWEEN from "../libs/tween.esm.js";
 
class BolaHelicoide extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);
    
    var cylinderGeom = new THREE.CylinderBufferGeometry (2,2,1.5, 24);
    var cylinderMat = new THREE.MeshNormalMaterial({
      transparent: true,
      opacity: 0.5
    });
    this.cylinder = new THREE.Mesh (cylinderGeom, cylinderMat);
    this.cylinder.position.y = 0.75;
    this.add( this.cylinder);

    var sphereGeom = new THREE.SphereBufferGeometry(0.25, 24, 24)
    sphereGeom.translate(0.0, 0.375, 0.0);
    var sphereMat = new THREE.MeshNormalMaterial();
    this.sphere = new THREE.Mesh(sphereGeom, sphereMat);
    this.add(this.sphere);

    this.recorridoCurve = new THREE.EllipseCurve(0.0, 0.0, 2 * (1 + this.guiControls.extension/10), 2, 0, 2*Math.PI);
    var recorridoGeom = new THREE.BufferGeometry().setFromPoints(this.recorridoCurve.getPoints(100));
    recorridoGeom.translate(0.0, 2.0, 0.0);
    var recorridoMat = new THREE.MeshPhongMaterial({ color: 0xFFFF00 });
    this.recorrido = new THREE.Mesh(recorridoGeom, recorridoMat);
    //this.add(this.recorrido);

    var origen = { p: 0 };
    var final = { p: 1 };

    var incremento = this.sphere.position.y;
    var movimiento = new TWEEN.Tween(final).to(origen, 4000);
    var that = this;
    movimiento.onUpdate(function () {
      var position = that.recorridoCurve.getPointAt(final.p);
      that.sphere.position.set(position.x, 0.4+0.5*Math.cos(incremento), position.y);
      incremento += 0.01;
    });

    movimiento.start().repeat(Infinity);
  }
  
  createGUI (gui,titleGui) {
    // Controles para el tamaño, la orientación y la posición de la caja
    this.guiControls = new function () {
      this.extension = 0.0;
    }
    
    // Se crea una sección para los controles de la caja
    var folder = gui.addFolder (titleGui);
    folder.add (this.guiControls, 'extension', 0.0, 30.0, 0.1).name ('Extensión: ').listen();
  }
  
  update () {
    this.cylinder.scale.x = 1 + this.guiControls.extension/10;
    this.recorridoCurve = new THREE.EllipseCurve(0.0, 0.0, 2 * (1 + this.guiControls.extension/10), 2, 0, 2*Math.PI);
    TWEEN.update();
  }
}

export { BolaHelicoide };

