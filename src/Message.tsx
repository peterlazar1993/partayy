import { StyleSheet, Text } from 'react-native';
import { useConnectedState } from './state';
import { colors } from './theme';

export function Message({ colorScheme }: { colorScheme: 'dark' | 'light' }) {
  const { text } = useConnectedState()

  return (
    <Text style={[styles.text, { color: colors[colorScheme].text }]}>
      {text}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: { fontSize: 32 },
});
