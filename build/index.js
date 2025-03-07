// src/html/homepage.html
var homepage_default = "./homepage-3979kkej.html";

// src/html/page-speed.html
var page_speed_default = "./page-speed-9xstm3q2.html";

// src/html/blog.html
var blog_default = "./blog-n00by2ph.html";

// src/html/tools.html
var tools_default = "./tools-5j89jjt7.html";

// index.ts
var server = Bun.serve({
  port: 8080,
  routes: {
    "/checky": new Response("checky"),
    "/health": new Response("Healthy"),
    "/": homepage_default,
    "/blog": blog_default,
    "/page-speed": page_speed_default,
    "/tools": tools_default
  },
  development: false,
  async fetch(req, server2) {
    return new Response("404 Not Found", { status: 404 });
  }
});
console.log("running on ", server.url.port);
