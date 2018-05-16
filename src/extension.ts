'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // load user settings
    const RhinoPythonConfig = vscode.workspace.getConfiguration('RhinoPython');

    // send the messgage to Rhino
    var net = require('net');
    var client = new net.Socket();
    function SendToRhino (messgage: string) {
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
            client.write(messgage);
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

    // register execute command
    let disposable = vscode.commands.registerCommand('extension.CodeSender', args => {
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

            // check if reset engine
            let reset = args.reset ? true : false;

            // check if it is temp file, if yes then save to a temp file
            let temp = editor.document.isUntitled;
            let run = true;
            if (temp) {
                var tmpfolder = os.tmpdir();
                let filename = tmpfolder + "\\TempScript.py";
                fs.writeFileSync(filename, text);
                let msgObject = JSON.stringify({ reset, temp, filename, run });
                SendToRhino(msgObject);
            } else {
                let filename = editor.document.fileName;
                let msgObject = JSON.stringify({ reset, temp, filename, run });
                editor.document.save().then(() => SendToRhino(msgObject));
            }
        }
    });

    context.subscriptions.push(disposable);

    // register reset and execute command
    disposable = vscode.commands.registerCommand('extension.CodeSenderResetNRun', () => {
        vscode.commands.executeCommand('extension.CodeSender', {reset : true});
    });

    context.subscriptions.push(disposable);

    // register reset command
    disposable = vscode.commands.registerCommand('extension.CodeSenderReset', () => {
        let run = false;
        let filename = "";
        let temp = true;
        let reset = true;
        let msgObject = JSON.stringify({ reset, temp, filename, run });
        SendToRhino(msgObject);
    });

    context.subscriptions.push(disposable);

}


// this method is called when your extension is deactivated
export function deactivate() {

}