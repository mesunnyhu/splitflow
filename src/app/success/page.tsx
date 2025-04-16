'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

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
      const { projectName, total, members }: {
        projectName: string;
        total: string;
        members: Member[];
      } = JSON.parse(raw);

      const totalAmt = parseFloat(total);
      const withPayout = members.map((member: Member) => ({
        ...member,
        payout: ((parseFloat(member.percent) || 0) / 100) * totalAmt,
      }));

      setProjectName(projectName);
      setTotalAmount(totalAmt);
      setMembers(withPayout);

      // ✅ Log to Supabase
      supabase.from('splits').insert([
        {
          project_name: projectName,
          total_amount: totalAmt,
          members: withPayout, // JSONB column
          created_at: new Date().toISOString(),
        }
      ]).then(({ error }) => {
        if (error) console.error('❌ Supabase insert error:', error.message);
        else console.log('✅ Saved split to Supabase');
      });

      // ✅ Optional log API hit (can remove later)
      fetch('/api/log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: 'success',
          projectName,
          totalAmount: totalAmt,
          members: withPayout,
          timestamp: new Date().toISOString(),
        }),
      });

      // 🧠 Track local stats
      const splitCount = parseInt(localStorage.getItem('splitCount') || '0');
      localStorage.setItem('splitCount', (splitCount + 1).toString());

      const totalSplitAmount = parseFloat(localStorage.getItem('totalSplitAmount') || '0');
      localStorage.setItem('totalSplitAmount', (totalSplitAmount + totalAmt).toString());

      const existingUsers = JSON.parse(localStorage.getItem('uniqueUsers') || '[]');
      const updatedUsers = [...new Set([...existingUsers, ...members.map(m => m.name)])];
      localStorage.setItem('uniqueUsers', JSON.stringify(updatedUsers));
    }
  }, []);

  return (
    <main className="max-w-xl mx-auto p-6 space-y-6 text-center bg-green-50 min-h-screen flex flex-col justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md border border-green-200">
        <h1 className="text-3xl font-bold text-green-700 mb-2">✅ Payment Successful!</h1>
        <p className="text-lg text-gray-700">Your split was processed successfully 🪄</p>

        <div className="mt-6 bg-gray-100 p-4 rounded text-left">
          <h2 className="text-lg font-semibold mb-2 text-gray-800">💼 Project: {projectName}</h2>
          <p className="mb-2 text-gray-600">💰 Total Paid: ₹{totalAmount.toLocaleString()}</p>
          <ul className="space-y-2">
            {members.map((m, i) => (
              <li key={i} className="flex justify-between text-sm text-gray-800">
                <span>{m.name} ({m.percent}%)</span>
                <span>₹{m.payout?.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </div>

        <Link
          href="/"
          className="inline-block mt-6 bg-black text-white py-3 px-6 rounded hover:bg-gray-900 transition"
        >
          🔁 Create Another Split
        </Link>
      </div>
    </main>
  );
}
