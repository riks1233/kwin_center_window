# KWin center active window

- Shortcut for KDE Wayland Plasma 6 Window Management to center a window in current active screen to and resize to 2/3 of the screen's size.

# Installation

- Put the code into the appropriate directory.

  ```bash
  git clone https://github.com/riks1233/kwin_center_window.git
  cp -r kwin_center_window ~/.local/share/kwin/scripts/.
  ```
- KDE System Settings -> Window Management -> KWin Scripts -> enable Center Window script (which should now be here due to copying to `~/.local/share/kwin/scripts/.`).
- KDE System Settings -> Keyboard -> Shortcuts -> Window Management -> configure your desired shortcut for `Center Active Window` entry.
- Enjoy!

# Modifying the default 2/3 ratio

- Change the coefficient in the `contents/code/main.js` in "configuration area". Value should be a float in range [0 ... 1].
- Disable (press apply) and re-enable (press apply) the plugin in KDE System Settings -> Window Management -> KWin Scripts.

# Debugging

- Try running `journalctl -f QT_CATEGORY=js QT_CATEGORY=kwin_scripting` in terminal and then activate the shortcut on another window. Look in that terminal if you see anything suspicious.
