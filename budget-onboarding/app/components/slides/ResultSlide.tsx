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
    <div>
      <h2 className="text-2xl font-bold mb-4">Your Customized Budget Summary</h2>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">Monthly Income: ${income}</h3>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">Monthly Expenses:</h3>
        <ul>
          {Object.entries(expenses).map(([category, amount]) => (
            <li key={category} className="capitalize">
              {category}: ${amount}
            </li>
          ))}
        </ul>
        <p className="mt-2 font-bold">Total Expenses: ${totalExpenses}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">Monthly Savings: ${savings}</h3>
      </div>
      <div>
        <h3 className="text-xl font-semibold">Financial Goals:</h3>
        <ul>
          {goals.map((goal, index) => (
            <li key={index}>{goal}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

