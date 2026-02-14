import React, { useState } from "react";
import { compareRoutes } from "../api/api";

const CompareTab = () => {
  const [id1, setId1] = useState("");
  const [id2, setId2] = useState("");
  const [result, setResult] = useState(null);

  const handleCompare = async () => {
    if (!id1 || !id2) return;

    const data = await compareRoutes(id1, id2);
    setResult(data);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Compare Routes</h2>

      <input
        type="text"
        placeholder="Route ID 1"
        value={id1}
        onChange={(e) => setId1(e.target.value)}
        className="border p-2 mr-2"
      />

      <input
        type="text"
        placeholder="Route ID 2"
        value={id2}
        onChange={(e) => setId2(e.target.value)}
        className="border p-2 mr-2"
      />

      <button
        onClick={handleCompare}
        className="bg-blue-500 text-white px-4 py-2"
      >
        Compare
      </button>

      {result && (
        <pre className="mt-4 bg-gray-100 p-4">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default CompareTab;