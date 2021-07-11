import * as THREE from 'three';
import { randFloat } from 'three/src/math/MathUtils';
import { MousePoint } from '../../util/mouse';
import { createRenderer, IModel } from '../interface';
import { stickProperty } from './stick';
import { World } from './world';

const modelConfig = {
    kLowerBound: 0.9999999,
    boxCenter: new THREE.Vector3(0, -80, 10)
};

export class Model extends IModel {
    renderer = createRenderer();
    world = new World();
    stick = this.world.stick;

    stickLen = stickProperty.length;

    updateCanvas(screen2: MousePoint): void {
        const newTop = this.world.getMouseWorldPosition(screen2);
        const curBottom = this.stick.getBottom();
        console.log(curBottom);

        const k = randFloat(modelConfig.kLowerBound, 1);
        const circleRadius = Math.sqrt(1 - k * k) * this.stickLen;
        const circlePlaneNormal = curBottom.sub(newTop).normalize();
        const circleCenter = newTop.clone().addScaledVector(circlePlaneNormal, k*this.stickLen);
        const circlePlane = new THREE.Plane(circlePlaneNormal, -circleCenter.dot(circlePlaneNormal));
        
        const projectedBoxCenter = new THREE.Vector3(0, 0, 0);
        circlePlane.projectPoint(modelConfig.boxCenter, projectedBoxCenter);

        const disp = projectedBoxCenter.sub(circleCenter).normalize();
        const newBottom = circleCenter.addScaledVector(disp,circleRadius);

        this.stick.placeTopLine(newTop, newBottom);
        this.renderer.render(this.world.scene, this.world.camera);
    }
}