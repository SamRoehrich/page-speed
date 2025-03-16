import { renderToReadableStream } from "react-dom/server";
import { ServerRouter } from "@@/react/server-router";
import React from "react";
import { initAnalyticsDb, recordPageView } from "@@/sql-lite/analytics";

initAnalyticsDb();
const server = Bun.serve({
  port: 8080,
  async fetch(req) {
    const pathname = new URL(req.url).pathname;
    // Track page view
    const userAgent = req.headers.get("user-agent");
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    const referrer = req.headers.get("referer");

    // Record analytics asynchronously (don't wait for it)
    recordPageView(pathname, userAgent || undefined, ip, referrer || undefined);
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
        <ServerRouter location={pathname} />
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
