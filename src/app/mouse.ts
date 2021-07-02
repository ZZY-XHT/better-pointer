import { remote } from 'electron';

/**
 * Return the coordinate of the mouse,
 * where the coordinate of screen's upper left corner is (0,0)
 * 
 * Since we set IgnoreMouseEvents to true, mousemove event will not be triggered.
 * Instead, we get the coordinate via the electron process.
 */
export function getMouseCanvasPosition(): Electron.Point{
    //TODO: consider multiple screen
    return remote.screen.getCursorScreenPoint();
}