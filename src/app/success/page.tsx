'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Member {
  name: string;
  percent: string;
  payout?: number;
}

export default function SuccessPage() {
  const [projectName, setProjectName] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem('splitflowData');
    if (raw) {
      const { projectName, total, members } = JSON.parse(raw);
      const totalAmt = parseFloat(total);

      const withPayout = members.map((member: Member) => ({
        ...member,
        payout: ((parseFloat(member.percent) || 0) / 100) * totalAmt,
      }));

      setProjectName(projectName);
      setTotalAmount(totalAmt);
      setMembers(withPayout);
    }
  }, []);

  return (
    <main className="max-w-xl mx-auto p-6 space-y-6 text-center">
      <h1 className="text-3xl font-bold text-green-600">✅ Payment Successful!</h1>
      <p className="text-lg">Thanks for using SplitFlow 🪄</p>

      <div className="bg-gray-50 p-4 rounded border text-left">
        <h2 className="text-xl font-semibold mb-2">Project: {projectName}</h2>
        <p className="mb-2">💰 Total Paid: ₹{totalAmount.toLocaleString()}</p>
        <ul className="space-y-2">
          {members.map((m, i) => (
            <li key={i} className="flex justify-between">
              <span>{m.name} ({m.percent}%)</span>
              <span>₹{m.payout?.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </div>

      <Link
        href="/"
        className="inline-block mt-4 bg-black text-white py-3 px-6 rounded hover:bg-gray-900 transition"
      >
        🔁 Create Another Split
      </Link>
    </main>
  );
}
