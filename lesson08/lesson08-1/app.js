const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const boolParser = require("express-query-boolean");
const helmet = require("helmet");

const catsRouter = require("./routes/cats/cats");
const usersRouter = require("./routes/users/users");

const { Limit } = require("./config/constants");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(helmet());
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json({ limit: Limit.JSON }));
app.use(boolParser());

app.use("/api/users", usersRouter);
app.use("/api/cats", catsRouter);

app.use((req, res) => {
  res.status(404).json({ status: "error", code: 404, message: "Not found" });
});

app.use((err, req, res, next) => {
  if (err.name === "ValidationError") {
    return res
      .status(400)
      .json({ status: "error", code: 400, message: err.message });
  }
  res.status(500).json({ status: "fail", code: 500, message: err.message });
});

module.exports = app;
