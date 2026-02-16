//Deno.serve(() => new Response("<h1>Hello World</h1>"));

// Deno.serve(() =>
// new Response("<h1>Hello World</h1>", {
// headers: { "content-type": "text/html; charset=utf-8" }
// })
// );

import { serveDir } from "@std/http/file-server";

// View functions - return HTML fragments for each page
function homeView() {
return `
<h2>Welcome</h2>
<p>This is the home page of my dynamic website.</p>
`;
}

function aboutView() {
return `
<h2>About Us</h2>
<p>This page tells you more about the website and its purpose.</p>
`;
}

function contactView() {
return `
<h2>Contact</h2>
<p>Get in touch with us using this page.</p>
`;
}

//new view function
function notFoundView() {
return `
<h2>Page Not Found</h2>
<p>Sorry, the page you're looking for doesn't exist.</p>
<p><a href="/">Return to home</a></p>
`;
}

//services 
function servicesView() {
    return `
    <h2>Services</h2>
    <p>+44 7987909798 </p>
    <p><a href="/">Return to home</a></p>
    `;
}

Deno.serve(req => serveDir(req, { fsRoot: "public" }));

//Render function
function render(viewFunction) {
const content = viewFunction();
return new Response(
`<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>My Website</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
<header>
<h1>My Website</h1>
</header>
<nav>
<ul>
<li><a href="/">Home</a></li>
<li><a href="/about">About</a></li>
<li><a href="/contact">Contact</a></li>
<li><a> href="/services">Services</a></li>
</ul>
</nav>
<main>
${content}
</main>
<footer>
<p>&copy; 2026 My Website. All rights reserved.</p>
</footer>
</body>
</html>`,
{ headers: { "content-type": "text/html; charset=utf-8" } }
);
}

//Routing logic 
async function handler(req) {
const url = new URL(req.url);
const pathname = url.pathname;
// Try to serve static files first
if (pathname.endsWith(".css") || pathname.endsWith(".js") ||
pathname.endsWith(".svg")) {
return serveDir(req, { fsRoot: "public" });
}
// Route to dynamic views
if (pathname === "/") {
return render(homeView);
}
if (pathname === "/about") {
return render(aboutView);
}
if (pathname === "/contact") {
return render(contactView);
}
if (pathname === "/services") {
return render(servicesView);
}
// No route matched - not found
return render(notFoundView);
}
// Deno.serve(handler);