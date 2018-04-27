# RhinoPython 

RhinoPython is a plugin to allow you to code Rhino python script in VS Code editor and run it in Rhino runtime. It inherits all the autocomplete intelligence from original rhinopython editor and can react faster, while you can benifit all the amazing advatanges that VS Code brings to you.


## Features

Describe specific features of your extension including screenshots of your extension in action. Image paths are relative to this README file.

For example if there is an image subfolder under your extension project workspace:

\!\[feature X\]\(images/feature-x.png\)

> Tip: Many popular extensions utilize animations. This is an excellent way to show off your extension! We recommend short, focused animations that are easy to follow.

## Requirements

This is the client side of RhinoPython editor. To bridge it to Rhino you need a server to listen to VS Code editor, which is another plugin called [CodeListener](https://github.com/ccc159/CodeListener)

## Extension Settings

Include if your extension adds any VS Code settings through the `contributes.configuration` extension point.

For example:

This extension contributes the following settings:

* `myExtension.enable`: enable/disable this extension
* `myExtension.thing`: set to `blah` to do something

## Known Issues

- The debugger has not implemented yet.
- Exceptions are now generally handled, in case of any unknown errors or exceptions please contact the author.

## Release Notes

### 1.0.0

- Initial release of RhinoPython VS Code plugin.
