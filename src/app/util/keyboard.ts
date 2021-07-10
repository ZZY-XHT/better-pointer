import { globalShortcut } from '@electron/remote';

export function isHoldingFixTop():boolean{
    return false;
}

globalShortcut.register('CommandOrControl+1', () => {
    console.log('CommandOrControl+1 is pressed');
});