import * as vscode from 'vscode';

export function getNextflowPath(): string {
    return vscode.workspace.getConfiguration('nextflowDagPreview').get<string>('nextflowPath') ?? 'nextflow';
}

export function getDAGsPath(): string {
    return (vscode.workspace.getConfiguration('nextflowDagPreview').get<string>('dagTmpFolder') ?? '.').replace(/\/$/, '');
}