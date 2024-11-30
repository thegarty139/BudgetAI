import { View, Text, TextInput } from 'react-native'
import { useState, useEffect } from 'react'

interface IncomeSlideProps {
  onResponse: (questionId: string, response: number) => void
  response?: number
}

export default function IncomeSlide({ onResponse, response }: IncomeSlideProps) {
  const [income, setIncome] = useState(response || 0)

  useEffect(() => {
    onResponse('income', income)
  }, [income, onResponse])

  return (
    <View>
      <Text className="text-2xl font-bold mb-4">What's your monthly income?</Text>
      <TextInput
        keyboardType="numeric"
        value={income.toString()}
        onChangeText={(text) => setIncome(Number(text))}
        className="w-full p-2 border border-gray-300 rounded"
        placeholder="Enter your monthly income"
      />
    </View>
  )
}

