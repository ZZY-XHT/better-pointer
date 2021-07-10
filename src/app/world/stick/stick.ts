import * as THREE from 'three';

export const stickProperty={
    radiusTop: 0.3,
    radiusBottom: 0.4,
    length: 50,
    radialSegments: 32
};


export class Stick {
    stick = new THREE.Mesh(
        new THREE.CylinderGeometry(
            stickProperty.radiusTop,
            stickProperty.radiusBottom,
            stickProperty.length,
            stickProperty.radialSegments
        ),
        new THREE.MeshPhongMaterial({
            color: 0xB87333
        })
    );

    /**
     * Return the coordinate of upper center of the stick
     * The coordinate is calculated through mid point and length each time
     * So it might be better for Models to cache this value.
     */
    getTop(): THREE.Vector3 {
        const mid = this.stick.position.clone();
        const disp = new THREE.Vector3(0, stickProperty.length / 2, 0);
        disp.applyQuaternion(this.stick.quaternion);
        mid.add(disp);
        return mid;
    }

    /**
     * Return the coordinate of bottom center of the stick
     * The coordinate is calculated through mid point and length each time
     * So it might be better for Models to cache this value.
     */
    getBottom(): THREE.Vector3 {
        const mid = this.stick.position.clone();
        const disp = new THREE.Vector3(0, stickProperty.length / 2, 0);
        disp.applyQuaternion(this.stick.quaternion);
        mid.sub(disp);
        return mid;
    }

    /*
    placeTopAng(top: THREE.Vector3):void {
        //find displacement from top point to middle point
        const disp = new THREE.Vector3(0, stickProperty.length / 2, 0);
        disp.applyQuaternion(this.stick.quaternion);
        //transform top point to middle point
        this.stick.position.addVectors(top, disp);
    }

    placeBottomAng(bottom: THREE.Vector3):void {
        const disp = new THREE.Vector3(0, stickProperty.length / 2, 0);
        disp.applyQuaternion(this.stick.quaternion);
        this.stick.position.addVectors(bottom, disp);
    }
    */

    /**
     * Place the stick
     * s.t. **top** is the coordinate of upper surface center of the cylinder
     * **p** is on the stick or the extension of the stick
     */
    placeTopLine(top: THREE.Vector3, p: THREE.Vector3):void {
        //find the displacement from top to middle
        p=p.sub(top).normalize();
        //set direction
        const axis = new THREE.Vector3(0, -1, 0);
        this.stick.quaternion.setFromUnitVectors(axis, p.normalize());
        //set middle point
        p.multiplyScalar(stickProperty.length / 2);
        this.stick.position.addVectors(top, p);
    }

    /**
     * Place the stick
     * s.t. **bottom** is the coordinate of upper surface center of the cylinder
     * **p** is on the stick or the extension of the stick
     */
    placeBottomLine(bottom: THREE.Vector3, p: THREE.Vector3):void {
        //find the displacement from top to middle
        p.sub(bottom).normalize();
        //set direction
        const axis = new THREE.Vector3(0, 1, 0);
        this.stick.quaternion.setFromUnitVectors(axis, p.normalize());
        //set middle point
        p.multiplyScalar(stickProperty.length / 2);
        this.stick.position.addVectors(bottom, p);
    }

}