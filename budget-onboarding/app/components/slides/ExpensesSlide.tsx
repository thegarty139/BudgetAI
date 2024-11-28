import { useState, useEffect } from 'react'

interface ExpensesSlideProps {
  onResponse: (questionId: string, response: { [key: string]: number }) => void
  response?: { [key: string]: number }
}

export default function ExpensesSlide({ onResponse, response }: ExpensesSlideProps) {
  const [expenses, setExpenses] = useState(response || {
    housing: 0,
    food: 0,
    transportation: 0,
    utilities: 0,
    other: 0,
  })

  useEffect(() => {
    onResponse('expenses', expenses)
  }, [expenses, onResponse])

  const handleExpenseChange = (category: string, value: number) => {
    setExpenses((prev) => ({ ...prev, [category]: value }))
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">What are your monthly expenses?</h2>
      {Object.entries(expenses).map(([category, amount]) => (
        <div key={category} className="mb-4">
          <label className="block mb-2 capitalize">{category}</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => handleExpenseChange(category, Number(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder={`Enter ${category} expenses`}
          />
        </div>
      ))}
    </div>
  )
}

