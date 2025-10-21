import { Stack } from "expo-router";
import { ThemeProvider } from "../context/ThemeContest";
import { TodoProvider } from "../context/TodoContest";
import { UserProvider } from "../context/UserContest";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <UserProvider>
        <TodoProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
          </Stack>
        </TodoProvider>
      </UserProvider>
    </ThemeProvider>
  );
}
