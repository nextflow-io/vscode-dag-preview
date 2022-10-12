const util = require('util');
import * as vscode from 'vscode';
const exec = util.promisify(require('child_process').exec);
import { readFileSync } from 'fs';
import { getDAGsPath, getNextflowPath } from './get-nextflow-path';

export class NextflowDAGRenderer {
	
	private _diagram?: string;
	private nodes: string[] = [];
    private errorMessage?: string;

	constructor(private webView: vscode.Webview, public name: string, diagram?: string) {
		this.diagram = diagram ?? '';
	}

	private set diagram(dag: string) {
		this._diagram = dag;
		const nodeRegex = /p\d+[\(\[].*[\)\]]/ig;
		this.nodes = dag.match(nodeRegex) ?? [];
	}
	private get diagram(): string {
		return this._diagram ?? '';	
	}

	public async generateDAG(file: string | undefined): Promise<void> {
		if(!file) {
			throw new Error('Could not generate preview');
		}
        this.errorMessage = undefined;
        this.diagram = '';
        this.render();
        const outputPath = `${getDAGsPath()}/preview.mmd`;
		const command = `cd ~/code && nextflow run "${file}" -with-dag ${outputPath} -preview`;
        try {
            const { stdout, stderr } = await exec(command);
            this.errorMessage = stderr;
            this.diagram = readFileSync(outputPath, 'utf-8');
        } catch (err) {
            this.errorMessage = (<any>err)?.message;
        }
        this.render();
	}

	public render(): void {
		this.webView.html = `
			<!DOCTYPE html>
			<html lang="en">
			<head>
				<title>Nextflow DAG preview for ${this.name}</title>
				<script src="https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js"></script>
				<script>
					mermaid.initialize({startOnLoad:true});
					document.addEventListener('click', event => {
						let node = event && event.target;
						while (node) {
							if (node.tagName && node.tagName === 'input') {
								// Handle click here by posting data back to VS Code
								// for your extension to handle
								vscode.window.showInformationMessage(node)
								event.preventDefault();
								return;
							}
							node = node.parentNode;
						}
					}, true);
				</script>
                <style type="text/css">
                    .mermaid {
                        margin: 2rem;
                    }
                    .error {
                        color: red;
                    }
                </style>
			</head>
			<body>
                ${
                    (this.errorMessage) ? 
                        `
                            <div class="error">
                                <h4>Something went wrong generating the DAG</h4>
                                ${this.errorMessage}
                            </div>
                        ` :
                        ''
                }
				${
					this.diagram?.length ? `
						<div class="mermaid">
							${this.diagram}
						</div>
					` :
					this.errorMessage ? '' : `Generating DAG preview...`
				}
			</body>
		</html>`;
	}
}