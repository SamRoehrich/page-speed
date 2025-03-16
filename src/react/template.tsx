import { getPageViewsForPath } from "@@/sql-lite/analytics";
import React, { type ReactNode } from "react";

export function Template({
  children,
  pathname,
}: {
  children: ReactNode;
  pathname: string;
}) {
  return (
    <body className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 ">
      <main className="max-w-5xl mx-auto space-y-8 text-gray-100">
        <section className="text-center">
          <h1 className="text-4xl font-bold mb-2">
            <a href="/"> Sam Roehrich </a>
          </h1>
          <h2 className="text-xl font-light">Software Engineer</h2>
        </section>

        <section className="bg-gray-800 shadow rounded-lg">
          <nav>
            <ul className="flex flex-col sm:flex-row align-middle text-center space-y-4 sm:space-y-0 justify-between px-12 py-6 text-xl">
              <li>
                <a href="/blog">Blog</a>
              </li>
              <li>
                <a href="/work">Work</a>
              </li>
              <li className="hidden md:block">
                <a href="/video">Video</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
            </ul>
          </nav>
        </section>

        {children}
      </main>
      <footer className="bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8 text-gray-100">
        views: {getPageViewsForPath(pathname)?.view_count}
      </footer>
    </body>
  );
}
