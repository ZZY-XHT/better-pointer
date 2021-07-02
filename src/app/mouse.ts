import { remote } from 'electron';
import * as THREE from 'three';

/**
 * Return the coordinate of the mouse,
 * where the coordinate of screen's upper left corner is (0,0)
 * 
 * Since we set IgnoreMouseEvents to true, mousemove event will not be triggered.
 * Instead, we get the coordinate via the electron process.
 */
export function getMouseCanvasPosition(): Electron.Point{
    //TODO: consider multiple screen
    return remote.screen.getCursorScreenPoint();
}

/**
 * Return a point on the *xy* plane,
 * that will be rendered at current mouse location.
 */
export function getMouseWorldPosition(camera: THREE.PerspectiveCamera): THREE.Vector3{
    const {x: mouseX, y: mouseY} = getMouseCanvasPosition();
    const vec = new THREE.Vector3(
        (mouseX / window.innerWidth) * 2 - 1,
        -(mouseY / window.innerHeight) * 2 + 1,
        0.5);
    vec.unproject(camera).sub(camera.position);
    const distance = - camera.position.z / vec.z;
    vec.multiplyScalar(distance).add(camera.position);
    return vec;
}