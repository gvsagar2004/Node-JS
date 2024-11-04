const express = require("express");
const {
  handleGetAllUsers,
  handlePatchUserById,
  handleGetUserById,
  handleDeleteUserById,
  handlePostUser
} = require("../controllers/user");

const router = express.Router();

router.route("/")
  .get(handleGetAllUsers)
  .post(handlePostUser);

router.route("/:id")
  .get(handleGetUserById)
  .patch(handlePatchUserById)
  .delete(handleDeleteUserById);

module.exports = router;