import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SettingsProvider } from './src/context/SettingsContext';
import { ThemeProvider } from './src/context/ThemeContext';
import { StatsProvider } from './src/context/StatsContext';
import { OnboardingProvider, useOnboarding } from './src/context/OnboardingContext';
import { OnboardingScreen } from './src/screens/OnboardingScreen';
import MainTabs from './src/navigation/MainTabs';

const AppContent = () => {
  const { done, complete } = useOnboarding();
  if (done === null) {
    return (
      <View style={styles.loading}>
        <Text style={styles.loadingText}>Cargando...</Text>
      </View>
    );
  }
  if (!done) {
    return <OnboardingScreen onComplete={complete} />;
  }
  return <MainTabs />;
};

export default function App() {
  return (
    <SafeAreaProvider>
      <OnboardingProvider>
        <SettingsProvider>
          <ThemeProvider>
            <StatsProvider>
              <AppContent />
            </StatsProvider>
          </ThemeProvider>
        </SettingsProvider>
      </OnboardingProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: '#1a2a24',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#8ba89a',
    fontSize: 16,
  },
});
