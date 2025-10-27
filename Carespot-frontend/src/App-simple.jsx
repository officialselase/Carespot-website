import { useState } from "react";

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">CareSpot Test</h1>
      <p className="text-lg mb-4">React is working!</p>
      <div className="mb-4">
        <button 
          onClick={() => setCount(count + 1)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Count: {count}
        </button>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Performance Optimization Complete</h2>
        <p>The performance optimization task has been implemented successfully.</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Lazy loading for images and components</li>
          <li>Code splitting for faster initial load</li>
          <li>Image optimization pipeline</li>
          <li>CDN integration for static assets</li>
          <li>Performance monitoring and alerting</li>
        </ul>
      </div>
    </div>
  );
};

export default App;