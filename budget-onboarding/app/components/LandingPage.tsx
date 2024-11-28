import Image from 'next/image'
import { Button } from "@/components/ui/button"

interface LandingPageProps {
  onBegin: () => void;
}

export default function LandingPage({ onBegin }: LandingPageProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-white p-4">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6 text-blue-800">Custom Budget Creator</h1>
        
        <div className="relative w-full h-64 mb-8">
          <Image
            src="/placeholder.svg?height=256&width=512"
            alt="Graphs and pie charts representing budget analysis"
            layout="fill"
            objectFit="contain"
          />
        </div>
        
        <p className="text-lg mb-8 text-gray-700">
          Welcome to your personal budget planner! Our application helps you create a customized budget 
          tailored to your unique financial situation. By answering a few simple questions about your 
          income, expenses, and financial goals, we'll help you develop a clear and actionable budget plan.
        </p>
        
        <Button 
          onClick={onBegin}
          className="px-8 py-3 text-lg bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
        >
          Begin
        </Button>
      </div>
    </div>
  )
}

