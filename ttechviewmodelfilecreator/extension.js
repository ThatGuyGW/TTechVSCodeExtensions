const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	const disposable = vscode.commands.registerCommand('ttechviewmodelfilecreator.createFiles', function (uri) {
		// uri will be the folder that was right-clicked
		if (!uri || !uri.fsPath) {
			vscode.window.showErrorMessage('No folder selected. Please right-click a folder in the Explorer.');
			return;
		}
		const rootPath = uri.fsPath;

		vscode.window.showInputBox({ prompt: 'Enter Entity Name:' }).then(entityName => {
			if (!entityName) {
				vscode.window.showErrorMessage('Entity Name is required.');
				return;
			}
			vscode.window.showInputBox({ prompt: 'Enter Author:' }).then(author => {
				if (!author) {
					vscode.window.showErrorMessage('Author is required.');
					return;
				}

				const viewModelsDir = path.join(rootPath, 'ViewModels');
				const formLibrariesDir = path.join(rootPath, 'FormLibraries');

				if (!fs.existsSync(viewModelsDir)) {
					fs.mkdirSync(viewModelsDir);
				}
				if (!fs.existsSync(formLibrariesDir)) {
					fs.mkdirSync(formLibrariesDir);
				}

				const viewModelFile = path.join(viewModelsDir, `${entityName}_ViewModel.js`);
				const formLibraryFile = path.join(formLibrariesDir, `${entityName}_FormLibrary.js`);

				const boilerplateViewModelPath = path.join(__dirname, 'templates', 'Boilerplate_ViewModel.txt');
				const boilerplateFormLibraryPath = path.join(__dirname, 'templates', 'Boilerplate_FormLibrary.txt');

				let viewModelContent = '';
				let formLibraryContent = '';

				try {
					viewModelContent = fs.readFileSync(boilerplateViewModelPath, 'utf8');
					formLibraryContent = fs.readFileSync(boilerplateFormLibraryPath, 'utf8');
				} catch (err) {
					vscode.window.showErrorMessage('Boilerplate files not found. Error: ' + err.message);
					return;
				}

				viewModelContent = viewModelContent
					.replace(/<ENTITYNAME>/g, entityName)
					.replace(/<AUTHORNAME>/g, author);

				formLibraryContent = formLibraryContent
					.replace(/<ENTITYNAME>/g, entityName)
					.replace(/<AUTHORNAME>/g, author);

				fs.writeFileSync(viewModelFile, viewModelContent);
				fs.writeFileSync(formLibraryFile, formLibraryContent);

				vscode.window.showInformationMessage(`Created ${entityName}_ViewModel.js and ${entityName}_FormLibrary.js`);
			});
		});
	});

	context.subscriptions.push(disposable);
}

function deactivate() { }

module.exports = {
	activate,
	deactivate
}
