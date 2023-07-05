import { MMKV, useMMKVString } from 'react-native-mmkv';
import crypto from 'react-native-quick-crypto';

const storage = new MMKV();

if (storage.getString('id') === undefined) {
  storage.set('id', crypto.randomUUID());
}

export function useID() {
  return useMMKVString('id', storage);
}
