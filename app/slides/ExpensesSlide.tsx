import { View, Text, TextInput, StyleSheet } from 'react-native'
import { useState, useEffect } from 'react'

type ExpenseCategories = {
  housing: number;
  food: number;
  transportation: number;
  utilities: number;
  other: number;
}

interface ExpensesSlideProps {
  onResponse: (questionId: string, response: ExpenseCategories) => void
  response?: ExpenseCategories
}

export default function ExpensesSlide({ onResponse, response }: ExpensesSlideProps) {
  const initialExpenses: ExpenseCategories = {
    housing: 0,
    food: 0,
    transportation: 0,
    utilities: 0,
    other: 0,
  };

  const [expenses, setExpenses] = useState<ExpenseCategories>(response || initialExpenses);

  useEffect(() => {
    // Skip the initial render
    if (!response) {
      return;
    }

    // Deep comparison of expenses
    const hasChanged = Object.keys(expenses).some(
      (key) => expenses[key as keyof ExpenseCategories] !== response[key as keyof ExpenseCategories]
    );

    if (hasChanged) {
      onResponse('expenses', expenses);
    }
  }, [expenses, onResponse, response]);

  const handleExpenseChange = (category: keyof ExpenseCategories, text: string) => {
    const value = text ? Number(text) : 0;
    setExpenses(prev => ({
      ...prev,
      [category]: value
    }));
  };

  return (
    <View>
      <Text style={styles.title}>What are your monthly expenses?</Text>
      {Object.entries(expenses).map(([category, amount]) => (
        <View key={category} style={styles.inputContainer}>
          <Text style={styles.label}>{category}</Text>
          <TextInput
            keyboardType="numeric"
            value={amount.toString()}
            onChangeText={(text) => handleExpenseChange(category as keyof ExpenseCategories, text)}
            style={styles.input}
            placeholder={`Enter ${category} expenses`}
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
    textTransform: 'capitalize',
  },
  input: {
    width: '100%',
    padding: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 4,
  },
});

