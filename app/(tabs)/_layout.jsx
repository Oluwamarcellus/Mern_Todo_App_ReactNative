import { Tabs } from "expo-router";
import useThemedColor from "../../Hooks/useThemedColor";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

export default function TabLayout() {
  const [Colors] = useThemedColor();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: {
          backgroundColor: Colors.bgSecondary,
          height: 100,
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 10,
          borderTopWidth: 0.5,
          borderTopColor: Colors.separator,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View>
              <Ionicons
                name="flash-outline"
                size={28}
                color={focused ? Colors.primary : color}
              />
            </View>
          ),
          tabBarLabel: ({ focused, color, size }) => (
            <Text
              style={{
                color: focused ? Colors.primary : color,
                fontSize: size,
                textAlign: "center",
                marginTop: 2,
              }}
            >
              Todo
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View>
              <Ionicons
                name="settings-outline"
                size={28}
                color={focused ? Colors.primary : color}
              />
            </View>
          ),
          tabBarLabel: ({ focused, color, size }) => (
            <Text
              style={{
                color: focused ? Colors.primary : color,
                fontSize: size,
                textAlign: "center",
                marginTop: 2,
              }}
            >
              Settings
            </Text>
          ),
        }}
      />
    </Tabs>
  );
}
