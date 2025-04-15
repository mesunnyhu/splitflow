'use client';

import { useState } from 'react';

export default function DashboardPage() {
  const [members, setMembers] = useState([{ name: '', percent: '' }]);
  const [total, setTotal] = useState('');
  const [projectName, setProjectName] = useState('');

  const handleMemberChange = (index: number, field: string, value: string) => {
    const updated = [...members];
    updated[index][field as 'name' | 'percent'] = value;
    setMembers(updated);
  };

  const addMember = () => {
    setMembers([...members, { name: '', percent: '' }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Save data to localStorage or pass via URL (for now)
    const payload = {
      projectName,
      total,
      members,
    };
    localStorage.setItem('splitflowData', JSON.stringify(payload));
    window.location.href = '/result';
  };

  return (
    <main className="max-w-xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold">SplitFlow Dashboard</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border p-2 rounded"
          type="text"
          placeholder="Project Name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          required
        />

        <input
          className="w-full border p-2 rounded"
          type="number"
          placeholder="Total Amount"
          value={total}
          onChange={(e) => setTotal(e.target.value)}
          required
        />

        {members.map((member, idx) => (
          <div key={idx} className="flex gap-2">
            <input
              className="flex-1 border p-2 rounded"
              type="text"
              placeholder="Name"
              value={member.name}
              onChange={(e) => handleMemberChange(idx, 'name', e.target.value)}
              required
            />
            <input
              className="w-24 border p-2 rounded"
              type="number"
              placeholder="%"
              value={member.percent}
              onChange={(e) => handleMemberChange(idx, 'percent', e.target.value)}
              required
            />
          </div>
        ))}

        <button
          type="button"
          onClick={addMember}
          className="bg-gray-100 border px-4 py-2 rounded"
        >
          ➕ Add Member
        </button>

        <button
          type="submit"
          className="bg-black text-white px-6 py-2 rounded w-full"
        >
          Calculate Split
        </button>
      </form>
    </main>
  );
}
