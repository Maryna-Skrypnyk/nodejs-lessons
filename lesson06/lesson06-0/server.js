const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

require("dotenv").config();

const app = express();

const { connectMongo } = require("./src/db/connection");

const { postsRouter } = require("./src/routers/postsRouter");
const { errorHandler } = require("./src/helpers/apiHelpers");

const PORT = process.env.PORT || 8081;

app.use(express.json());
app.use(morgan("tiny")); // for log
app.use(cors());

app.use("/api/posts", postsRouter);

// app.use((_, res, __) => {
//   res.status(404).json({ status: "error", code: 404, message: "Use api on routes: /api/tasks", data: 'Not found' });
// });

app.use(errorHandler);

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
