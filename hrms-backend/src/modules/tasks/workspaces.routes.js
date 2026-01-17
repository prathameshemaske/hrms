const router = require("express").Router();
const auth = require("../../middlewares/auth.middleware");
const { getWorkspaces } = require("./workspaces.controller");

router.get("/", auth, getWorkspaces);

module.exports = router;
