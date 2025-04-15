'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-6">
      {/* Logo */}
      <Image
        src="/splitflow-logo.png"
        alt="SplitFlow"
        width={120}
        height={120}
        className="mb-6"
      />

      {/* Headline */}
      <h1 className="text-4xl sm:text-5xl font-bold text-center max-w-xl leading-tight">
        Split Payments Instantly.
      </h1>

      {/* Subheading */}
      <p className="text-lg text-gray-300 mt-4 mb-8 text-center max-w-md">
        Built for teams, creators & freelancers to split income by %
      </p>

      {/* CTA */}
      <Link
        href="/dashboard"
        className="bg-white text-black px-6 py-3 rounded-lg font-semibold"
      >
        🚀 Get Started
      </Link>

      {/* Feedback Button */}
      <div className="mt-10">
        <a
          href="https://tally.so/r/wAQaOl"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-gray-400 hover:text-white underline"
        >
          💬 Got feedback? Let us know
        </a>
      </div>

      <Link href="/stats" className="text-sm mt-6 underline text-gray-400 hover:text-white">
  📊 View Stats
      </Link>
    </main>
  );
}
