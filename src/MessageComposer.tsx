import { useEffect, useRef } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { colors } from './theme';

export function MessageComposer({
  onBlur,
  isEditor,
  colorScheme,
  onChangeText,
}: {
  onBlur: () => void;
  isEditor: boolean;
  colorScheme: 'light' | 'dark';
  onChangeText: (a: string) => void;
}) {
  const textInputRef = useRef<TextInput>(null);

  useEffect(() => {
    // Focus the textinput if this client becomes the editor
    if (isEditor && textInputRef.current) {
      textInputRef.current.focus();
    }
  }, [isEditor]);

  return (
    <TextInput
      ref={textInputRef}
      style={[
        styles.textInput,
        {
          color: colors[colorScheme].text,
        },
      ]}
      selectionColor="#ffb703"
      cursorColor="#ffb703"
      onChangeText={onChangeText}
      onBlur={onBlur}
    />
  );
}

const styles = StyleSheet.create({
  textInput: {
    width: '100%',
    fontSize: 24,
  },
});
