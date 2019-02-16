import * as vscode from 'vscode';

const getText = function(): string | null {
  const editor = vscode.window.activeTextEditor;

  if (!editor) {
    vscode.window.showErrorMessage('No text editor active');
    return null;
  }

  const selection = editor.selection;

  if (!selection) {
    vscode.window.showErrorMessage('Nothing is selected');
    return null;
  }

  const selectedText = editor.document.getText(selection);

  if (!selectedText) {
    vscode.window.showErrorMessage('No selected text found');
    return null;
  }

  return selectedText;
};

export default {
  getText
};