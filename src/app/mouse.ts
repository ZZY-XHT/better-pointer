import { remote } from 'electron';

/**
 * Since we set IgnoreMouseEvents to true
 * We cannot use html's mouseover to get cursor location
 * even if our window is in fullscreen
 */
export function printMouseLocation():void{
    const a = remote.screen.getCursorScreenPoint();
    console.log(a);
}