'use client';

import { useEffect, useState } from 'react';

interface Member {
  name: string;
  percent: string;
  payout?: number;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function ResultPage() {
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

  const handlePayment = async () => {
    try {
      const res = await fetch('/api/razorpay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: totalAmount }),
      });

      const order = await res.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '', // Make sure this is defined
        amount: order.amount,
        currency: order.currency,
        name: projectName || 'SplitFlow Project',
        description: 'SplitFlow Payment',
        order_id: order.id,
        handler(response: any) {
          console.log('✅ Payment Success:', response);
          window.location.href = '/success';
        },
        prefill: {
          name: 'Test User',
          email: 'test@example.com',
          contact: '9999999999',
        },
        notes: {
          project: projectName,
        },
        theme: { color: '#000000' },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('❌ Payment failed to initiate:', error);
      alert('Something went wrong with payment initiation.');
    }
  };

  return (
    <main className="max-w-xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">🔍 Split Results</h1>
      <p className="text-lg">💼 Project: {projectName}</p>
      <p>💰 Total: ₹{totalAmount.toLocaleString()}</p>

      <div className="space-y-2">
        {members.map((m, i) => (
          <div
            key={i}
            className="flex justify-between p-2 border rounded bg-gray-50"
          >
            <span>{m.name} ({m.percent}%)</span>
            <span>₹{m.payout?.toFixed(2)}</span>
          </div>
        ))}
      </div>

      <button
        onClick={handlePayment}
        className="mt-4 w-full bg-black text-white py-3 rounded hover:bg-gray-900 transition"
      >
        💳 Proceed to Payment
      </button>
    </main>
  );
}
