import * as THREE from './threejs/three.module.js';
import { STLLoader } from './threejs/STLLoader.js';
import { OrbitControls } from './threejs/OrbitControls.js';

let scene, camera, renderer, object;

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color('#87CEFA');

    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / innerHeight,
        0.1,
        1000
    );

    camera.position.z = 10;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    scene.add(object);

    //controles
    let control = new OrbitControls(camera, renderer.domElement);

    //iluminação    
    let frontLight = new THREE.DirectionalLight(0xffffff);
    frontLight.position.set(0, 0, 10);//similar a posição da camera 
    scene.add(frontLight);

    let backLight = new THREE.DirectionalLight(0xffffff);
    backLight.position.set(0, 0, -10);
    scene.add(backLight);

    let topLight = new THREE.DirectionalLight(0xffffff);
    topLight.position.set(0, 10, 0);
    scene.add(topLight);

    animate();

}

//função de animação
function animate() {
    requestAnimationFrame(animate);
    //rotacionar:
    object.rotation.z += 0.01;


    renderer.render(scene, camera);

}

let loader = new STLLoader();
//método para carregar o modelo:
loader.load('/3dmodels/metropolis.stl', (model) => {
    object = new THREE.Mesh(
        model,
        new THREE.MeshLambertMaterial({ color: '#ffffff' })
    );
    object.scale.set(0.04, 0.04, 0.04);//ajusta o tamanhp
    object.position.set(0, -2, 0); //pois o modelo 3d pode estar em situação diferente
    object.rotation.x = -Math.PI / 2;

    init();
});

