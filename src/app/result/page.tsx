'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface Member {
  name: string;
  percent: string;
  payout?: number;
}

export default function ResultPage() {
  const [loading, setLoading] = useState(true);
  const [projectName, setProjectName] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    const fetchSplit = async () => {
      const id = sessionStorage.getItem('lastProjectId');
      if (!id) {
        alert('❌ No project ID found!');
        return;
      }

      const { data, error } = await supabase
        .from('splits')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('❌ Error fetching split:', error);
        alert('Failed to fetch split data');
        return;
      }

      const total = parseFloat(data.total_amount);
      const enrichedMembers = data.members.map((m: Member) => ({
        ...m,
        payout: ((parseFloat(m.percent) || 0) / 100) * total,
      }));

      setProjectName(data.project_name);
      setTotalAmount(total);
      setMembers(enrichedMembers);
      setLoading(false);
    };

    fetchSplit();
  }, []);

  if (loading) {
    return (
      <main className="max-w-xl mx-auto p-6 text-center">
        <p className="text-gray-600">Loading your split results...</p>
      </main>
    );
  }

  return (
    <main className="max-w-xl mx-auto p-6 space-y-6 text-center">
      <h1 className="text-3xl font-bold text-black">🧮 Split Summary</h1>
      <p className="text-lg text-gray-700">💼 Project: {projectName}</p>
      <p className="text-gray-600">💰 Total Amount: ₹{totalAmount.toLocaleString()}</p>

      <div className="bg-gray-100 p-4 rounded-lg text-left">
        <h2 className="text-xl font-semibold mb-3">Members</h2>
        <ul className="space-y-2">
          {members.map((m, i) => (
            <li key={i} className="flex justify-between text-sm text-gray-800">
              <span>{m.name} ({m.percent}%)</span>
              <span>₹{m.payout?.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </div>
      {/* Feedback Box */}
<div className="mt-8 bg-white p-4 rounded-lg shadow border border-gray-200">
  <h3 className="text-lg font-semibold mb-2">💬 Got feedback?</h3>
  <form
    onSubmit={async (e) => {
      e.preventDefault();
      const form = e.target as HTMLFormElement;
      const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value;

      if (!message.trim()) return;

      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });

      form.reset();
      alert('Thanks for the feedback!');
    }}
  >
    <textarea
      name="message"
      rows={3}
      className="w-full border p-2 rounded mb-2"
      placeholder="Something you liked or want improved?"
      required
    />
    <button
      type="submit"
      className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
    >
      Send Feedback
    </button>
  </form>
</div>
    </main>
  );
}
