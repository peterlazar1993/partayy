import { proxy, useSnapshot } from 'valtio';
import { bind } from 'valtio-yjs';
import YPartyKitProvider from 'y-partykit/provider';
import * as Y from 'yjs';

const ydoc = new Y.Doc();
const ymap = ydoc.getMap('mymap');

const state = proxy({
  text: '',
  editor: '',
  reader: '',
});
const unbind = bind(state, ymap);

const provider = new YPartyKitProvider(
  '127.0.0.1:1999',
  'my-room',
  ydoc,
);

export function useConnectedState() {
  return useSnapshot(state);
}

export function updateEditor(v: string) {
  state.editor = v;
}

export function updateReader(v: string) {
  state.reader = v;
}

export function updateText(v: string) {
  state.text = v;
}
