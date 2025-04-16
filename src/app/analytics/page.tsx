'use client';

import { useEffect, useState } from 'react';

export default function AnalyticsPage() {
  const [splitCount, setSplitCount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [uniqueUsers, setUniqueUsers] = useState<string[]>([]);

  useEffect(() => {
    const count = parseInt(localStorage.getItem('splitCount') || '0');
    const amount = parseFloat(localStorage.getItem('totalSplitAmount') || '0');
    const users = JSON.parse(localStorage.getItem('uniqueUsers') || '[]');

    setSplitCount(count);
    setTotalAmount(amount);
    setUniqueUsers(users);
  }, []);

  return (
    <main className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-center">📊 SplitFlow Analytics</h1>

      <div className="grid grid-cols-1 gap-4 text-center">
        <div className="bg-white p-4 rounded shadow border">
          <h2 className="text-lg text-gray-700">🔢 Total Splits</h2>
          <p className="text-3xl font-bold">{splitCount}</p>
        </div>

        <div className="bg-white p-4 rounded shadow border">
          <h2 className="text-lg text-gray-700">💸 Total ₹ Split</h2>
          <p className="text-3xl font-bold">₹{totalAmount.toLocaleString()}</p>
        </div>

        <div className="bg-white p-4 rounded shadow border">
          <h2 className="text-lg text-gray-700">👥 Unique Users</h2>
          <p className="text-3xl font-bold">{uniqueUsers.length}</p>
        </div>
      </div>
    </main>
  );
}
