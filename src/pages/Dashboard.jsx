import React, { useEffect, useState } from "react";
import API from "../utils/api";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Dashboard = () => {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await API.get("/summary");
        const { data } = res.data;
        const summary = {
          totalExpenses: data[0].total,
          totalIncome: data[0].total,
          balance: data[0].total - data[0].total,
        };
        setSummary(summary);
      } catch (err) {
        console.error("Failed to fetch summary", err);
      }
    };
    fetchSummary();
  }, []);

  const chartData = {
    labels: ["Income", "Expenses", "Balance"],
    datasets: [
      {
        label: "Amount",
        data: summary
          ? [summary.totalIncome, summary.totalExpenses, summary.balance]
          : [0, 0, 0],
        backgroundColor: ["#34d399", "#f87171", "#60a5fa"],
      },
    ],
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {summary ? (
        <div className="bg-white p-4 rounded shadow-md">
          <Bar data={chartData} />
        </div>
      ) : (
        <p>Loading summary...</p>
      )}
    </div>
  );
};

export default Dashboard;
