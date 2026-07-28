import { StyleSheet, View, type ViewProps } from "react-native";

export function ThemedView({ style, ...rest }: ViewProps) {
  return <View style={[styles.default, style]} {...rest} />;
}

const styles = StyleSheet.create({
  default: {
    backgroundColor: "#ffffff",
  },
});
