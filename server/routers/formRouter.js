const Router = require("express");
const financialController = require("../controllers/financial");
const router = new Router();

router.post("/submit-financial-info", financialController.submitFinancialInfo);
router.get("/financial-info", financialController.getFinancialInfo);

module.exports = router;
