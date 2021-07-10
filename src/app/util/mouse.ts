import {screen} from '@electron/remote';

export interface MousePoint{
    x: number,
    y: number
}

/**
 * Return the coordinate of the mouse,
 * where the coordinate of screen's upper left corner is (0,0)
 * 
 * Since we set IgnoreMouseEvents to true, mousemove event will not be triggered.
 * Instead, we get the coordinate via the electron process.
 */
export function getMouseCanvasPosition(): MousePoint{
    //TODO: consider multiple screen
    return screen.getCursorScreenPoint();
}