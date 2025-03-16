import React, { type ReactNode } from "react";

export function Template({ children }: { children: ReactNode }) {
  return (
    <body className="min-h-screen bg-green-100/70 py-12 px-4 sm:px-6 lg:px-8 ">
      <main className="max-w-5xl mx-auto space-y-8 text-slate-900 font-mono">
        <section className="text-center flex items-center md:space-x-4 flex-col md:flex-row">
          <h1 className="text-4xl font-bold mb-2">
            <a href="/" className="hover:underline hover:text-slate-800">
              {" "}
              Sam Roehrich{" "}
            </a>
          </h1>
          <h2 className="text-xl font-light">Software Engineer</h2>
        </section>
        {children}
      </main>
    </body>
  );
}
