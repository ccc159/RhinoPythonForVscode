# RhinoPython 

RhinoPython is a plugin to allow you to code Rhino python script in VS Code editor and run it in Rhino runtime. It inherits all the autocomplete intelligence from original rhinopython editor and can react faster, while you can benifit all the amazing advatanges that VS Code brings to you.


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

+ Start VS Code, open `user settings` by keyboard shortcut `Ctrl+,` paste the libraries paths and autocomplete path into the `user settings` with key "python.autoComplete.extraPaths", below is an example setting.

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
    "RhinoPython.PreserveLog": true
}
```
![settings](image/settings.png)

## Usage

+ Start Rhino, type command `CodeListener`. You should see `VS Code Listener Started...`.
+ Start VS Code, create a new file *(To have python autocomplete and lint working you have to [specify it's python file](https://code.visualstudio.com/docs/languages/overview#_changing-the-language-for-the-selected-file))* or open an existing python file.
+ Send the your code by simply press `F2` or by typing command `CodeSender` in **Command Palette**(`F1` or `Ctrl+Shift+P`)
+ You should then see returned printed message or errors in `Debug Console`.

## Extension Settings

The following settings can be configured under **User Settings**:

* `RhinoPython.Enabled`: Enable/Disable this RhinoPython extension.
* `RhinoPython.PreserveLog`: Specifies whether to keep the console log history or not.

## Known Issues

- The debugger has not implemented yet.
- Exceptions are now generally handled, in case of any unknown errors or exceptions please contact the author.

> This release is in very early development and has not been fully tested. You are likely to expect different bugs or errors.

## Release Notes

### 1.0.0

- Initial release of RhinoPython VS Code plugin.
