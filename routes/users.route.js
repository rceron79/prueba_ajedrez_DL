const express = require("express");
const expressFileUpload = require("express-fileupload");
const { getUsers, createUser, loginUser, updateUser, deleteUser } = require("../controllers/user.controller");
const { requireAuth } = require("../middlewares/requireAuth");
const { requireDatos } = require("../middlewares/requireDatos");
const router = express.Router();

router.use(
    expressFileUpload({
        abortOnLimit: true,
        //limits: { fileSize: 5 * 1024 * 1024 },
    })
);

router.get("/users", getUsers);
router.post("/users", requireDatos, createUser);
router.post("/login", loginUser);
router.put("/editar/:email", requireAuth, updateUser);
router.delete("/editar/:email", requireAuth, deleteUser);

module.exports = router;