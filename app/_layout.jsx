import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider, useThemedColor } from "../context/ThemeContest";
import { TodoProvider } from "../context/TodoContest";
import { UserProvider } from "../context/UserContest";

export default function RootLayout() {
  const AppStatusBar = () => {
    const { theme } = useThemedColor();
    return <StatusBar style={theme === "dark" ? "light" : "dark"} />;
  };

  return (
    <ThemeProvider>
      <UserProvider>
        <TodoProvider>
          <AppStatusBar />
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
          </Stack>
        </TodoProvider>
      </UserProvider>
    </ThemeProvider>
  );
}
