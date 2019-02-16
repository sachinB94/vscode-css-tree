import * as vscode from 'vscode';
import documentTree from 'document-tree';

import selection from './selection';
import generateCssTree from './cssTree';

interface InterfaceUserConfig {
  cssFlavor: string;
}

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand('extension.generateCssTree', async () => {
    const selectedText = selection.getText();

    if (!selectedText) {
      return;
    }

    const userConfig = vscode.workspace
      .getConfiguration()
      .get('generateCssTree') as InterfaceUserConfig;

    const isCss = userConfig.cssFlavor.toLowerCase() === 'css';

    const tree = documentTree.generate(selectedText);
    const cssTree = generateCssTree(tree, { isCss });

    const doc = await vscode.workspace.openTextDocument({
      content: cssTree,
      language: userConfig.cssFlavor
    });

    await vscode.window.showTextDocument(doc);
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
