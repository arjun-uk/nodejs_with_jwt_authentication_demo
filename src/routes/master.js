const router = require("express").Router();
const authMiddleware = require("../middleware/auth_middleware");

router.get("/", authMiddleware, (req, res) => {
  HELPERS.successResponse(res, null, "Master data accessed successfully", 0);
});

module.exports = router;
