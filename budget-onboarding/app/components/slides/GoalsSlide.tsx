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
    <div>
      <h2 className="text-2xl font-bold mb-4">What are your financial goals?</h2>
      {goals.map((goal, index) => (
        <input
          key={index}
          type="text"
          value={goal}
          onChange={(e) => handleGoalChange(index, e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-2"
          placeholder="Enter a financial goal"
        />
      ))}
      <button onClick={addGoal} className="mt-2 px-4 py-2 bg-green-500 text-white rounded">
        Add Goal
      </button>
    </div>
  )
}

