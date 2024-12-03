import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native'
import { useState, useEffect } from 'react'

interface GoalsSlideProps {
  onResponse: (questionId: string, response: string[]) => void
  response?: string[]
}

export default function GoalsSlide({ onResponse, response }: GoalsSlideProps) {
  const [goals, setGoals] = useState<string[]>(response || [])

  useEffect(() => {
    // Remove the response check since we always want to update goals
    const hasChanged = !response || 
      goals.length !== response.length || 
      goals.some((goal, index) => goal !== response[index]);

    if (hasChanged) {
      onResponse('goals', goals);
    }
  }, [goals, onResponse, response]);

  const handleGoalChange = (index: number, text: string) => {
    const newGoals = [...goals]
    newGoals[index] = text
    setGoals(newGoals)
  }

  const addGoal = () => {
    setGoals(prev => [...prev, ''])
  }

  return (
    <View>
      <Text style={styles.title}>What are your financial goals?</Text>
      {goals.map((goal, index) => (
        <TextInput
          key={index}
          value={goal}
          onChangeText={(text) => handleGoalChange(index, text)}
          style={styles.input}
          placeholder="Enter a financial goal"
        />
      ))}
      <Pressable onPress={addGoal} style={styles.addButton}>
        <Text style={styles.addButtonText}>Add Goal</Text>
      </Pressable>
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
    marginBottom: 8,
  },
  addButton: {
    backgroundColor: '#22C55E',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 8,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

