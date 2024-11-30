import { View } from 'react-native';
import OnboardingFlow from './OnboardingFlow'
import LandingPage from './LandingPage';
import { useState } from 'react';
import { router } from 'expo-router';

function App() {
  const setIsOnboarding = (value: boolean) => {
    router.push(value ? '/OnboardingFlow' : '/LandingPage');
  }

  return (
    <View>
      <LandingPage onBegin={() => setIsOnboarding(true)} />
    </View>
  );
}

export default App;

