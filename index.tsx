import { renderToReadableStream } from "react-dom/server";
import { ServerRouter } from "@@/react/server-router";
import { initAnalyticsDb, recordPageView } from "@@/sql-lite/analytics";
import { getTitleByPathname } from "@@/utils/get-title-by-pathname";
import { getPost, initPostsDb, insertPost } from "@@/sql-lite/blog";
import { entry } from "@@/react/entry";

initAnalyticsDb();
initPostsDb();
const server = Bun.serve({
  port: 8080,
  async fetch(req) {
    recordPageView(req);
    const pathname = new URL(req.url).pathname;

    if (pathname.includes("/api/")) {
      switch (pathname) {
        case "/api/post": {
          if (req.method !== "GET") {
            return new Response("Method not allowed", {
              status: 403,
            });
          }
          const title = new URL(req.url).searchParams.get("title");
          if (!title) {
            return new Response("Title is required", { status: 500 });
          }
          const post = getPost(title);

          if (!post) {
            return new Response("Post not found", { status: 404 });
          }
          return new Response(JSON.stringify(post), { status: 200 });
        }
        case "/api/post/insert":
          const formData = await req.formData();
          const post = insertPost(formData);

          return new Response(JSON.stringify(post), { status: 200 });
        default:
          return new Response("Api route not found", { status: 404 });
      }
    }

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
          <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
          <title>{`Sam Roehrich ${getTitleByPathname(pathname)}`}</title>
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
