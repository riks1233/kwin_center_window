// /usr/share/kwin-wayland/scripts

// journalctl -f QT_CATEGORY=js QT_CATEGORY=kwin_scripting

// ~/.local/share/kwin/scripts/.

// cp -r kwin_center_window ~/.local/share/kwin/scripts/.


// const clients = workspace.clientList();
// for (var i = 0; i < clients.length; i++) {
//     print(clients[i].caption);
// }

// for (const i = 0; i < workspace.windowList.length; i++) {
//     print(Object.keys(workspace.windowList[i]));
//     break
// }


// Works.
// print(workspace.activeWindow.width);

// Not what I want. There's only one virtual desktop
// print(workspace.activeWindow.desktops);
// print(Object.keys(workspace.desktops[0]));
// print(workspace.activeWindow.resizeable);
// print();

// Sets your mouse to move.
// workspace.slotWindowMove(workspace.activeWindow, workspace.activeWindow.x + 50, workspace.activeWindow.y + 50)


// print(Object.values(workspace.activeWindow.frameGeometry));
// print(Object.keys(workspace.activeWindow.frameGeometry.x))
// print(workspace.activeWindow.frameGeometry.x);

// not defined
// print(new QRectF(2400,500,1500,800));
// Works.

// // print(typeof(workspace.activeWindow.frameGeometry) === 'object');
// // print(Object.keys(workspace.activeWindow.frameGeometry));
// const clonedFrameGeometry = cloneObject(workspace.activeWindow.frameGeometry);
// // print(Object.keys(clonedFrameGeometry));
// print(workspace.activeWindow.frameGeometry.x)
// clonedFrameGeometry.x = 2400;
// clonedFrameGeometry.y = 500;
// clonedFrameGeometry.width = 1500;
// clonedFrameGeometry.height = 800;
//
// // print(Object.keys(clonedFrameGeometry.x));
// print(clonedFrameGeometry.x);
// // Works but throws an error and the program doesn't execute any further;
// try {
//     workspace.activeWindow.frameGeometry = clonedFrameGeometry;
// } catch (err) {
//     print("caught an error, but silently ignoring and continuing execution");
// }
// print(workspace.activeScreen.geometry);

// workspace.activeWindow.frameGeometry.x = 2400;
// workspace.activeWindow.frameGeometry.y = 500;
// workspace.activeWindow.frameGeometry.width = 1500;
// workspace.activeWindow.frameGeometry.height = 800;

// doesnt work
// const copy = structuredClone(workspace.activeWindow.frameGeometry);
// print(copy);
// print(Object.keys(copy));



// Works.
// print(workspace.activeScreen.geometry);
// print(Object.keys(workspace.activeScreen));
// print(workspace.activeScreen.geometry); // This already accounts for scaling, which is very noice.



// TODO: steps
// * Take active window
// * Take current monitor
// * Resize to half of the monitor size.
// ** Account for scaling?

const main = () => {
    function cloneObject(obj) {
        const copy = Object.create(Object.getPrototypeOf(obj));
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                copy[key] = cloneObject(obj[key]);
            }
        }
        return copy;
    }

    // Logic:
    // I want to set the size to 2/3 of the current screen.
    // screen width / 3 * 2. same with height and set width and height.
    // position x and y would be screen width - the remaining free space (1/3 of the screen width) divided by 2.
    const coefficient = 0.67;
    const desiredGeometry = cloneObject(workspace.activeWindow.frameGeometry);
    desiredGeometry.width = workspace.activeScreen.geometry.width * coefficient;
    desiredGeometry.height = workspace.activeScreen.geometry.height * coefficient;
    desiredGeometry.x = workspace.activeScreen.geometry.x + workspace.activeScreen.geometry.width * (1 - coefficient) / 2
    desiredGeometry.y = workspace.activeScreen.geometry.y + workspace.activeScreen.geometry.height * (1 - coefficient) / 2
    // desiredGeometry.x = 0;
    // desiredGeometry.y = 406;
    // desiredGeometry.width = 1800;
    // desiredGeometry.height = 1200;

    try {
        // Works but throws an error and the program doesn't execute any further;
        workspace.activeWindow.frameGeometry = desiredGeometry;
    } catch (err) {
        print("caught an error, but silently ignoring and continuing execution");
    }
}

main();
