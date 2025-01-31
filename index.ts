import lighthouse from "lighthouse";
import * as chromeLauncher from "chrome-launcher";

import homepage from "./homepage.html";

const chrome = await chromeLauncher.launch({ chromeFlags: ["--headless"] });
const options = {
    logLevel: "info",
    output: "html",
    onlyCategories: ["performance"],
    port: chrome.port,
};

const server = Bun.serve({
    static: {
        "/": homepage,
    },
    async fetch(request, server) {
        if (request.url.endsWith("/test")) {
            const fd = await request.formData();
            const site = fd.get("site");
            if (!site) return new Response("must provide a site");
            console.time("runner");
            // @ts-ignore
            const runnerResult = await lighthouse(site.toString(), options);
            console.timeEnd("runner");

            if (
                !runnerResult?.report ||
                typeof runnerResult.report === "object"
            )
                return new Response("failed to run report");
            return new Response(runnerResult.report, {
                headers: {
                    "Content-Type": "text/html",
                },
            });
        }
        return new Response("404");
    },
});

console.log("running on ", server.url.port);
