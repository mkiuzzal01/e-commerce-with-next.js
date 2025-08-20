"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <html>
      <body className="flex min-h-screen flex-col items-center justify-center bg-gray-100 text-center">
        <h1 className="text-4xl font-bold text-red-600">
          Something went wrong
        </h1>
        <p className="mt-2 text-gray-700">
          The server seems unavailable. Please try again later.
        </p>
        <button
          onClick={() => reset()}
          className="mt-4 px-6 py-2 bg-orange-400 text-white font-medium hover:bg-orange-700 transition"
        >
          Retry
        </button>
      </body>
    </html>
  );
}
