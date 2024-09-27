const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;
const router = require("./routers/index");

app.use(express.json());
app.use(cors());

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
