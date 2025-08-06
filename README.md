# KWin center active window

A keyboard shortcut for KDE Wayland Plasma 6 Window Management to resize the current active window to 2/3 of the current screen's size and center it on the current screen.

# Installation

- Downlaod and put the code repository into the appropriate directory:

  ```bash
  git clone https://github.com/riks1233/kwin_center_window.git
  mkdir -p ~/.local/share/kwin/scripts
  mv kwin_center_window ~/.local/share/kwin/scripts/.
  ```
- KDE System Settings app -> search and select "KWin Scripts" (will be under the Window Management section) -> enable the `Center Window` entry (which should now be here due to copying to `~/.local/share/kwin/scripts/.`).
- KDE System Settings app -> search and select "Shortcuts" (will be under the Keyboard section) -> Window Management -> configure your desired shortcut for the`Center Active Window` entry.
- Enjoy!

# Modifying the default 2/3 ratio

- Change the coefficient in the `contents/code/main.js` in "configuration area". Value should be a float in range [0 ... 1].
- Disable (press apply) and re-enable (press apply) the plugin in KDE System Settings -> Window Management -> KWin Scripts.

# Debugging

- Try running `journalctl -f QT_CATEGORY=js QT_CATEGORY=kwin_scripting` in terminal and then activate the shortcut on another window. Look in that terminal if you see anything suspicious.
