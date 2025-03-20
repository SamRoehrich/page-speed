import { Blog } from "./blog";
import { Template } from "./template";
import { Home } from "./home";

export async function ServerRouter({ location }: { location: string }) {
  if (location === "/") {
    return (
      <Template>
        <Home />
      </Template>
    );
  }
  if (location.includes("/blog")) {
    const post = location.split("/blog/")[1];
    return (
      <Template>
        <Blog title={post} />
      </Template>
    );
  }
  return <Template>Not Found</Template>;
}
