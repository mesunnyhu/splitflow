'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-6">
      {/* Add your logo inside public folder and replace path */}
      <Image src="/splitflow-logo.png" alt="SplitFlow" width={120} height={120} className="mb-6" />
      
      <h1 className="text-4xl sm:text-5xl font-bold text-center max-w-xl leading-tight">
        Split Payments Instantly.
      </h1>

      <p className="text-lg text-gray-300 mt-4 mb-8 text-center max-w-md">
        Built for teams, creators & freelancers to split income by %
      </p>

      <Link href="/split" className="bg-white text-black px-6 py-3 rounded-lg font-semibold">
        🚀 Get Started
      </Link>
    </main>
  );
}
