const router = require("express").Router();
const auth = require("../../middlewares/auth.middleware");
const role = require("../../middlewares/role.middleware");

const controller = require("./testExecution.controller");

/* ================= STATIC ROUTES FIRST ================= */

router.get(
  "/summary",
  auth,
  role(["ADMIN", "QA"]),
  controller.getExecutionSummary
);

/* ================= DYNAMIC ROUTES ================= */

router.post(
  "/",
  auth,
  role(["ADMIN", "QA"]),
  controller.executeTest
);

router.get(
  "/:testCaseId",
  auth,
  role(["ADMIN", "QA"]),
  controller.getExecutionHistory
);

module.exports = router;
