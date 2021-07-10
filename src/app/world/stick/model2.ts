import { MousePoint } from '../../util/mouse';
import * as THREE from 'three';
import { randFloat } from 'three/src/math/MathUtils';
import { createRenderer, IModel } from '../interface';
import { stickProperty } from './stick';
import { World } from './world';

export class Model extends IModel {
    renderer = createRenderer();
    world = new World();
    stick = this.world.stick;


    test(bottom: THREE.Vector3): boolean {
        return -30 <= bottom.x && bottom.x <= 30 && -80 <= bottom.y && bottom.y <= -20 && -10 <= bottom.z && bottom.z <= -3;
    }

    updateCanvas(screen2: MousePoint): void {
        //TODO: Optimize
        /*
        suppose the area of other side of stick in range
        x:-30~30
        y:-80~-20
        z:-10~-3
        */

        const curBottom = this.stick.getBottom();
        const newTop = this.world.getMouseWorldPosition(screen2);
        let newDirection = new THREE.Vector3(0, -80, -10).sub(newTop).normalize();
        const p = newDirection.clone().multiplyScalar(stickProperty.length);
        let newBottom = p.clone().add(newTop);
        if (!this.test(newBottom)) {
            console.error('init error');
            return;
        }
        for (let T = 1.0; T > 1e-3; T *= 0.99) {
            const tempDirection = newDirection.clone().add(new THREE.Vector3(randFloat(-T, T), randFloat(-T, T), randFloat(-T, T))).normalize();
            const p = tempDirection.clone().multiplyScalar(stickProperty.length);
            const tempBottom = p.clone().add(newTop);
            if (this.test(tempBottom)) {
                if (tempBottom.distanceTo(curBottom) < newBottom.distanceTo(curBottom)) {
                    newBottom = tempBottom;
                    newDirection = tempDirection;
                }
            }
        }
        this.stick.placeTopLine(newTop, newBottom);
        this.renderer.render(this.world.scene, this.world.camera);
        // console.log(curBottom);
    }
}