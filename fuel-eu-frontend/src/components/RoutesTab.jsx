import React, { useEffect, useState } from "react";
import { fetchRoutes } from "../api/api";

const RoutesTab = () => {
  const [routes, setRoutes] = useState([]);

 useEffect(() => {
  const loadRoutes = async () => {
    try {
      const data = await fetchRoutes();
      console.log("API RESPONSE:", data);  // 👈 important
      setRoutes(data);
    } catch (error) {
      console.error(error);
    }
  };

  loadRoutes();
}, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">All Routes</h2>

      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Route ID</th>
            <th className="border p-2">Vessel</th>
            <th className="border p-2">Fuel</th>
            <th className="border p-2">Year</th>
            <th className="border p-2">GHG Intensity</th>
          </tr>
        </thead>
        <tbody>
          {routes.map((route) => (
            <tr key={route.id}>
              <td className="border p-2">{route.id}</td>
              <td className="border p-2">{route.vessel}</td>
              <td className="border p-2">{route.fuelConsumption}</td>
              <td className="border p-2">{route.year}</td>
              <td className="border p-2">{route.emission}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoutesTab;