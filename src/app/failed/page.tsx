'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function FailurePage() {

    useEffect(() => {
        const raw = localStorage.getItem('splitflowData');
        if (raw) {
          const { projectName, total, members } = JSON.parse(raw);
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
      }, []);
      
  return (
    <main className="max-w-xl mx-auto p-6 space-y-6 text-center">
      <h1 className="text-3xl font-bold text-red-600">❌ Payment Failed</h1>
      <p className="text-lg text-gray-700">
        Oops! The payment didn’t go through or was cancelled.
      </p>

      <p className="text-sm text-gray-500">
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
    </main>
  );
}
