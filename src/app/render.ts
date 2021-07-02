import * as THREE from 'three';
import { Vector3 } from 'three';
import { sceneConfig, userConfig } from './config';
import { getMouseWorldPosition } from './mouse';

//create a transparent three.js render that uses the canvas in the html
const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('render-canvas') as HTMLCanvasElement,
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
const stick = new THREE.Mesh(
    new THREE.CylinderGeometry(
        sceneConfig.stickProperty.radiusTop, 
        sceneConfig.stickProperty.radiusBottom,
        sceneConfig.stickProperty.length,
        sceneConfig.stickProperty.radialSegments
    ),
    new THREE.MeshPhongMaterial({
        color: 0xB87333
    })
);
scene.add(stick);

//add light
const light = new THREE.SpotLight(0xffffff, 3);
light.position.copy(sceneConfig.objectPositions.light);
scene.add(light);

//add camera
const camera = new THREE.PerspectiveCamera(
    sceneConfig.cameraProperty.fieldOfView,
    sceneConfig.cameraProperty.aspectRatio,
    sceneConfig.cameraProperty.nearPlane,
    sceneConfig.cameraProperty.farPlane
);
camera.position.copy(sceneConfig.objectPositions.camera);
camera.lookAt(scene.position);

/**
 * Place the cylinder with current rotation angle
 * s.t. **top** is the coordinate of upper surface center of the cylinder
 */
function placeStickTop(top: THREE.Vector3){
    //find displacement from top point to middle point
    const disp = new Vector3(0, -sceneConfig.stickProperty.length / 2, 0);
    disp.applyQuaternion(stick.quaternion);
    //transform top point to middle point
    stick.position.copy(top.add(disp));
}

stick.rotation.set(1, 2, -1);
function animate() {
    requestAnimationFrame(animate);
    placeStickTop(getMouseWorldPosition(camera));
    renderer.render(scene, camera);
}
animate();