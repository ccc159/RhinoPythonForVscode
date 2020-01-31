# Changelog

## [0.1.0] - 2018-04-28

- Initial release of RhinoPython VS Code plugin.

## [0.1.1] - 2018-04-28

- Updated readme with detailed instructions.

## [0.1.2] - 2018-05-16

- Added Reset Script Engine Command.
- Added Reset&Execute Command.
- Added import module support in same folder.
- Added detailed exception message handling.

## [0.1.3] - 2018-05-17

- Added Undo command for code execution.
- Added settings to decide CodeSender resets engine or not.
- Disallowed duplicated code sending while previous code is running.

## [0.1.4] - 2018-05-18

- Added setting to minimize window when executing code.

## [0.1.5] - 2018-06-02

- Fixed Codesender not running issues when updating VS Code to May 2018 (version 1.24).
- Moved this project from personal project to [DesignToProduction](http://designtoproduction.com/) project.

## [0.1.6] - 2018-06-13

- Added command `StopCodeListener` in Rhino to stop CodeListener and free the port for other Rhino App Instances.
- Fixed multi state message only showing the first message problem.
- Objects created by the executed script in Rhino will be selected automatically now.
- Rhino will force enable view redraw after code execution to avoid the frozen viewport.

## [0.1.7] - 2018-11-07

- Added support for Rhino 6.
- Fixed change settings doesn't take effect unless restart problem.
- Removed rarely used "minimize window" and "preserve log" function.

## [0.1.8] - 2018-11-21

- Fixed debugconsole not printing output. It is now printed in the OutputChannel.
- Moved changelog from ReamMe to Changelog file.

## [0.1.9] - 2018-11-30

- Fixed OutputChannel doesn't show automatically the message from Rhino.

## [0.1.10] - 2020-01-31

- Fixed `EPIPE` error when sending a second time.
