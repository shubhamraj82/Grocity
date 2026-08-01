import { FontAwesome6 } from "@expo/vector-icons";
import * as Sentry from "@sentry/react-native";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const sentryDsn = process.env.EXPO_PUBLIC_SENTRY_DSN?.trim();
const hasValidSentryDsn = (() => {
  if (!sentryDsn) return false;

  try {
    const url = new URL(sentryDsn);
    return (
      url.protocol === "https:" &&
      Boolean(url.username) &&
      /^\/\d+\/?$/.test(url.pathname) &&
      !url.search &&
      !url.hash
    );
  } catch {
    return false;
  }
})();

const SentryFeedbackButton = () => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        position: "absolute",
        right: 16,
        zIndex: 50,
        bottom: insets.bottom + 90,
      }}
    >
      <Pressable
        disabled={!hasValidSentryDsn}
        onPress={() => Sentry.showFeedbackWidget()}
        className={`flex-row items-center gap-2 rounded-full border border-border bg-card px-4 py-3 ${!hasValidSentryDsn ? "opacity-50" : ""}`}
      >
        <FontAwesome6 name="comment-dots" size={14} color="hsl(136 42% 92%)" />
        <Text className={`text-sm font-semibold text-foreground`}>Feedback</Text>
      </Pressable>
    </View>
  );
};
export default SentryFeedbackButton;
