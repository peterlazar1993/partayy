import 'react-native-quick-crypto';
import { useCallback, useEffect } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { Message } from './src/Message';
import { MessageComposer } from './src/MessageComposer';
import {
  updateEditor,
  updateReader,
  updateText,
  useConnectedState,
} from './src/state';
import { useID } from './src/storage';
import { colors } from './src/theme';

export default function App() {
  const [id] = useID();

  const { editor, reader } = useConnectedState();
  const isEditor = editor === id;
  const colorScheme = isEditor ? 'dark' : 'light';

  useEffect(() => {
    // First client to connect becomes the editor
    if (id !== undefined) {
      if (isEditor || editor === '') {
        updateEditor(id);
      } else {
        updateReader(id);
      }
    }
  }, [editor, id, isEditor, reader]);

  const onBlur = useCallback(() => {
    // On dismissing the keyboard(onBlur), swap editor and reader and clear the message
    updateEditor(reader);
    updateReader(editor);
    updateText('');
  }, [editor, reader]);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors[colorScheme].background },
      ]}>
      <Text
        style={[
          styles.label,
          {
            color: colors[colorScheme].borderColor,
          },
        ]}>
        {isEditor ? 'EDIT0R' : 'READ3R'}
      </Text>
      {isEditor ? (
        <MessageComposer
          onBlur={onBlur}
          isEditor={isEditor}
          onChangeText={updateText}
          colorScheme={colorScheme}
        />
      ) : (
        <Message colorScheme={colorScheme} />
      )}
      <StatusBar
        translucent
        backgroundColor={'transparent'}
        animated
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },

  label: { position: 'absolute', top: 200, fontSize: 24 },
});
