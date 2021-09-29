const express = require("express");
const morgan = require("morgan");
const app = express();

const PORT = 8081;

// app.get("/home", (req, res) => {
//   res.send("get request");
// });

// app.post("/home", (req, res) => {
//   res.send("post request");
// });

// app.delete("/home", (req, res) => {
//   res.send("delete request");
// });

// app.put("/home", (req, res) => {
//   res.send("put request");
// });

// app.use((req, res) => {
//   // res.send("middleware request");
//   // res.redirect("https://google.com");
//   // res.status(500).json({ javascript: "object" });
//   res.json({ javascript: "object" });
// });

// OR 2

// Example custom Middleware
// app.use((req, res, next) => {
//   console.log(`${req.method} ${req.originalUrl}, ${new Date().toISOString()}`);
//   next();
// });

// app.get("/home", (req, res) => {
//   res.json({ javascript: "object" });
// });

// OR 3

// Example Express and npm Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for html-forms
app.use(express.static("public")); // for public-directory files

// Example npm Middleware (morgan)
app.use(morgan("tiny")); // for log

// app.use((req, res, next) => {
//   console.log(`${req.method} ${req.originalUrl}, ${new Date().toISOString()}`);
//   next();
// });

app.post("/home", (req, res) => {
  if (!req.body.goit) {
    return res.status(400).json({ status: "goit parameter is required" });
  }
  res.json({ javascript: "object", body: req.body });
});

app.listen(PORT, (err) => {
  if (err) {
    console.error("Error at server launch:", err);
  }
  console.log(`Server works at port ${PORT}`);
});
