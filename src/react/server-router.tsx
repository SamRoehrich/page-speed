import React from "react";
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
    return (
      <Template>
        <Blog />
      </Template>
    );
  }
  return <Template>Not Found</Template>;
}
