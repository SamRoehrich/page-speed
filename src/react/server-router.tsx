import React from "react";
import { Blog } from "./blog";
import { Template } from "./template";

export async function ServerRouter({ location }: { location: string }) {
  if (location === "/") {
    return (
      <Template pathname={location}>
        <h1> Home </h1>
      </Template>
    );
  }
  if (location.includes("/blog")) {
    return (
      <Template pathname={location}>
        <Blog />
      </Template>
    );
  }
  return <Template pathname={location}>Not Found</Template>;
}
