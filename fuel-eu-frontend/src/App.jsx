import { useState } from "react";
import Tabs from "./components/Tabs";
import RoutesTab from "./components/RoutesTab";
import CompareTab from "./components/CompareTab";
import BankingTab from "./components/BankingTab";
import PoolingTab from "./components/PoolingTab";

function App() {
  const [activeTab, setActiveTab] = useState("Routes");

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
        Fuel EU Compliance Dashboard 🚢
      </h1>

      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "Routes" && <RoutesTab />}
      {activeTab === "Compare" && <CompareTab />}
      {activeTab === "Banking" && <BankingTab />}
      {activeTab === "Pooling" && <PoolingTab />}
    </div>
  );
}

export default App;