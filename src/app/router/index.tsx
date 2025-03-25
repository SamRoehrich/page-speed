import { Template } from "@@/react/template";
import Signup from "../sign-up";
import { getPost, insertPost } from "@@/sql-lite/blog";

export default async function ({ req }: { req: Request }): Promise<Response> {
  if (await isBackendRequest(req)) {
    return backendRouter(req);
  }
  if (await isFrontendRequest(req)) {
    return frontendRouter(req);
  }

  return new Response("Route not found", {
    status: 404,
  });
}

async function isBackendRequest(req: Request) {
  const pathname = new URL(req.url).pathname;
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

async function isFrontendRequest(req: Request) {
  const pathname = new URL(req.url).pathname;

  switch (pathname) {
    case "/sign-up":
      return true;
    default:
      return false;
  }
}

function frontendRouter(req: Request): Response {
  const pathname = new URL(req.url).pathname;
  switch (pathname) {
    case "signup":
      return (
        <Template>
          <Signup />
        </Template>
      );
  }
  return new Response("Not found", { status: 404 });
}

function backendRouter(req: Request): Response {
  return new Response("Not found", { status: 404 });
}
