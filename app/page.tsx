import { useState } from "react";
import SalesDashboard from "./components/SalesDashboard";

export default function Home() {
  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Sales Dashboard</h1>

      <SalesDashboard />
    </div>
  );
}
