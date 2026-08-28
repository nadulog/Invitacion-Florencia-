const http = require("http");
const fs = require("fs");
const path = require("path");

const root = __dirname;
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".png": "image/png",
  ".mp3": "audio/mpeg",
};

http
  .createServer((request, response) => {
    const relativePath = decodeURIComponent(request.url.split("?")[0]) || "/";
    const requested = relativePath === "/" ? "index.html" : relativePath.slice(1);
    const filePath = path.resolve(root, requested);

    if (!filePath.startsWith(root + path.sep)) {
      response.writeHead(403).end("Forbidden");
      return;
    }

    fs.readFile(filePath, (error, data) => {
      if (error) {
        response.writeHead(404).end("Not found");
        return;
      }

      response.writeHead(200, {
        "Content-Type": types[path.extname(filePath)] || "application/octet-stream",
        "Cache-Control": "no-store",
      });
      response.end(data);
    });
  })
  .listen(5191, "0.0.0.0", () => {
    console.log("Invitación disponible en http://192.168.1.5:5191");
  });
