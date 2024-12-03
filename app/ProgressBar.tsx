import { View, StyleSheet } from 'react-native'

interface ProgressBarProps {
  currentStep: number
  totalSteps: number
}

export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const progress = (currentStep / totalSteps) * 100

  return (
    <View style={styles.container}>
      <View
        style={[styles.progressBar, { width: `${progress}%` }]}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#E5E7EB',
    borderRadius: 9999,
    height: 10,
    marginBottom: 24,
  },
  progressBar: {
    backgroundColor: '#2563EB',
    height: 10,
    borderRadius: 9999,
  },
});

