import * as THREE from 'three';
import { sceneConfig, userConfig } from './config';
import { getMouseWorldPosition } from './mouse';

//create a transparent three.js render that uses the canvas in the html
const canvas = document.getElementById('render-canvas') as HTMLCanvasElement ;
const renderer = new THREE.WebGLRenderer({
    canvas: canvas, 
    alpha: true,
    antialias: userConfig.graphics.useAntiAlias
});
renderer.setClearColor(0x000000, 0);
//set hidpi and renderer size
renderer.setPixelRatio(userConfig.graphics.pixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

//create a scene
const scene = new THREE.Scene();

//add a cylinder to the scene
const cylinder = new THREE.Mesh(
    new THREE.CylinderGeometry(
        sceneConfig.stickProperty.radiusTop, 
        sceneConfig.stickProperty.radiusBottom,
        sceneConfig.stickProperty.length,
        sceneConfig.stickProperty.radialSegments
    ),
    new THREE.MeshPhongMaterial({
        color: 0xff0000
    })
);
scene.add(cylinder);

//add light
const light = new THREE.SpotLight(0xffffff, 3);
light.position.copy(sceneConfig.objectPositions.light);
scene.add(light);

//add camera
//all coordinate TBC
const camera = new THREE.PerspectiveCamera(
    sceneConfig.cameraProperty.fieldOfView,
    sceneConfig.cameraProperty.aspectRatio,
    sceneConfig.cameraProperty.nearPlane,
    sceneConfig.cameraProperty.farPlane
);
camera.position.copy(sceneConfig.objectPositions.camera);
camera.lookAt(scene.position);


function animate() {
    requestAnimationFrame(animate);
    cylinder.position.copy(getMouseWorldPosition(camera));
    cylinder.rotateX(-0.05);
    renderer.render(scene, camera);
}
animate();
