import homepage from "@@/html/homepage.html";
import pageSpeed from "@@/html/page-speed.html";
import blogPage from "@@/html/blog.html";
import toolsPage from "@@/html/tools.html";

const server = Bun.serve({
  static: {
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
