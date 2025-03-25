import { Blog } from "./blog";
import { Template } from "./template";
import { Home } from "./home";
import Signup from "../app/sign-up";

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
  if (location.includes("/sign-up")) {
    return (
      <Template>
        <Signup />
      </Template>
    );
  }
  return <Template>Not Found</Template>;
}
