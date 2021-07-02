import * as THREE from 'three';
import { getMouseWorldPosition } from './mouse';

//create a transparent three.js render that uses the canvas in the html
const canvas = document.getElementById('render-canvas') as HTMLCanvasElement ;
const renderer = new THREE.WebGLRenderer({
    canvas: canvas, 
    //antialiasing uses a lot of memory
    //antialias: true,
    alpha: true
});
renderer.setClearColor(0x000000, 0);
//set hidpi and renderer size
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

//create a scene
const scene = new THREE.Scene();

//add a cylinder to the scene
const cylinder = new THREE.Mesh(
    new THREE.CylinderGeometry(0.4, 0.8, 16, 32),
    new THREE.MeshPhongMaterial({
        color: 0xff0000
    })
);
cylinder.position.set(0,0,0);
scene.add(cylinder);

//add light
const light = new THREE.SpotLight(0xffffff, 3);
light.position.set(0, 100, 20);
scene.add(light);

//add camera
//all coordinate TBC
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 20);
camera.lookAt(scene.position);


function animate() {
    requestAnimationFrame(animate);
    cylinder.position.copy(getMouseWorldPosition(camera));
    cylinder.rotateX(0.05);
    renderer.render(scene, camera);
}
animate();
