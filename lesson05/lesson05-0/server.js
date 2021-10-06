const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

require("dotenv").config();

const app = express();

const { connectMongo } = require("./src/db/connection");
const { postsRouter } = require("./src/routers/postsRouter");

const PORT = process.env.PORT || 8081;

app.use(morgan("tiny")); // for log
app.use(express.json());
app.use(cors());
app.use("/api/posts", postsRouter);

// app.use((_, res, __) => {
//   res.status(404).json({ status: "error", code: 404, message: "Use api on routes: /api/tasks", data: 'Not found' });
// });

app.use((err, _, res, __) => {
  console.log(err.stack);
  res.status(500).json({
    status: "fail",
    code: 500,
    message: err.message,
    data: "Internal Server Error",
  });
});

const start = async () => {
  try {
    await connectMongo();

    app.listen(PORT, (err) => {
      if (err) {
        console.error("Error at server launch:", err);
      }
      console.log(`Server works at port ${PORT}`);
    });
  } catch (err) {
    console.error(`Failed to launch application with error: ${err.message}`);
  }
};

start();
