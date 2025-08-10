'use client'
import { useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const years = [2022, 2023, 2024];
const chartTypes = ["bar", "line", "pie"];

interface SalesData {
  month: string;
  sales: number;
}

const mockSalesData: Record<number, SalesData[]> = {
  2022: [
    { month: "Jan", sales: 400 },
    { month: "Feb", sales: 300 },
    { month: "Mar", sales: 500 },
    { month: "Apr", sales: 200 },
    { month: "May", sales: 700 },
    { month: "Jun", sales: 600 },
  ],
  2023: [
    { month: "Jan", sales: 450 },
    { month: "Feb", sales: 350 },
    { month: "Mar", sales: 550 },
    { month: "Apr", sales: 250 },
    { month: "May", sales: 750 },
    { month: "Jun", sales: 650 },
  ],
  2024: [
    { month: "Jan", sales: 500 },
    { month: "Feb", sales: 400 },
    { month: "Mar", sales: 600 },
    { month: "Apr", sales: 300 },
    { month: "May", sales: 800 },
    { month: "Jun", sales: 700 },
  ],
};

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA336A", "#663399"];

export default function SalesDashboard() {
  const [selectedYear, setSelectedYear] = useState<number>(2024);
  const [selectedChart, setSelectedChart] = useState<string>("bar");
  const [salesThreshold, setSalesThreshold] = useState<number>(0);

  const filteredData = mockSalesData[selectedYear].filter(
    (item) => item.sales >= salesThreshold
  );

  const renderChart = () => {
    switch (selectedChart) {
      case "bar":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={filteredData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        );
      case "line":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={filteredData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        );
      case "pie":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={filteredData}
                dataKey="sales"
                nameKey="month"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {filteredData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="mb-4">
        <span className="mr-4 font-semibold">Select Year:</span>
        {years.map((year) => (
          <button
            key={year}
            onClick={() => setSelectedYear(year)}
            className={`mr-2 px-3 py-1 rounded ${
              selectedYear === year ? "bg-blue-600 text-white" : "bg-gray-300"
            }`}
          >
            {year}
          </button>
        ))}
      </div>

      <div className="mb-4">
        <span className="mr-4 font-semibold">Select Chart Type:</span>
        {chartTypes.map((type) => (
          <button
            key={type}
            onClick={() => setSelectedChart(type)}
            className={`mr-2 px-3 py-1 rounded ${
              selectedChart === type ? "bg-green-600 text-white" : "bg-gray-300"
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      <div className="mb-4">
        <label htmlFor="threshold" className="mr-2 font-semibold">
          Sales Threshold:
        </label>
        <input
          id="threshold"
          type="number"
          value={salesThreshold}
          onChange={(e) => setSalesThreshold(Number(e.target.value))}
          className="border rounded px-2 py-1 w-24"
          min={0}
        />
      </div>

      <div className="border p-4 bg-white rounded shadow">{renderChart()}</div>
    </div>
  );
}
