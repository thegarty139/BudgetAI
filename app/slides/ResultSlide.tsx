import { View, Text, StyleSheet } from 'react-native'

interface ResultSlideProps {
  response?: {
    income: number;
    expenses: { [key: string]: number };
    goals: string[];
  };
}

export default function ResultSlide({ response }: ResultSlideProps) {
  const { 
    income = 0, 
    expenses = {}, 
    goals = [] 
  } = response || {};
  
  const totalExpenses = Object.values(expenses).reduce((sum, expense) => sum + expense, 0);
  const savings = income - totalExpenses;

  return (
    <View>
      <Text style={styles.title}>Your Customized Budget Summary</Text>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Monthly Income: ${income}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Monthly Expenses:</Text>
        {Object.entries(expenses).map(([category, amount]) => (
          <Text key={category} style={styles.categoryText}>
            {category}: ${amount}
          </Text>
        ))}
        <Text style={styles.totalExpenses}>Total Expenses: ${totalExpenses}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Monthly Savings: ${savings}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Financial Goals:</Text>
        {goals && goals.length > 0 ? (
          goals.map((goal, index) => (
            <Text key={index} style={styles.goalText}>• {goal}</Text>
          ))
        ) : (
          <Text style={styles.goalText}>No goals set</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  categoryText: {
    textTransform: 'capitalize',
    fontSize: 16,
    marginBottom: 4,
  },
  totalExpenses: {
    marginTop: 8,
    fontWeight: 'bold',
    fontSize: 16,
  },
  goalText: {
    fontSize: 16,
    marginVertical: 2,
    paddingLeft: 8,
  },
});

