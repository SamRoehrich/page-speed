import React from "react";
export function Home() {
  return (
    <div className="space-y-8 ">
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

      <section className="bg-gray-800 shadow rounded-lg p-12">
        <a href="/next-and-graphql">
          <h1>Next.js 15 and Graphql</h1>

          <p>
            I wanted to write something before I started changing the strusture
            of this code anymore. I work at Outside Inc. on some pretty cool
            things. Outside has a lot of services internally, one of the big
            ones being our Graphql federated supergraph. The supergraph is used
            by a handful of teams so that we can easily share data across the
            org. It has its pain points but overall I think it is a good thing.
            Most of our frontend applications are React + Next.js or PHP and
            slowly they will all transition to Next.js. At the time of writing
            this Next.js and Graphql seem like two incompatible partners.
            Next.js is marketing itself as the tool that renders your Graphql
            backend obsolite. Thus, you don't find many 'How to' videos and
            tutorials for how to use the two together. I believe Next.js and
            Graphql are compatible and this post will show you how.
          </p>
        </a>
      </section>
    </div>
  );
}
