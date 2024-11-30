import { View, Image, Pressable, Text } from 'react-native';

interface LandingPageProps {
  onBegin: () => void;
}

export default function LandingPage({ onBegin }: LandingPageProps) {
  return (
    <View className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-white p-4">
      <View className="max-w-2xl mx-auto text-center">
        <Text className="text-4xl font-bold mb-6 text-blue-800">Custom Budget Creator</Text>
        
        <View className="relative w-full h-64 mb-8">
          <Image
            src="/assets/images/budget-screen-1.png"
            alt="Graphs and pie charts representing budget analysis"
          />
        </View>
        
        <Text className="text-lg mb-8 text-gray-700">
          Welcome to your personal budget planner! Our application helps you create a customized budget 
          tailored to your unique financial situation. By answering a few simple questions about your 
          income, expenses, and financial goals, we'll help you develop a clear and actionable budget plan.
        </Text>
        
        <Pressable 
          onPress={onBegin}
          className="bg-blue-600 rounded-full active:bg-blue-700"
          style={({ pressed }) => [
            pressed && { opacity: 0.8 }
          ]}
        >
          <Text className="text-lg text-white px-8 py-3">Begin</Text>
        </Pressable>
      </View>
    </View>
  )
}

