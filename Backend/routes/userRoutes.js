const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.post("/users", userController.createUser);
router.get("/users", userController.getUsers);
router.get("/users/:id", userController.getUserById);
router.delete("/users/:id", userController.deleteUser);
router.post("/register", userController.register);
router.post("/login", userController.login);

module.exports = router;