'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function StatsPage() {
  const [splitCount, setSplitCount] = useState(0);
  const [totalSplitAmount, setTotalSplitAmount] = useState(0);
  const [uniqueUsers, setUniqueUsers] = useState<string[]>([]);

  useEffect(() => {
    setSplitCount(parseInt(localStorage.getItem('splitCount') || '0'));
    setTotalSplitAmount(parseFloat(localStorage.getItem('totalSplitAmount') || '0'));
    const users = JSON.parse(localStorage.getItem('uniqueUsers') || '[]');
    setUniqueUsers(users);
  }, []);

  return (
    <main className="max-w-xl mx-auto min-h-screen p-6 flex flex-col items-center justify-center bg-white text-black">
      <h1 className="text-3xl font-bold mb-4">📊 SplitFlow Stats</h1>

      <div className="bg-gray-100 p-6 rounded-lg shadow-md w-full space-y-4">
        <div className="flex justify-between">
          <span>🔁 Total Splits</span>
          <span className="font-semibold">{splitCount}</span>
        </div>
        <div className="flex justify-between">
          <span>💰 Total Value Split</span>
          <span className="font-semibold">₹{totalSplitAmount.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span>👥 Unique People Paid</span>
          <span className="font-semibold">{uniqueUsers.length}</span>
        </div>
      </div>

      <Link
        href="/"
        className="mt-6 inline-block bg-black text-white px-6 py-3 rounded hover:bg-gray-900 transition"
      >
        🔙 Back to Home
      </Link>
    </main>
  );
}
