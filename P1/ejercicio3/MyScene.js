
// Clases de la biblioteca

import * as THREE from '../libs/three.module.js'
import { GUI } from '../libs/dat.gui.module.js'
import { TrackballControls } from '../libs/TrackballControls.js'

// Clases de mi proyecto
 
/// La clase fachada del modelo
/**
 * Usaremos una clase derivada de la clase Scene de Three.js para llevar el control de la escena y de todo lo que ocurre en ella.
 */

class MyScene extends THREE.Scene {
  constructor (myCanvas) {
    super();
    
    // Lo primero, crear el visualizador, pasándole el lienzo sobre el que realizar los renderizados.
    this.renderer = this.createRenderer(myCanvas);
    
    // Se añade a la gui los controles para manipular los elementos de esta clase
    this.gui = this.createGUI ();
    
    // Construimos los distinos elementos que tendremos en la escena
    
    // Todo elemento que se desee sea tenido en cuenta en el renderizado de la escena debe pertenecer a esta. Bien como hijo de la escena (this en esta clase) o como hijo de un elemento que ya esté en la escena.
    // Tras crear cada elemento se añadirá a la escena con   this.add(variable)
    this.createLights ();
    
    // Tendremos una cámara con un control de movimiento con el ratón
    this.createCamera ();
    
    // Y unos ejes. Imprescindibles para orientarnos sobre dónde están las cosas
    this.createAxis()

    this.points = [
      new THREE.Vector2(0.0, -1.4),
      new THREE.Vector2(1.0, -1.4),
      new THREE.Vector2(1.0, -1.1),
      new THREE.Vector2(0.5, -0.7),
      new THREE.Vector2(0.4, -0.4),
      new THREE.Vector2(0.4, 0.5),
      new THREE.Vector2(0.5, 0.6),
      new THREE.Vector2(0.3, 0.6),
      new THREE.Vector2(0.5, 0.8),
      new THREE.Vector2(0.55, 1.0),
      new THREE.Vector2(0.5, 1.2),
      new THREE.Vector2(0.3, 1.4),
      new THREE.Vector2(0.0, 1.5)
    ];

    // Perfil
    var peonPerfilGeom = new THREE.BufferGeometry().setFromPoints(this.points);
    var peonPerfilMat = new THREE.LineBasicMaterial({
      color: 0x0000FF,
    });
    this.peonPerfil = new THREE.Line(peonPerfilGeom, peonPerfilMat);
    this.peonPerfil.rotateY(-Math.PI/2);
    this.peonPerfil.position.x = -8;
    this.add(this.peonPerfil);

    // Peon parcial variable en ángulo y resolución
    var peonParcialGeom = new THREE.LatheBufferGeometry(this.points, this.guiControls.resolucion, 0.0, this.guiControls.angulo);
    var peonParcialMat = new THREE.MeshNormalMaterial({
      flatShading: this.guiControls.flatShading,
      side: THREE.DoubleSide,
    });
    this.peonParcial = new THREE.Mesh(peonParcialGeom, peonParcialMat);
    this.add(this.peonParcial);

    // Peon completo variable en resolución
    var peonGeom = new THREE.LatheBufferGeometry(this.points, this.guiControls.resolucion);
    var peonMat = new THREE.MeshNormalMaterial({
      flatShading: this.guiControls.flatShading,
      side: THREE.DoubleSide,
    });
    this.peon = new THREE.Mesh(peonGeom, peonMat);
    this.peon.position.x = 8;
    this.add(this.peon);
  }

  createAxis() {
    this.axisMain = new THREE.AxesHelper(5);
    this.add(this.axisMain);

    this.axisPerfil = new THREE.AxesHelper(5);
    this.axisPerfil.position.x = -8;
    this.add(this.axisPerfil);
  }

  createCamera () {
    // Para crear una cámara le indicamos
    //   El ángulo del campo de visión en grados sexagesimales
    //   La razón de aspecto ancho/alto
    //   Los planos de recorte cercano y lejano
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    // También se indica dónde se coloca
    this.camera.position.set (30, 20, 30);
    // Y hacia dónde mira
    var look = new THREE.Vector3 (0,0,0);
    this.camera.lookAt(look);
    this.add (this.camera);
    
    // Para el control de cámara usamos una clase que ya tiene implementado los movimientos de órbita
    this.cameraControl = new TrackballControls (this.camera, this.renderer.domElement);
    // Se configuran las velocidades de los movimientos
    this.cameraControl.rotateSpeed = 5;
    this.cameraControl.zoomSpeed = -2;
    this.cameraControl.panSpeed = 0.5;
    // Debe orbitar con respecto al punto de mira de la cámara
    this.cameraControl.target = look;
  }
  
  createGUI () {
    // Se crea la interfaz gráfica de usuario
    var gui = new GUI();
    
    // La escena le va a añadir sus propios controles. 
    // Se definen mediante una new function()
    this.guiControls = new function() {
      // En el contexto de una función   this   alude a la función
      this.flatShading = true;
      this.animacion = false;

      this.resolucion = 3.0;
      this.angulo = 1.0;
    }

    // Se crea una sección para los controles de esta clase
    var folder1 = gui.addFolder ('Luz y Ejes');
    folder1.add (this.guiControls, 'flatShading').name ('Sombrado plano: ');
    folder1.add (this.guiControls, 'animacion').name ('Animación: ');

    var folder2 = gui.addFolder('Parametros Revolución')
    folder2.add(this.guiControls, 'resolucion', 3, 20, 1).name('Resolución: ').listen();
    folder2.add(this.guiControls, 'angulo', 0.1, 2*Math.PI, 0.1).name('Ángulo: ').listen();

    return gui;
  }
  
  createLights () {
    // Se crea una luz ambiental, evita que se vean completamente negras las zonas donde no incide de manera directa una fuente de luz
    // La luz ambiental solo tiene un color y una intensidad
    // Se declara como   var   y va a ser una variable local a este método
    //    se hace así puesto que no va a ser accedida desde otros métodos
    var ambientLight = new THREE.AmbientLight(0xccddee, 0.35);
    // La añadimos a la escena
    this.add (ambientLight);
    
    // Se crea una luz focal que va a ser la luz principal de la escena
    // La luz focal, además tiene una posición, y un punto de mira
    // Si no se le da punto de mira, apuntará al (0,0,0) en coordenadas del mundo
    // En este caso se declara como   this.atributo   para que sea un atributo accesible desde otros métodos.
    this.spotLight = new THREE.SpotLight( 0xffffff, this.guiControls.lightIntensity );
    this.spotLight.position.set( 60, 60, 40 );
    this.add (this.spotLight);
  }
  
  createRenderer (myCanvas) {
    // Se recibe el lienzo sobre el que se van a hacer los renderizados. Un div definido en el html.
    
    // Se instancia un Renderer   WebGL
    var renderer = new THREE.WebGLRenderer();
    
    // Se establece un color de fondo en las imágenes que genera el render
    renderer.setClearColor(new THREE.Color(0xEEEEEE), 1.0);
    
    // Se establece el tamaño, se aprovecha la totalidad de la ventana del navegador
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    // La visualización se muestra en el lienzo recibido
    $(myCanvas).append(renderer.domElement);
    
    return renderer;  
  }
  
  getCamera () {
    // En principio se devuelve la única cámara que tenemos
    // Si hubiera varias cámaras, este método decidiría qué cámara devuelve cada vez que es consultado
    return this.camera;
  }
  
  setCameraAspect (ratio) {
    // Cada vez que el usuario modifica el tamaño de la ventana desde el gestor de ventanas de
    // su sistema operativo hay que actualizar el ratio de aspecto de la cámara
    this.camera.aspect = ratio;
    // Y si se cambia ese dato hay que actualizar la matriz de proyección de la cámara
    this.camera.updateProjectionMatrix();
  }
  
  onWindowResize () {
    // Este método es llamado cada vez que el usuario modifica el tamaño de la ventana de la aplicación
    // Hay que actualizar el ratio de aspecto de la cámara
    this.setCameraAspect (window.innerWidth / window.innerHeight);
    
    // Y también el tamaño del renderizador
    this.renderer.setSize (window.innerWidth, window.innerHeight);
  }

  update () {
    // Se actualizan los elementos de la escena para cada frame
    // Se actualiza la intensidad de la luz con lo que haya indicado el usuario en la gui
    this.spotLight.intensity = this.guiControls.lightIntensity;

    // Se actualiza la posición de la cámara según su controlador
    this.cameraControl.update();

    // Le decimos al renderizador "visualiza la escena que te indico usando la cámara que te estoy pasando"
    this.renderer.render (this, this.getCamera());

    this.peonParcial.geometry = new THREE.LatheBufferGeometry(this.points, this.guiControls.resolucion, 0, this.guiControls.angulo);
    this.peonParcial.material.flatShading = this.guiControls.flatShading;
    this.peonParcial.material.needsUpdate = true;

    this.peon.geometry = new THREE.LatheBufferGeometry(this.points, this.guiControls.resolucion);
    this.peon.material.flatShading = this.guiControls.flatShading;
    this.peon.material.needsUpdate = true;

    // Este método debe ser llamado cada vez que queramos visualizar la escena de nuevo.
    // Literalmente le decimos al navegador: "La próxima vez que haya que refrescar la pantalla, llama al método que te indico".
    // Si no existiera esta línea,  update()  se ejecutaría solo la primera vez.
    requestAnimationFrame(() => this.update())
  }
}

/// La función   main
$(function () {
  
  // Se instancia la escena pasándole el  div  que se ha creado en el html para visualizar
  var scene = new MyScene("#WebGL-output");

  // Se añaden los listener de la aplicación. En este caso, el que va a comprobar cuándo se modifica el tamaño de la ventana de la aplicación.
  window.addEventListener ("resize", () => scene.onWindowResize());
  
  // Que no se nos olvide, la primera visualización.
  scene.update();
});
