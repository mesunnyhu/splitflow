export default function NotFound() {
    return (
      <main className="h-screen flex items-center justify-center text-center p-6">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">404 – Page Not Found</h1>
          <p className="text-gray-600">Oops! That route doesn’t exist on SplitFlow.</p>
          <a href="/" className="inline-block mt-4 px-6 py-2 bg-black text-white rounded">
            Go Home
          </a>
        </div>
      </main>
    );
  }
  