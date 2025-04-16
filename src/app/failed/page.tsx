'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function FailurePage() {
  useEffect(() => {
    try {
      const raw = localStorage.getItem('splitflowData');
      if (raw) {
        const { projectName, total, members }: {
          projectName: string;
          total: string;
          members: { name: string; percent: string }[];
        } = JSON.parse(raw);

        fetch('/api/log', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            status: 'failure',
            projectName,
            totalAmount: parseFloat(total),
            members,
            timestamp: new Date().toISOString()
          })
        });
      }
    } catch (err) {
      console.error('Error parsing localStorage:', err);
    }
  }, []);

  return (
    <main className="max-w-xl mx-auto p-6 space-y-6 text-center bg-red-50 min-h-screen flex flex-col justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md border border-red-200">
        <h1 className="text-3xl font-bold text-red-600">❌ Payment Failed</h1>
        <p className="text-lg text-gray-700">
          Oops! The payment didn’t go through or was cancelled.
        </p>

        <p className="text-sm text-gray-500 mt-2">
          You can try again or go back to update the split details.
        </p>

        <div className="flex flex-col gap-4 mt-6">
          <Link
            href="/dashboard"
            className="bg-black text-white py-3 px-6 rounded hover:bg-gray-900 transition"
          >
            🔁 Try Again
          </Link>

          <Link
            href="/"
            className="text-sm text-gray-400 underline hover:text-gray-600"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
