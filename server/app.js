const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;
const router = require("./routers/index");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
