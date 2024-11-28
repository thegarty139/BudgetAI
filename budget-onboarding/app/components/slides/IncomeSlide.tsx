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
    <div>
      <h2 className="text-2xl font-bold mb-4">What's your monthly income?</h2>
      <input
        type="number"
        value={income}
        onChange={(e) => setIncome(Number(e.target.value))}
        className="w-full p-2 border border-gray-300 rounded"
        placeholder="Enter your monthly income"
      />
    </div>
  )
}

