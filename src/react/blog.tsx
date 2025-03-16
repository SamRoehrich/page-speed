import React from "react";
export function Blog() {
  return (
    <div className="space-y-8 ">
      <section className="shadow rounded-lg p-12">
        <h1 className="font-bold">Under Construction</h1>
        <a href="/next-and-graphql" className="hidden">
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
