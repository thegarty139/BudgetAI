'use client'

import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native'
import { useState } from 'react'
import { router } from 'expo-router'
import ProgressBar from './ProgressBar'
import IncomeSlide from './slides/IncomeSlide'
import ExpensesSlide from './slides/ExpensesSlide'
import GoalsSlide from './slides/GoalsSlide'
import ResultSlide from './slides/ResultSlide'
import { AntDesign } from '@expo/vector-icons';

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
    if (currentSlideIndex === 0) {
      router.push('/LandingPage')
    } else if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1)
    }
  }

  const handleResponse = (questionId: string, response: any) => {
    console.log('Setting response for:', questionId, response);
    setResponses((prev) => ({ ...prev, [questionId]: response }))
  }

  const CurrentSlide = slides[currentSlideIndex].component

  const formattedResponse = currentSlideIndex === slides.length - 1 ? {
    income: Number(responses.income) || 0,
    expenses: responses.expenses || {},
    goals: responses.goals || []
  } : responses[slides[currentSlideIndex].id];

  console.log('Formatted Response:', formattedResponse);
  console.log('All Responses:', responses);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable
          onPress={handlePrevious}
          style={styles.backButton}
        >
          <AntDesign 
            name="arrowleft" 
            size={24} 
            color="#374151"
          />
        </Pressable>
        <View style={styles.progressBarContainer}>
          <ProgressBar currentStep={currentSlideIndex + 1} totalSteps={slides.length} />
        </View>
      </View>

      <ScrollView style={styles.slideContent} contentContainerStyle={styles.slideContentContainer}>
        <CurrentSlide 
          onResponse={handleResponse} 
          response={formattedResponse}
        />
      </ScrollView>
      
      <View style={styles.buttonContainer}>
        <Pressable
          onPress={handleNext}
          disabled={currentSlideIndex === slides.length - 1}
          style={[styles.button, styles.nextButton, currentSlideIndex === slides.length - 1 && styles.disabledButton]}
        >
          <Text style={styles.nextButtonText}>
            {currentSlideIndex === slides.length - 2 ? 'Finish' : 'Next'}
          </Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: 672,
    marginHorizontal: 'auto',
    marginTop: 40,
    padding: 24,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  progressBarContainer: {
    flex: 1,
    marginLeft: 16,
  },
  backButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
  },
  slideContent: {
    flex: 1,
    marginBottom: 80, // Space for the button
  },
  slideContentContainer: {
    paddingBottom: 24,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 24,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  button: {
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 9999,
    width: 120,
    alignItems: 'center',
  },
  nextButton: {
    backgroundColor: '#3B82F6',
  },
  disabledButton: {
    opacity: 0.5,
  },
  nextButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});

