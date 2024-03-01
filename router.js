const express = require("express");
const {getuser,
    insertuser,
    updateuser,
    deleteuser} = require("./middleware");

const router = express.Router();

router.get("/getuser/:id",getuser);

router.post("/adduser",insertuser);

router.put("/updateuser",updateuser);

router.delete("/deleteuser/:id",deleteuser);

module.exports = router;