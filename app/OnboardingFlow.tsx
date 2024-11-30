'use client'

import { View, Text, Pressable } from 'react-native'
import { useState } from 'react'
import ProgressBar from './ProgressBar'
import IncomeSlide from './slides/IncomeSlide'
import ExpensesSlide from './slides/ExpensesSlide'
import GoalsSlide from './slides/GoalsSlide'
import ResultSlide from './slides/ResultSlide'

const slides = [
  { id: 'income', component: IncomeSlide },
  { id: 'expenses', component: ExpensesSlide },
  { id: 'goals', component: GoalsSlide },
  { id: 'result', component: ResultSlide },
]

interface Responses {
  [key: string]: any;
}

export default function OnboardingFlow() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const [responses, setResponses] = useState<Responses>({})

  const handleNext = () => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1)
    }
  }

  const handlePrevious = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1)
    }
  }

  const handleResponse = (questionId: string, response: any) => {
    setResponses((prev) => ({ ...prev, [questionId]: response }))
  }

  const CurrentSlide = slides[currentSlideIndex].component

  return (
    <View className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <ProgressBar currentStep={currentSlideIndex + 1} totalSteps={slides.length} />
      <CurrentSlide onResponse={handleResponse} response={responses[slides[currentSlideIndex].id]} />
      <View className="mt-6 flex justify-between">
        <Pressable
          onPress={handlePrevious}
          disabled={currentSlideIndex === 0}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          <Text className="text-gray-700">Previous</Text>
        </Pressable>
        <Pressable
          onPress={handleNext}
          disabled={currentSlideIndex === slides.length - 1}
          className="px-4 py-2 bg-blue-500 rounded disabled:opacity-50"
        >
          <Text className="text-white">
            {currentSlideIndex === slides.length - 2 ? 'Finish' : 'Next'}
          </Text>
        </Pressable>
      </View>
    </View>
  )
}

