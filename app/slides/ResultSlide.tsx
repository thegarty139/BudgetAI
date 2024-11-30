import { View, Text, FlatList } from 'react-native'

interface ResultSlideProps {
  response: {
    income: number;
    expenses: { [key: string]: number };
    goals: string[];
  };
}

export default function ResultSlide({ response }: ResultSlideProps) {
  const { income, expenses, goals } = response;
  const totalExpenses = Object.values(expenses).reduce((sum, expense) => sum + expense, 0);
  const savings = income - totalExpenses;

  return (
    <View>
      <Text className="text-2xl font-bold mb-4">Your Customized Budget Summary</Text>
      <View className="mb-4">
        <Text className="text-xl font-semibold">Monthly Income: ${income}</Text>
      </View>
      <View className="mb-4">
        <Text className="text-xl font-semibold">Monthly Expenses:</Text>
        {Object.entries(expenses).map(([category, amount]) => (
          <Text key={category} className="capitalize">
            {category}: ${amount}
          </Text>
        ))}
        <Text className="mt-2 font-bold">Total Expenses: ${totalExpenses}</Text>
      </View>
      <View className="mb-4">
        <Text className="text-xl font-semibold">Monthly Savings: ${savings}</Text>
      </View>
      <View>
        <Text className="text-xl font-semibold">Financial Goals:</Text>
        {goals.map((goal, index) => (
          <Text key={index}>{goal}</Text>
        ))}
      </View>
    </View>
  );
}

