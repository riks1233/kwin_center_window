
/* Debugging information:
*
* code editor and tester: plasma-interactiveconsole --kwin
* root stuff: /usr/share/kwin-wayland/scripts
* regular user stuff: ~/.local/share/kwin/scripts/.
* see logs: journalctl -f QT_CATEGORY=js QT_CATEGORY=kwin_scripting
*
*/

// Configuration area.

// Coefficient is the percentage of current screen size that the window size would become.
coefficient = 0.67;

// End of configuration area.

const main = () => {
    if (coefficient < 0 || coefficient > 1) {
      print("Coefficient variable has a wrong value, should a float value in range [0 ... 1]");
      return;
    }

    if (workspace.activeWindow.fullScreen || workspace.activeWindow.noBorder) {
      print("Either fullscreen or borderless, not centering window.");
      return;
    }

    if (!workspace.activeWindow.resizeable) {
      print("Window is not resizeable for some reason, not centering window.");
      return;
    }

    function cloneObject(obj) {
        const copy = Object.create(Object.getPrototypeOf(obj));
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                copy[key] = cloneObject(obj[key]);
            }
        }
        return copy;
    }

    // Goal and calculation logic explanation:
    // I want to set the size of the active window to 2/3 of the current screen and place it in the center.
    // I have x, y (top-left corner position of the window), its width and height.
    // What do:
    // * width and height would be: screen width * coefficient, which is 2/3. Same for the height.
    // * position x and y would be: screen's x or y plus the remaining free space of the screen (1/3 of the screen width) divided by 2.
    const desiredGeometry = cloneObject(workspace.activeWindow.frameGeometry);
    desiredGeometry.width = workspace.activeScreen.geometry.width * coefficient;
    desiredGeometry.height = workspace.activeScreen.geometry.height * coefficient;
    desiredGeometry.x = workspace.activeScreen.geometry.x + workspace.activeScreen.geometry.width * (1 - coefficient) / 2
    desiredGeometry.y = workspace.activeScreen.geometry.y + workspace.activeScreen.geometry.height * (1 - coefficient) / 2

    // workspace.activeWindow.maximizeMode
    // * 0 = floating window.
    // * 1 = no idea if such even exists.
    // * 2 = no idea if such even exists.
    // * 3 = maximized window (not related to fullscreen at all).
    if (workspace.activeWindow.maximizeMode != 0) {
        // Try maximize window if it is not yet a floating window.
        workspace.slotWindowMaximize(workspace.activeWindow);
    }
    try {
        // Works but throws an error and the program doesn't execute any further; so have to ignore error with try-catch.
        workspace.activeWindow.frameGeometry = desiredGeometry;
    } catch (err) {
        print("Caught an EXPECTED error, all good, ignoring and continuing execution.");
    }
}

registerShortcut("CenterActiveWindow", "Center Active Window", null, main);
