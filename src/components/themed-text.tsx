import { StyleSheet, Text, type TextProps } from "react-native";

export type ThemedTextProps = TextProps & {
  type?: "default" | "title" | "link";
};

export function ThemedText({ style, type = "default", ...rest }: ThemedTextProps) {
  return <Text style={[styles.default, styles[type], style]} {...rest} />;
}

const styles = StyleSheet.create({
  default: {
    color: "#11181c",
    fontSize: 16,
    lineHeight: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    lineHeight: 38,
  },
  link: {
    color: "#0a7ea4",
    fontWeight: "600",
  },
});
