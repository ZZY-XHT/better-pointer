import { remote } from 'electron';
import * as THREE from 'three';

/**
 * Since we set IgnoreMouseEvents to true
 * We cannot use html's mouseover to get cursor location
 * even if our window is in fullscreen
 */
export function getMouseCanvasPosition(): Electron.Point{
    return remote.screen.getCursorScreenPoint();
}

export function getMouseWorldPosition(camera: THREE.PerspectiveCamera): THREE.Vector3{
    const {x: mouseX,y: mouseY} = getMouseCanvasPosition();
    const vec = new THREE.Vector3(
        (mouseX / window.innerWidth) * 2 - 1,
        -(mouseY / window.innerHeight) * 2 + 1,
        0.5);
    vec.unproject(camera);
    vec.sub(camera.position).normalize();
    const distance = - camera.position.z / vec.z;
    const ans = new THREE.Vector3();
    ans.copy(camera.position).add(vec.multiplyScalar(distance));
    return ans;
}