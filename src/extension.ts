'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    
    const RhinoPythonConfig = vscode.workspace.getConfiguration('RhinoPython');
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.CodeSender', () => {
        // check if rhino python is enabled by the user
        if (!RhinoPythonConfig.Enabled) { return; }
        
        // check if editor is open
        let editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showWarningMessage('No code detected.');
            return;
        } else {
            let text = editor.document.getText();

            if (!text) {
                vscode.window.showWarningMessage('No code detected.');
                return;
            }

            // initialize filesystem, operation system, and socket
            var fs = require('fs');
            var os = require('os');
            var net = require('net');
            var client = new net.Socket();
            // check if it is temp file, if yes then save to a temp file
            let temp = editor.document.isUntitled;
            if (temp) {
                var tmpfolder = os.tmpdir();
                var filename = tmpfolder + "\\TempScript.py";
                fs.writeFileSync(filename, text);
                SendToRhino(filename);
            } else {
                let fileName = editor.document.fileName;
                editor.document.save().then(() => SendToRhino(fileName));
            }
        }

        // send the python script file path to Rhino
        function SendToRhino (path: string) {
            function onConnectionDisplay () {
                vscode.debug.activeDebugConsole.append('\n');
                vscode.debug.activeDebugConsole.appendLine(`@ ====== ${(new Date()).toLocaleString()} ======`);
                vscode.debug.activeDebugConsole.append('\n');
            }
            client.connect(614, '127.0.0.1', function() {
                if (RhinoPythonConfig.PreserveLog) {
                    onConnectionDisplay();
                } else {
                    vscode.commands.executeCommand('workbench.debug.panel.action.clearReplAction').then(() => onConnectionDisplay());
                }
                client.write(path);
            });
        }

        client.on('data', function(data: Buffer) {
            vscode.debug.activeDebugConsole.append(data.toString());
            vscode.debug.activeDebugConsole.append('\n');
        });
        
        // Add a 'close' event handler for the client socket
        client.on('close', function() {
            // console.log('Rhino disconnected.');
        });
        
        client.on('error', function(err: object) {
            vscode.debug.activeDebugConsole.appendLine(err.toString());
            vscode.debug.activeDebugConsole.appendLine('Please make sure Rhino is running CodeListener.');
        });

    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {

}