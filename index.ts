import homepage from "./src/html/homepage.html";
import pageSpeed from "./src/html/page-speed.html";
import blogPage from "./src/html/blog.html";
import toolsPage from "./src/html/tools.html";

const server = Bun.serve({
  port: 8080,
  routes: {
    "/checky": new Response("checky"),
  },
  static: {
    "/health": new Response("Healthy"),
    "/": homepage,
    "/blog": blogPage,
    "/page-speed": pageSpeed,
    "/tools": toolsPage,
  },
  async fetch(req, server) {
    return new Response("hi ");
  },
});

console.log("running on ", server.url.port);
