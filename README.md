# RhinoPython

RhinoPython is a plugin to allow you to code Rhino python script in VS Code editor and run it in Rhino runtime. It inherits all the autocomplete intelligence from original rhinopython editor and can react faster, while you can benifit all the amazing advatanges that VS Code brings to you.

It is a **[DesignToProduction](http://designtoproduction.com/)** open source project, programmed initially for internal use.


## Features

The same way as you use the original editor. Just more efficient, simpler and faster.

Check this [youtube video](https://www.youtube.com/watch?v=QbmnKFIKBYs&feature=youtu.be) to see more clearly of the gif shown below.

![feature](image/feature.gif)

## Requirements

This is the client side of RhinoPython editor. To bridge it to Rhino you need a server to listen to VS Code editor, which is another plugin called [CodeListener](https://github.com/ccc159/CodeListener).

## Installation

+ Install [VS code](https://code.visualstudio.com/).
+ Install [python for VS code](https://marketplace.visualstudio.com/items?itemName=ms-python.python). It's recommended to familarize yourself with python for VS code at this [post](https://code.visualstudio.com/docs/languages/python) first.
+ Install [RhinoPython for VS code](https://marketplace.visualstudio.com/items?itemName=jingchengchen.rhinopython).
+ Download `CodeListener.rhi` file in [CodeListener latest release](https://github.com/ccc159/CodeListener/releases), and install it.


+ Start Rhino, click `tools -> pythonscript -> edit`, in the python editor, click `tools -> options`, copy those module paths. You might have additional libraries and you have to copy them as well.
![librarypath](image/librarypath.png)
+ In Rhino, click `tools -> options -> Plug-ins -> CodeListener -> Proterties`, copy the file containing folder path and open it in the explorer. Copy the `AutoComplete` folder path.
![pluginpath](image/pluginpath.png)
![autocompletepath](image/autocompletepath.png)

+ Start VS Code, open `user settings` by keyboard shortcut `Ctrl+,` paste the **libraries paths** and **autocomplete path** into the `user settings` with key "python.autoComplete.extraPaths", below is an example setting.

> If `AutoComplete` doesn't work even if you add the path into `python.autoComplete.extraPaths`, it's probably that you haven't add the root folder of the library. For instance, if your library `ExampleLib` is under folder `"...\Libs"`, you might have to add `"...\Libs\ExampleLib"` instead of `"...\Libs"`.

```javascript
{
    // disable certain pylint messages
    "python.linting.pylintArgs": [
        "--errors-only",
        "--disable=E0001",
        "--disable=E0401"
    ],
    // python autocomplete extra path
    "python.autoComplete.extraPaths": [
        "C:\\Users\\jingcheng\\AppData\\Roaming\\McNeel\\Rhinoceros\\5.0\\Plug-ins\\CodeListener (8c4235b6-64bc-4508-9166-bef8aa151085)\\1.0.0.0\\AutoComplete",
        "C:\\Users\\jingcheng\\AppData\\Roaming\\McNeel\\Rhinoceros\\5.0\\Plug-ins\\IronPython (814d908a-e25c-493d-97e9-ee3861957f49)\\settings\\lib",
        "C:\\Program Files\\Rhinoceros 5 (64-bit)\\Plug-ins\\IronPython\\Lib",
        "C:\\Users\\jingcheng\\AppData\\Roaming\\McNeel\\Rhinoceros\\5.0\\scripts"
    ],
    "editor.fontSize": 14,
    "team.showWelcomeMessage": false,
    "git.enableSmartCommit": true,
    "git.autofetch": true,

    // Enable/Disable rhinopython
    "RhinoPython.Enabled": true,
    // Show/Hide history console log
    "RhinoPython.PreserveLog": false,
    // True if you want to reset script engine every time you send code
    "RhinoPython.ResetAndRun": true,
    // Specifies whether to minimize the vs code editor when running the code.
    "RhinoPython.MinimizeWindowWhenRunning": false
}
```
![settings](image/settings.png)

## Usage

+ Start Rhino, type command `CodeListener`. You should see `VS Code Listener Started...`.
> You can add `CodeListener` into Rhino Command Lists every time Rhino starts.
+ Start VS Code, create a new file *(To have python autocomplete and lint working you have to [specify it's python file](https://code.visualstudio.com/docs/languages/overview#_changing-the-language-for-the-selected-file))* or open an existing *python file* or *folder* or *workspace*.
+ Send the your code by simply press `F2` or by typing command `CodeSender` in **Command Palette**(`F1` or `Ctrl+Shift+P`) You should then see returned printed message or errors in `Debug Console`. Depending on your `RhinoPython.ResetAndRun` settings, you might reset script engine every time before you send.
+ If you want to reset Rhino Python Script Engine, simply press `Ctrl + R`.
+ If you want to just send the code without resetting, regardless of `RhinoPython.ResetAndRun` setting, you can press `Crtl + F2`.

## Extension Settings

The following settings can be configured under **User Settings**:

* `RhinoPython.Enabled`: Enable/Disable this RhinoPython extension.
* `RhinoPython.PreserveLog`: Specifies whether to keep the console log history or not.
* `RhinoPython.ResetAndRun`: Determines if `F2` (`CodeSender` Command) reset the script engine every time before it executes.
* `RhinoPython.MinimizeWindowWhenRunning`: Specifies whether to minimize the vs code editor when running the code.

## Known Issues

- The debugger has not implemented yet.
- Exceptions are now generally handled, in case of any unknown errors or exceptions please contact the author.

> This release is in very early development and has not been fully tested. You are likely to expect different bugs or errors.

> This release is **ONLY** tested in **Rhino5 64 bit**. It doesn't support Rhino 6 yet.

## Release Notes

### 0.1.0

- Initial release of RhinoPython VS Code plugin.

### 0.1.1

- Updated readme with detailed instructions.

### 0.1.2

- Added Reset Script Engine Command.
- Added Reset&Execute Command.
- Added import module support in same folder.
- Added detailed exception message handling.

### 0.1.3

- Added Undo command for code execution.
- Disallowed duplicated code sending while previous code is running.
- Added settings to decide CodeSender resets engine or not.

### 0.1.4

- Added setting to minimize window when executing code.

### 0.1.5

- Fixed Codesender not running issues when updating VS Code to May 2018 (version 1.24).
- Moved this project from personal project to [DesignToProduction](http://designtoproduction.com/) project.