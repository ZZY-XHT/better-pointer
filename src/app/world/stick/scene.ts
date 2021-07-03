import * as THREE from 'three';
import { sceneConfig, userConfig } from './config';
import { getMouseCanvasPosition } from '../../util/mouse';

export class Scene{
    renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById('render-canvas') as HTMLCanvasElement,
        alpha: true,
        antialias: userConfig.graphics.useAntiAlias
    });
    scene = new THREE.Scene();
    stick = new THREE.Mesh(
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
    light = new THREE.SpotLight(0xffffff, 3);
    camera = new THREE.PerspectiveCamera(
        sceneConfig.cameraProperty.fieldOfView,
        sceneConfig.cameraProperty.aspectRatio,
        sceneConfig.cameraProperty.nearPlane,
        sceneConfig.cameraProperty.farPlane
    );
    tmp1 = new THREE.Mesh(
        new THREE.SphereGeometry(0.4, 32, 32),
        new THREE.MeshBasicMaterial({ color: 0xffff00 })
    );

    constructor(){
        this.renderer.setClearColor(0x000000, 0);
        this.renderer.setPixelRatio(userConfig.graphics.pixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        this.scene.add(this.stick);

        this.light.position.copy(sceneConfig.objectPositions.light);
        this.scene.add(this.light);

        this.camera.position.copy(sceneConfig.objectPositions.camera);
        this.camera.lookAt(this.scene.position);

        this.tmp1.position.set(0, -5, 10);
        this.scene.add(this.tmp1);
    }

    /**
     * Return a point on the *xy* plane,
     * that will be rendered at current mouse location.
     */
    getMouseWorldPosition(): THREE.Vector3 {
        const { x: mouseX, y: mouseY } = getMouseCanvasPosition();
        const vec = new THREE.Vector3(
            (mouseX / window.innerWidth) * 2 - 1,
            -(mouseY / window.innerHeight) * 2 + 1,
            0.5);
        vec.unproject(this.camera).sub(this.camera.position);
        const distance = - this.camera.position.z / vec.z;
        vec.multiplyScalar(distance).add(this.camera.position);
        return vec;
    }

    placeStickTop(top: THREE.Vector3){
        //find displacement from top point to middle point
        const disp = new THREE.Vector3(0, -sceneConfig.stickProperty.length / 2, 0);
        disp.applyQuaternion(this.stick.quaternion);
        //transform top point to middle point
        this.stick.position.addVectors(top, disp);
    }

    /**
     * Place the stick with current rotation angle
     * s.t. **bottom** is the coordinate of lower surface center of the cylinder
     */
    placeStickBottom(bottom: THREE.Vector3) {
        const disp = new THREE.Vector3(0, sceneConfig.stickProperty.length / 2, 0);
        disp.applyQuaternion(this.stick.quaternion);
        this.stick.position.addVectors(bottom, disp);
    }

    /**
     * Place the stick
     * s.t. **top** is the coordinate of upper surface center of the cylinder
     * **p** is on the stick or the extension of the stick
     */
    placeStickTopLine(top: THREE.Vector3, p: THREE.Vector3) {
        //find the displacement from top to middle
        p.sub(top).normalize();
        //set direction
        const axis = new THREE.Vector3(0, -1, 0);
        this.stick.quaternion.setFromUnitVectors(axis, p.normalize());
        //set middle point
        p.multiplyScalar(sceneConfig.stickProperty.length / 2);
        this.stick.position.addVectors(top, p);
    }

    /**
     * Place the stick
     * s.t. **bottom** is the coordinate of upper surface center of the cylinder
     * **p** is on the stick or the extension of the stick
     */
    placeStickBottomLine(bottom: THREE.Vector3, p: THREE.Vector3) {
    //find the displacement from top to middle
        p.sub(bottom).normalize();
        //set direction
        const axis = new THREE.Vector3(0, 1, 0);
        this.stick.quaternion.setFromUnitVectors(axis, p.normalize());
        //set middle point
        p.multiplyScalar(sceneConfig.stickProperty.length / 2);
        this.stick.position.addVectors(bottom, p);
    }
}