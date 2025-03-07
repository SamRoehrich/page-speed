import homepage from "./src/html/homepage.html";
import pageSpeed from "./src/html/page-speed.html";
import blogPage from "./src/html/blog.html";
import toolsPage from "./src/html/tools.html";
import changeLogPage from "./src/html/change-log.html";

const server = Bun.serve({
  port: 8081,
  static: {
    "/checky": new Response("checky"),
    "/health": new Response("Healthy"),
    "/": homepage,
    "/blog": blogPage,
    "/page-speed": pageSpeed,
    "/tools": toolsPage,
    // "/chipolte": chipoltePage,
    // "/uses": usesPage,
    "/change-log": changeLogPage,
    // "/contact": contactPage,
  },
  development: process.env.NODE_ENV !== "production",
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
    return new Response("404 Not Found", { status: 404 });
  },
});

console.log("running on ", server.url.port);
