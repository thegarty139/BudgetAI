import { View, Text, TextInput, Pressable } from 'react-native'
import { useState, useEffect } from 'react'

interface GoalsSlideProps {
  onResponse: (questionId: string, response: string[]) => void
  response?: string[]
}

export default function GoalsSlide({ onResponse, response }: GoalsSlideProps) {
  const [goals, setGoals] = useState<string[]>(response || [])

  useEffect(() => {
    onResponse('goals', goals)
  }, [goals, onResponse])

  const handleGoalChange = (index: number, value: string) => {
    const newGoals = [...goals]
    newGoals[index] = value
    setGoals(newGoals)
  }

  const addGoal = () => {
    setGoals([...goals, ''])
  }

  return (
    <View>
      <Text className="text-2xl font-bold mb-4">What are your financial goals?</Text>
      {goals.map((goal, index) => (
        <TextInput
          key={index}
          value={goal}
          onChangeText={(text) => handleGoalChange(index, text)}
          className="w-full p-2 border border-gray-300 rounded mb-2"
          placeholder="Enter a financial goal"
        />
      ))}
      <Pressable onPress={addGoal} className="mt-2 px-4 py-2 bg-green-500 rounded">
        <Text className="text-white">Add Goal</Text>
      </Pressable>
    </View>
  )
}

