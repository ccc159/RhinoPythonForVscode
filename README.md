# RhinoPython 

RhinoPython is a plugin to allow you to code Rhino python script in VS Code editor and run it in Rhino runtime. It inherits all the autocomplete intelligence from original rhinopython editor and can react faster, while you can benifit all the amazing advatanges that VS Code brings to you.


## Features

The same way as you use the original editor. Press `F2` to execute the code.
![feature](image/feature.gif)

## Requirements

This is the client side of RhinoPython editor. To bridge it to Rhino you need a server to listen to VS Code editor, which is another plugin called [CodeListener](https://github.com/ccc159/CodeListener).

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
