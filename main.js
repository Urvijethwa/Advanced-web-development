//Deno.serve(() => new Response("<h1>Hello World</h1>"));

// Deno.serve(() =>
// new Response("<h1>Hello World</h1>", {
// headers: { "content-type": "text/html; charset=utf-8" }
// })
// );

import { serveDir } from "@std/http/file-server";
Deno.serve(req => serveDir(req, { fsRoot: "public" }));