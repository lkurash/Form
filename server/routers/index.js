const Router = require("express");
const router = new Router();
const formRouter = require("./formRouter");

router.use("/", formRouter);
module.exports = router;
