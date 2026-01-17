const router = require("express").Router();
const auth = require("../../middlewares/auth.middleware");

const {
    createTask,
    getTaskBoard,
    updateTaskStatus
} = require("./tasks.controller");

/* ================= TASK BOARD ================= */
router.get("/board", auth, getTaskBoard);

/* ================= CREATE TASK ================= */
router.post("/", auth, createTask);

/* ================= UPDATE STATUS ================= */
router.put("/:taskId/status", auth, updateTaskStatus);

module.exports = router;
