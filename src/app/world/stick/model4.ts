import * as THREE from 'three';
import { randFloat } from 'three/src/math/MathUtils';
import { MousePoint } from '../../util/mouse';
import { createRenderer, IModel } from '../interface';
import { stickProperty } from './stick';
import { World } from './world';

const k=0.999999;
export class Model extends IModel {
    renderer = createRenderer();
    world = new World();
    stick = this.world.stick;

    updateCanvas(screen2: MousePoint): void {
        const len = stickProperty.length;
        //const newTop = new THREE.Vector3(0,5,0);
        //const curBottom = new THREE.Vector3(0,0,0);
        const newTop = this.world.getMouseWorldPosition(screen2);
        const curBottom = this.stick.getBottom();
        const basey = curBottom.clone().sub(newTop).normalize();
        const newbase = newTop.clone().addScaledVector(basey,k*len);
        const r = Math.sqrt(1-k*k) * len;
        
        //construct a point on the plane
        const pointOnPlane = new THREE.Vector3(0,0,0);
        const b = basey.dot(newbase);
        if(Math.abs(basey.x)>1e-5) pointOnPlane.x=b/basey.x;
        else if (Math.abs(basey.y) > 1e-5) pointOnPlane.y = b / basey.y;
        else pointOnPlane.z = b / basey.z;

        const basex = newbase.clone().sub(pointOnPlane).normalize();
        const basez = basey.cross(basex).normalize();
        
        console.log(basex,basey,basez);

        //const theta = randFloat(0, 0.1* Math.PI);
        const theta = 0.1*Math.PI;
        const newBottom = newbase
            .addScaledVector(basex,r*Math.sin(theta))
            .addScaledVector(basez,r*Math.cos(theta));

        this.stick.placeTopLine(newTop, newBottom);
        this.renderer.render(this.world.scene, this.world.camera);
    }
}