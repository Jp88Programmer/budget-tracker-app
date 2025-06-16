import React, { useEffect, useState } from "react";
import API from "../utils/api";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Budget = () => {
  const [budget, setBudget] = useState(0);
  const [expenses, setExpenses] = useState(0);

  const fetchBudgetData = async () => {
    const res = await API.get("/dashboard/summary");
    setBudget(res.data.monthlyBudget);
    setExpenses(res.data.expense);
  };

  useEffect(() => {
    fetchBudgetData();
  }, []);

  const chartData = {
    labels: ["Budget", "Expenses"],
    datasets: [
      {
        label: "Amount",
        data: [budget, expenses],
        backgroundColor: ["#60a5fa", "#f87171"],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: "Monthly Budget vs Expenses" },
    },
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Budget Overview</h2>
      <div className="bg-white rounded shadow p-4">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default Budget;
