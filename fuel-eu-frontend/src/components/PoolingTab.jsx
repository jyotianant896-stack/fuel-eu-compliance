import React, { useEffect, useState } from "react";
import { fetchPooledRoutes } from "../api/api";

const PoolingTab = () => {
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    const loadRoutes = async () => {
      const data = await fetchPooledRoutes();
      setRoutes(data);
    };

    loadRoutes();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Pooled Routes</h2>

      <pre className="bg-gray-100 p-4">
        {JSON.stringify(routes, null, 2)}
      </pre>
    </div>
  );
};

export default PoolingTab;