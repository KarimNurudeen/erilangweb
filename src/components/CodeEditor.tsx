import React, { useEffect, useRef } from 'react';
import { EditorView, basicSetup } from 'codemirror';
import { erilangLanguage, erilangHighlighting } from '../lib/erilangCodeMirrorLang';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  minHeight?: string;
}

const theme = EditorView.theme(
  {
    '&': { fontSize: '13.5px', backgroundColor: 'transparent', color: '#e6e9ef' },
    '.cm-content': { fontFamily: '"JetBrains Mono", ui-monospace, monospace', caretColor: '#ADDFF1', color: '#e6e9ef' },
    '.cm-line': { color: '#e6e9ef' },
    '.cm-gutters': { backgroundColor: 'transparent', color: '#6b7280', border: 'none' },
    '.cm-activeLine': { backgroundColor: 'rgba(255,255,255,0.04)' },
    '.cm-activeLineGutter': { backgroundColor: 'transparent' },
    '&.cm-focused': { outline: 'none' },
    '.cm-selectionBackground': { backgroundColor: 'rgba(173,223,241,0.25) !important' }
  },
  { dark: true }
);

export function CodeEditor({ value, onChange, className = '', minHeight = '180px' }: CodeEditorProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  useEffect(() => {
    if (!hostRef.current) return;

    const view = new EditorView({
      doc: value,
      parent: hostRef.current,
      extensions: [
      basicSetup,
      erilangLanguage,
      erilangHighlighting,
      theme,
      EditorView.updateListener.of((update) => {
        if (update.docChanged) onChangeRef.current(update.state.doc.toString());
      })]

    });
    viewRef.current = view;

    return () => {
      view.destroy();
      viewRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    const current = view.state.doc.toString();
    if (current !== value) {
      view.dispatch({ changes: { from: 0, to: current.length, insert: value } });
    }
  }, [value]);

  return <div ref={hostRef} className={className} style={{ minHeight }} />;
}
