import { ClerkProvider } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";
import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from "expo-router";
import "../../global.css";
import * as Sentry from "@sentry/react-native";
import { useColorScheme } from "react-native";
import { KeyboardProvider } from "react-native-keyboard-controller";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY ?? "";
const sentryDsn = process.env.EXPO_PUBLIC_SENTRY_DSN?.trim();

const isValidSentryDsn = (value?: string) => {
  if (!value) return false;

  try {
    const url = new URL(value);
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
};

if (!publishableKey) {
  throw new Error("Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY to your .env file");
}
if (isValidSentryDsn(sentryDsn)) {
  Sentry.init({
    dsn: sentryDsn,
    integrations: [Sentry.feedbackIntegration()],
  });
} else if (__DEV__) {
  console.warn(
    "Sentry is disabled: EXPO_PUBLIC_SENTRY_DSN must be the project DSN from Sentry settings, not an Issues URL.",
  );
}


export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
           <KeyboardProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack screenOptions={{ headerShown: false }} />
        </ThemeProvider>
      </KeyboardProvider>
    </ClerkProvider>
  );
}
