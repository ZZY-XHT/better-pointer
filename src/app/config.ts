import { Vector3 } from 'three';

export const sceneConfig = {
    stickProperty:{
        radiusTop: 0.4,
        radiusBottom: 0.8,
        length: 16,
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

//TODO: user a proper json loader
//TODO: add documentation
export const userConfig = {
    graphics:{
        useAntiAlias: false,
        pixelRatio: window.devicePixelRatio
    }
};