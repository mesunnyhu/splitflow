'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

interface SplitRecord {
  id: string;
  project_name: string;
  total: number;
  members: { name: string; percent: string }[];
  created_at: string;
}

export default function HistoryPage() {
  const [splits, setSplits] = useState<SplitRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const fetchSplits = async () => {
      const { data, error } = await supabase
        .from('splits')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching splits:', error);
      } else {
        setSplits(data as SplitRecord[]);
      }

      setLoading(false);
    };

    fetchSplits();
  }, []);

  return (
    <main className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">📜 Split History</h1>

      {loading ? (
        <p>Loading splits...</p>
      ) : splits.length === 0 ? (
        <p>No previous splits found.</p>
      ) : (
        <div className="space-y-4">
          {splits.map((split) => (
            <div
              key={split.id}
              className="border rounded-lg p-4 shadow bg-white"
            >
              <h2 className="text-lg font-semibold text-gray-800">
                {split.project_name}
              </h2>
              <p className="text-sm text-gray-500">
                Total: ₹{split.total} | Date: {new Date(split.created_at).toLocaleString()}
              </p>
              <ul className="mt-2 space-y-1 text-sm text-gray-700">
                {split.members.map((m, i) => (
                  <li key={i}>
                    {m.name} – {m.percent}%
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
