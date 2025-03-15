import homepage from "./src/html/homepage.html";
import pageSpeed from "./src/html/page-speed.html";
import blogPage from "./src/html/blog.html";
import toolsPage from "./src/html/tools.html";
import changeLogPage from "./src/html/change-log.html";

import { renderToReadableStream } from "react-dom/server";
import { BlogHome } from "@@/react/blog";
import React from "react";

const server = Bun.serve({
  port: 8080,
  async fetch(req, server) {
    const pathname = new URL(req.url).pathname;
    if (pathname === "/slash") {
      return new Response("Redirecting to www.slashpages.net", {
        status: 307,
        headers: {
          Location: "https://www.slashpages.net",
        },
      });
    }
    const stream = await renderToReadableStream(
      <html>
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <script src="https://cdn.tailwindcss.com"></script>
          <title>{pathname}</title>
        </head>
        <BlogHome />,
      </html>,
    );
    return new Response(stream, {
      headers: {
        "Content-Type": "text/html",
      },
    });
  },
});

console.log("running on ", server.url.port);
