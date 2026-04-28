import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar"; 
import "../global.css"
import { ThemeProvider } from "@react-navigation/native";
import { Text, useColorScheme, View } from "react-native";
import { Portal } from '@rn-primitives/portal';
import { NAV_THEME } from "@/lib/theme";

export default function RootLayout() {
  const colorScheme = useColorScheme() ?? "light";

  return (
    <ThemeProvider value={NAV_THEME[colorScheme]}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      <Stack />
      <Portal name='example-portal' hostName='example-host'>
        <View>
          <Text>I will be rendered above the Content component</Text>
        </View>
      </Portal>
    </ThemeProvider>
  );
}
