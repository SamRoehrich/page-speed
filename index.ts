import homepage from "@@/html/homepage.html";
import pageSpeed from "@@/html/page-speed.html";
import blogPage from "@@/html/blog.html";
import toolsPage from "@@/html/tools.html";

const server = Bun.serve({
  port: 80,
  routes: {
    "/health": new Response("Healthy"),
    "/": homepage,
    "/blog": blogPage,
    "/page-speed": pageSpeed,
    "/tools": toolsPage,
  },
  async fetch(req, server) {
    return new Response("hi from bun");
  },
});

console.log("running on ", server.url.port);
