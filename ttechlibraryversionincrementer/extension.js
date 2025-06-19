const vscode = require('vscode');

const ignoreNextSave = new Set();

function activate(context) {

    console.log('Extension activated!');

    const saveListener = vscode.workspace.onDidSaveTextDocument(async (document) => {
        // Prevent loop if this save was triggered by our own edit
        if (ignoreNextSave.has(document.uri.toString())) {
            ignoreNextSave.delete(document.uri.toString());
            return;
        }

        if (!document.getText().includes('@incrementOnSave')) {
            return;
        }

        const versionRegex = /@version (\d+\.\d+\.\d+\.\d+)/;
        const text = document.getText();
        const match = text.match(versionRegex);
        if (match) {

            console.log(`Version tag found: ${match[0]}`);

            const currentVersion = match[1].split('.').map(Number);

            const inputBox = vscode.window.createInputBox();
            inputBox.title = 'Increment Version';
            inputBox.prompt = 'Select which part of the version to increment:';
            inputBox.value = match[1];
            inputBox.buttons = [
                { iconPath: new vscode.ThemeIcon('arrow-up'), tooltip: 'Increment Major' },
                { iconPath: new vscode.ThemeIcon('arrow-up'), tooltip: 'Increment Minor' },
                { iconPath: new vscode.ThemeIcon('arrow-up'), tooltip: 'Increment Build' },
                { iconPath: new vscode.ThemeIcon('arrow-up'), tooltip: 'Increment Revision' }
            ];
            inputBox.onDidTriggerButton(async button => {
                let newVersion = [...currentVersion];
                switch (inputBox.buttons.indexOf(button)) {
                    case 0:
                        newVersion[0]++;
                        newVersion[1] = 0;
                        newVersion[2] = 0;
                        newVersion[3] = 0;
                        break;
                    case 1:
                        newVersion[1]++;
                        newVersion[2] = 0;
                        newVersion[3] = 0;
                        break;
                    case 2:
                        newVersion[2]++;
                        newVersion[3] = 0;
                        break;
                    case 3:
                        newVersion[3]++;
                        break;
                }
                const updatedVersion = `@version ${newVersion.join('.')}`;
                const edit = new vscode.WorkspaceEdit();
                const versionPos = document.positionAt(text.indexOf(match[0]));
                edit.replace(document.uri, new vscode.Range(versionPos, versionPos.translate(0, match[0].length)), updatedVersion);
                await vscode.workspace.applyEdit(edit);

                // Add to ignore set and save
                ignoreNextSave.add(document.uri.toString());
                await document.save();

                inputBox.hide();
            });
            inputBox.show();

        } else {
            console.log('No version tag found in the document.');
        }
    });
    context.subscriptions.push(saveListener);

}

function deactivate() {

}

module.exports = {

    activate,
    deactivate

}
