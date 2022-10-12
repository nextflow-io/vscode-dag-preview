// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below

import * as vscode from 'vscode';
import { foundNextflow } from './utilities/check-nextflow';
import { NextflowDAGRenderer } from './utilities/nextflow-dag-renderer';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "nextflow-dag-preview" is now active!');

	if(!await foundNextflow()) {
		vscode.window.showWarningMessage('Nextflow executable not found. A valid nextflow setup is required to generate DAG previews.');
		return;
	}

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('nextflow-dag-preview.previewDAG', async () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		const file = vscode.window.activeTextEditor?.document.uri.path;
		
		const panel = vscode.window.createWebviewPanel(
			'dagPreview',
			`Nextflow DAG preview for ${vscode.window.activeTextEditor?.document.fileName ?? ''}`,
			vscode.ViewColumn.Two,
			{
				enableScripts: true
			}
		);
			
			
		const renderer = new NextflowDAGRenderer(panel.webview, vscode.window.activeTextEditor?.document.fileName ?? '');
		await renderer.generateDAG(file);
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}