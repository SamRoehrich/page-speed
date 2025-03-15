import React from "react";

export function Template({ children }) {
  return (
    <body className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 ">
      <main className="max-w-5xl mx-auto space-y-8 text-gray-100">
        {children}
      </main>
    </body>
  );
}
