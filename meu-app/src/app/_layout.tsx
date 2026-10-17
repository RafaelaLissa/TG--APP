import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Esconde a barra branca padrão do topo para manter o seu design escuro
        animation: 'slide_from_right', // Animação suave de transição de tela
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="auth-choice" />
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
      <Stack.Screen name="age-verification" />
      <Stack.Screen name="guardian" />
      <Stack.Screen name="choose-companion" />
      <Stack.Screen name="companion-ready" />
    </Stack>
  );
}