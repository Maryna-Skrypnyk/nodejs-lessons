const http = require("http");
const fs = require("fs/promises");
const path = require("path");
const PORT = process.env.PORT || 3000;

const TypeMime = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".png": "image/png",
  ".ico": "image/x-icon",
};

const requestHandler = async (request, response) => {
  //   response.writeHead(200, { "Content-type": "text/html" });
  //     response.end("<h1>GOIT</h1>"); // test

  //   if (request.url.indexOf("/home") >= 0) {
  //     response.writeHead(200, { "Content-type": "text/json" });
  //     return response.end('{"url": "homepage"}'); // test
  //   }
  //   response.writeHead(200, { "Content-type": "text/json" });
  //   return response.end('{"url": "other"}'); // test

  let filename = new URL(request.url, "http://localhost:3000/").pathname;
  switch (filename) {
    case "/":
      filename = "index.html";
      break;

    case "/contact":
      filename = "contact.html";
      break;

    case "/blog":
      filename = "blog.html";
      break;

    default:
      break;
  }

  try {
    const content = await fs.readFile(path.join(__dirname, filename));
    const contentType = TypeMime[path.extname(filename)];
    response.writeHead(200, { "Content-Type": contentType });
    //   return response.end(content);
    response.write(content);
    response.end();
  } catch (error) {
    response.writeHead(404, { "Content-Type": "text/html" });
    const content = await fs.readFile(path.join(__dirname, "404.html"));
    response.write(content);
    response.end();
  }
};

const server = http.createServer(requestHandler);

server.listen(PORT, (error) => {
  if (error) {
    console.error("Error at server launch:", error);
  }
  console.log(`Server works at port ${PORT}`);
});

// Стиснутий спосіб запису коду

// http
//   .createServer(async (req, res) => {
//     let filename = new URL(req.url, "http://localhost:3000/").pathname;
//     switch (filename) {
//       case "/":
//         filename = "index.html";
//         break;

//       case "/contact":
//         filename = "contact.html";
//         break;

//       case "/blog":
//         filename = "blog.html";
//         break;

//       default:
//         break;
//     }

//     try {
//       const content = await fs.readFile(path.join(__dirname, filename));
//       const contentType = TypeMime[path.extname(filename)];
//       res.writeHead(200, { "Content-Type": contentType });
//       res.write(content);
//       res.end();
//     } catch (err) {
//       res.writeHead(404, { "Content-Type": "text/html" });
//       const content = await fs.readFile(path.join(__dirname, "404.html"));
//       res.write(content);
//       res.end();
//     }
//   })
//   .listen(PORT, (err) => {
//     if (err) {
//       console.error("Error at server launch:", error);
//     }
//     console.log(`Server started at port ${PORT}`);
//   });
