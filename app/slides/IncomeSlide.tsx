import { View, Text, TextInput, StyleSheet } from 'react-native'
import { useState, useEffect } from 'react'

interface IncomeSlideProps {
  onResponse: (questionId: string, response: number) => void
  response?: number
}

export default function IncomeSlide({ onResponse, response }: IncomeSlideProps) {
  const [income, setIncome] = useState(response || 0)

  useEffect(() => {
    if (income !== response) {
      onResponse('income', income)
    }
  }, [income, onResponse, response])

  const handleIncomeChange = (text: string) => {
    const value = text ? Number(text) : 0
    setIncome(value)
  }

  return (
    <View>
      <Text style={styles.title}>What's your monthly income?</Text>
      <TextInput
        keyboardType="numeric"
        value={income.toString()}
        onChangeText={handleIncomeChange}
        style={styles.input}
        placeholder="Enter your monthly income"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    width: '100%',
    padding: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 4,
  },
});

