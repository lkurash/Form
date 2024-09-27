const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

const router = require("./routers/index");

app.use(express.json());
app.use(cors());

app.use("/api", router);

function startServer(port) {
  const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });

  server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.log(`Port ${port} is in use, trying port ${port + 1}...`);
      startServer(port + 1);
    } else {
      console.error(err);
      process.exit(1);
    }
  });
}

startServer(PORT);
