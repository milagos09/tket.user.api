const express = require("express");
const router = express.Router();
const UserControllers = require("./../controllers/UserControllers");

router.get("/", (req, res) => {
    UserControllers.getUsers().then((result) => res.send(result));
});

router.get("/:id", (req, res) => {
    UserControllers.getUserById(req.params.id).then((result) => res.send(result));
});

router.post("/register", (req, res) => {
    UserControllers.register(req.body).then((result) => res.send(result));
});

router.delete("/delete/:id", (req, res) => {
    UserControllers.delete(req.params.id).then((result) => res.send(result));
});

router.patch("/update/:id", (req, res) => {
    UserControllers.update(req.params.id, req.body).then((result) => res.send(result));
});

router.post("/login", (req, res) => {
    UserControllers.login(req.body).then((result) => res.send(result));
});

module.exports = router;
