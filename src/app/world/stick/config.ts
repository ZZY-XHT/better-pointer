import { Vector3 } from 'three';

export const sceneConfig = {
    stickProperty:{
        radiusTop: 0.3,
        radiusBottom: 0.4,
        length: 60,
        radialSegments: 32
    },
    cameraProperty:{
        fieldOfView: 75,
        aspectRatio: window.innerWidth / window.innerHeight,
        nearPlane: 0.1,
        farPlane: 200
    },
    objectPositions:{ 
        camera: new Vector3(0,0,20),
        light: new Vector3(0,100,20)
    }
};