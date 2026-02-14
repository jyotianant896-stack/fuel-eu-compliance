import { useEffect, useState } from "react";
import { fetchBankedRoutes } from "../api/api";

export default function BankingTab() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchBankedRoutes().then(setData);
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Banked Routes</h2>
      <pre className="bg-white p-4 rounded shadow">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}