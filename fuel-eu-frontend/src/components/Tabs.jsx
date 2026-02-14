export default function Tabs({ activeTab, setActiveTab }) {
  const tabs = ["Routes", "Compare", "Banking", "Pooling"];

  return (
    <div className="flex space-x-4 border-b pb-2 mb-6">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-4 py-2 rounded-t-lg font-medium ${
            activeTab === tab
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}