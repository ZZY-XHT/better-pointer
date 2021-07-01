import { screen, remote } from 'electron';

/**
 * Since we set IgnoreMouseEvents to true
 * We cannot use html's mouseover to get cursor location
 * even if our window is in fullscreen
 */
export function printMouseLocation():void{
    //screen.getCursorScreenPoint();
    const a = remote.screen.getCursorScreenPoint();
    //const a = screen.getCursorScreenPoint();
    console.log(a);
}