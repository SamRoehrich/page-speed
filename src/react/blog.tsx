import.meta.hot.accept();
import React, { Suspense } from "react";
import { Home } from "./home";
import { Template } from "./template";

export async function BlogHome({}: {}) {
  return (
    <Template>
      <Home />
    </Template>
  );
}
