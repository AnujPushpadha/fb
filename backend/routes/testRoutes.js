const express = require("express");

const {
  addData,
  getData,
  deleteData,
  editData,
} = require("../controller/testController");

const router = express.Router();

router.route("/").post(addData).get(getData);
router.route("/:_id").delete(deleteData).put(editData);

module.exports = router;
