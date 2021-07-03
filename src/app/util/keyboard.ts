import { remote } from 'electron';

export function isHoldingFixTop():boolean{
    return false;
}

remote.globalShortcut.register('CommandOrControl+1', () => {
    console.log('CommandOrControl+1 is pressed');
});