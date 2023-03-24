const express = require("express");
const {
  getAnnounce,
  getAnnounceById,
  createAnnounce,
  updateAnnounce,
  deleteAnnounce,
} = require("../controllers/AnnounceController");

const router = express.Router();

router.get("/", getAnnounce);
router.get("/:id", getAnnounceById);
router.post("/", createAnnounce);
router.put("/:id", updateAnnounce);
router.delete("/:id", deleteAnnounce);

module.exports = router;
