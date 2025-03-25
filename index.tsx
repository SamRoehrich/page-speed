import { renderToReadableStream } from "react-dom/server";
import { ServerRouter } from "@@/react/server-router";
import { initAnalyticsDb, recordPageView } from "@@/sql-lite/analytics";
import { getTitleByPathname } from "@@/utils/get-title-by-pathname";
import { getPost, initPostsDb, insertPost } from "@@/sql-lite/blog";
import { handleSignup } from "@@/app/sign-up/action";

initAnalyticsDb();
initPostsDb();
const server = Bun.serve({
  port: 8080,
  async fetch(req) {
    recordPageView(req);
    const pathname = new URL(req.url).pathname;

    if (pathname.includes("public/favicon")) {
      const favicon = Bun.file("./public/favicon.ico");
      return new Response(favicon, {
        headers: {
          "Content-Type": "image/x-icon",
        },
      });
    }

    if (pathname === "/sign-up" && req.method === "POST") {
      const data = await handleSignup(req);

      if (!data) {
        return new Response("Invaild inputs", { status: 500 });
      }
      return new Response("Redirect to /home", {
        status: 301,
        headers: {
          location: "/home",
        },
      });
    }

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
          if (process.env.NODE_ENV !== "production") {
            const formData = await req.formData();
            const post = insertPost(formData);

            return new Response(JSON.stringify(post), { status: 200 });
          } else {
            return new Response("Can't add a post in Production. Nice try.", {
              status: 500,
            });
          }

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
          <link rel="icon" type="image/x-icon" href="public/favicon.ico" />
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
