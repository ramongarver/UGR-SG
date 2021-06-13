import * as THREE from '../libs/three.module.js'
import {
  BoxBufferGeometry,
  CylinderBufferGeometry,
  Geometry,
  MeshBasicMaterial,
  MeshPhongMaterial
} from "../libs/three.module.js";
 
class Pendulo extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);

    // Caja superior del péndulo grande
    var cajaSupGeom = new BoxBufferGeometry(1.0, 1.5, 1.0);
    var cajaSupMat = new MeshPhongMaterial({ color: 0x00AA00 })
    this.cajaSup = new THREE.Mesh(cajaSupGeom, cajaSupMat);

    // Cilindro eje del péndulo grande
    var cilindroGraGeom = new CylinderBufferGeometry(0.375, 0.375, 1.30);
    cilindroGraGeom.rotateX(Math.PI/2);
    var cilindroGraMat = new MeshPhongMaterial({ color: 0xFF00AA });
    this.cilindroGra = new THREE.Mesh(cilindroGraGeom, cilindroGraMat);

    // Caja centro del péndulo grande extensible
    var cajaCentroGeom = new BoxBufferGeometry(1.0, this.guiControls.longitudPiezaRoja, 1.0);
    cajaCentroGeom.translate(0.0, -this.guiControls.longitudPiezaRoja/2, 0.0);
    var cajaCentroMat = new MeshPhongMaterial({ color: 0xFF0000 });
    this.cajaCentro = new THREE.Mesh(cajaCentroGeom, cajaCentroMat);
    this.cajaCentro.position.y = -0.75;
    this.cajaCentro.scale.y = this.guiControls.longitudPiezaRoja/5;
    this.add(this.cajaCentro);

    // Caja inferior del péndulo grande
    var cajaInfGeom = new BoxBufferGeometry(1.0, 1.5, 1.0);
    cajaInfGeom.translate(0.0, -0.75 -0.75 - (this.guiControls.longitudPiezaRoja), 0.0);
    var cajaInfMat = new MeshPhongMaterial({ color: 0x00AA00 });
    this.cajaInf = new THREE.Mesh(cajaInfGeom, cajaInfMat);
    this.add(this.cajaInf);

    // Caja del péndulo pequeño
    var cajaPeqGeom = new BoxBufferGeometry(0.65, 5.0, 0.15);
    cajaPeqGeom.translate(0.0, -2.5, 0.0);
    var cajaPeqMat = new MeshPhongMaterial({ color: 0x0000AA })
    this.cajaPeq = new THREE.Mesh(cajaPeqGeom, cajaPeqMat);
    this.cajaPeq.position.y = 0.25;
    this.cajaPeq.position.z = -0.05;
    this.cajaPeq.scale.y = this.guiControls.longitudPiezaAzul/5;

    // Cilindro del eje del péndulo pequeño
    var cilindroPeqGeom = new CylinderBufferGeometry(0.125, 0.125, 0.40);
    cilindroPeqGeom.rotateX(Math.PI/2);
    cilindroPeqGeom.translate(0.0, 0.0, -0.10);
    var cilindroPeqMat = new MeshPhongMaterial({ color: 0x00AA00 });
    this.cilindroPeq = new THREE.Mesh(cilindroPeqGeom, cilindroPeqMat);

    // Rotación del péndulo pequeño
    this.rotacionZPeq = new THREE.Object3D();
    this.rotacionZPeq.rotation.z = this.guiControls.giroSegundoPendulo;
    this.rotacionZPeq.position.set(0.0,  -0.75 -(this.guiControls.longitudPiezaRoja/100) * this.guiControls.posicionPiezaAzul, 0.8);
    this.rotacionZPeq.add(this.cajaPeq);
    this.rotacionZPeq.add(this.cilindroPeq);

    // Rotación del péndulo grande y el péndulo pequeño
    this.rotacionZ = new THREE.Object3D();
    this.rotacionZ.rotation.z = this.guiControls.giroPrimerPendulo;
    this.rotacionZ.add(this.cajaSup);
    this.rotacionZ.add(this.cilindroGra);
    this.rotacionZ.add(this.cajaCentro);
    this.rotacionZ.add(this.cajaInf);
    this.rotacionZ.add(this.rotacionZPeq)
    this.add(this.rotacionZ);
  }
  
  createGUI (gui,titleGui) {
    this.guiControls = new function () {
      this.longitudPiezaRoja = 5;
      this.giroPrimerPendulo = 0.0;
      this.longitudPiezaAzul = 5;
      this.posicionPiezaAzul = 10.0;
      this.giroSegundoPendulo = 0.0;
    } 
    
    // Se crea una sección para los controles de la caja
    var folder = gui.addFolder ("Primer Péndulo");
    folder.add(this.guiControls, 'longitudPiezaRoja', 2, 20, 1).name("Longitud: ");
    folder.add(this.guiControls, 'giroPrimerPendulo', -Math.PI/4, Math.PI/4, 0.1).name("Giro: ");

    var folder2 = gui.addFolder("Segundo Péndulo");
    folder2.add(this.guiControls, 'longitudPiezaAzul', 2, 20, 1).name("Longitud: ");
    folder2.add(this.guiControls, 'posicionPiezaAzul', 10, 90, 1).name("Posición(%): ");
    folder2.add(this.guiControls, 'giroSegundoPendulo', -Math.PI/4, Math.PI/4, 0.1).name("Giro: ");
  }

  update () {
    this.rotacionZ.rotation.z = this.guiControls.giroPrimerPendulo;
    this.rotacionZPeq.rotation.z = this.guiControls.giroSegundoPendulo;
    this.rotacionZPeq.position.y = -0.75 -(this.guiControls.longitudPiezaRoja/100) * this.guiControls.posicionPiezaAzul;
    this.cajaCentro.scale.y = this.guiControls.longitudPiezaRoja/5;
    this.cajaInf.position.y = -(this.guiControls.longitudPiezaRoja - 5);
    this.cajaPeq.scale.y = this.guiControls.longitudPiezaAzul/5;
  }
}

export { Pendulo };
