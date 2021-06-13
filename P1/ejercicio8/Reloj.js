import * as THREE from '../libs/three.module.js'
import {Mesh, SphereBufferGeometry} from "../libs/three.module.js";
 
class Reloj extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);
    
    var horaGeom = new SphereBufferGeometry(0.5);
    horaGeom.translate(0.0, 0.0, -10.0);
    var horaMat = new THREE.MeshPhongMaterial({color: 0x00AA00});

    this.doce = new Mesh(horaGeom, horaMat);
    this.add(this.doce);

    this.una = new Mesh(horaGeom, horaMat);
    this.una.rotation.y = -Math.PI/6;
    this.add(this.una);

    this.una = new Mesh(horaGeom, horaMat);
    this.una.rotation.y = -Math.PI/6;
    this.add(this.una);

    this.dos = new Mesh(horaGeom, horaMat);
    this.dos.rotation.y = -2*Math.PI/6;
    this.add(this.dos);

    this.tres = new Mesh(horaGeom, horaMat);
    this.tres.rotation.y = -3*Math.PI/6;
    this.add(this.tres);

    this.cuatro = new Mesh(horaGeom, horaMat);
    this.cuatro.rotation.y = -4*Math.PI/6;
    this.add(this.cuatro);

    this.cinco = new Mesh(horaGeom, horaMat);
    this.cinco.rotation.y = -5*Math.PI/6;
    this.add(this.cinco);

    this.seis = new Mesh(horaGeom, horaMat);
    this.seis.rotation.y = -6*Math.PI/6;
    this.add(this.seis);

    this.siete = new Mesh(horaGeom, horaMat);
    this.siete.rotation.y = -7*Math.PI/6;
    this.add(this.siete);

    this.ocho = new Mesh(horaGeom, horaMat);
    this.ocho.rotation.y = -8*Math.PI/6;
    this.add(this.ocho);

    this.nueve = new Mesh(horaGeom, horaMat);
    this.nueve.rotation.y = -9*Math.PI/6;
    this.add(this.nueve);

    this.diez = new Mesh(horaGeom, horaMat);
    this.diez.rotation.y = -10*Math.PI/6;
    this.add(this.diez);

    this.once = new Mesh(horaGeom, horaMat);
    this.once.rotation.y = -11*Math.PI/6;
    this.add(this.once);

    var agujaGeom = new SphereBufferGeometry(0.5);
    agujaGeom.translate(0.0, 0.0, -9.0);
    var agujaMat = new THREE.MeshPhongMaterial({ color: 0xAA0000 });
    this.aguja = new Mesh(agujaGeom, agujaMat);
    this.add(this.aguja);

    this.tiempoAnterior = Date.now();
  }
  
  createGUI (gui,titleGui) {
    // Controles para el tamaño, la orientación y la posición de la caja
    this.guiControls = new function () {
      this.velocidad = 1.0;
    }

    var folder = gui.addFolder (titleGui);
    folder.add(this.guiControls, 'velocidad', -12, 12, 1).name("Velocidad (marcas/s)")
  }
  
  update () {
    this.velocidad = this.guiControls.velocidad * (-Math.PI/6);
    var tiempoActual = Date.now();
    var tiempo = (tiempoActual - this.tiempoAnterior)/1000;
    this.aguja.rotation.y += this.velocidad * tiempo;
    this.tiempoAnterior = tiempoActual;
  }
}

export { Reloj };
