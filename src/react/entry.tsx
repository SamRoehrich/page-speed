import { getTitleByPathname } from "@@/utils/get-title-by-pathname";
import { renderToReadableStream } from "../../dist";
import { ServerRouter } from "./server-router";

export async function entry(pathname: string) {
  return await renderToReadableStream(
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
        <title>{`Sam Roehrich ${getTitleByPathname(pathname)}`}</title>
      </head>
      <ServerRouter location={pathname} />
    </html>,
  );
}
