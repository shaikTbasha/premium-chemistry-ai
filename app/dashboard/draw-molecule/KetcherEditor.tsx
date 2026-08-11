"use client";
import React from 'react';
import { Editor } from 'ketcher-react';
import { StandaloneStructServiceProvider } from 'ketcher-standalone';
import 'ketcher-react/dist/index.css';

const structServiceProvider = new StandaloneStructServiceProvider();

export default function KetcherEditor({ onInit }: { onInit: (ketcher: any) => void }) {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Editor
        staticResourcesUrl=""
        structServiceProvider={structServiceProvider}
        onInit={onInit}
      />
    </div>
  );
}