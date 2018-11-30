'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
// init an outputchannel
var outputChannel = vscode.window.createOutputChannel('RhinoPython');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    // send the messgage to Rhino
    var isRunning = false;
    var net = require('net');
    var client = new net.Socket();
    function SendToRhino (messgage: string) {
        client.connect(614, '127.0.0.1', function() {
            isRunning = true;
            client.write(messgage);
        });
    }

    client.on('connect', function() {
        outputChannel.show(true);
        outputChannel.clear();
        outputChannel.appendLine(`====== ${(new Date()).toLocaleString()} ======`);
    });

    client.on('data', function(data: Buffer) {
        let info: string = data.toString();
        outputChannel.append(info);
    });

    // Add a 'close' event handler for the client socket
    client.on('close', function() {
        isRunning = false;
        client.destroy();
        // console.log('Rhino disconnected.');
    });

    client.on('error', function(err: any) {
        if (err.code === "ECONNREFUSED") {
            vscode.window.showWarningMessage('Cannot connect Rhino. Please make sure Rhino is running CodeListener.');
        } else if (err.code === "EISCONN") {
            vscode.window.showWarningMessage('Cannot send code. An existing code is still running.');
        } else {
            vscode.window.showWarningMessage(err.toString());
        }
        isRunning = false;
        client.destroy();
    });

    // register execute command
    let disposable = vscode.commands.registerCommand('extension.CodeSender', () => {
        // check if rhino python is enabled by the user
        if (!vscode.workspace.getConfiguration('RhinoPython').Enabled) { return; }
        if (isRunning) {
            vscode.window.showWarningMessage('Cannot send code. An existing code is still running.');
            return;
        }
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
            let reset = vscode.workspace.getConfiguration('RhinoPython').ResetAndRun;

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
    outputChannel.hide();
    outputChannel.dispose();
}