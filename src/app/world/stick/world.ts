import * as THREE from 'three';
import { Stick } from './stick';

export class World{
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(
        sceneConfig.cameraProperty.fieldOfView,
        sceneConfig.cameraProperty.aspectRatio,
        sceneConfig.cameraProperty.nearPlane,
        sceneConfig.cameraProperty.farPlane
    );

    stick = new Stick();
    light = new THREE.SpotLight(0xffffff, 3);

    constructor(){
        this.scene.add(this.stick.stick);
        this.light.position.copy(sceneConfig.objectPositions.light);
        this.scene.add(this.light);

        this.camera.position.copy(sceneConfig.objectPositions.camera);
        this.camera.lookAt(this.scene.position);
    }

    /**
     * Return a point on the *xy* plane,
     * that will be rendered at current mouse location.
     */
    getMouseWorldPosition(screen2: Electron.Point): THREE.Vector3 {
        const { x: mouseX, y: mouseY } = screen2;
        const vec = new THREE.Vector3(
            (mouseX / window.innerWidth) * 2 - 1,
            -(mouseY / window.innerHeight) * 2 + 1,
            0.5);
        vec.unproject(this.camera).sub(this.camera.position);
        const distance = - this.camera.position.z / vec.z;
        vec.multiplyScalar(distance).add(this.camera.position);
        return vec;
    }
}

const sceneConfig = {
    cameraProperty: {
        fieldOfView: 75,
        aspectRatio: window.innerWidth / window.innerHeight,
        nearPlane: 0.1,
        farPlane: 200
    },
    objectPositions: {
        camera: new THREE.Vector3(0, 0, 20),
        light: new THREE.Vector3(0, 100, 30)
    }
};