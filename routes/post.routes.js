const { Router } = require("express");
const { adminBoard } = require("../controller/user.controller");

module.exports = app =>{
    const post = require("../controller/post.controller")

    let router = require("express").Router()

    router.post("/create", post.create, adminBoard);

    router.get("/list", post.findAll);

    router.get("/list/published", post.findAllPublished);

    router.get("/search/:id", post.findOne);

    router.put("/update/:id", post.update);

    router.delete("/delete/:id", post.delete);

    router.delete("/delete/all", post.deleteAll);

    app.use("api/post", router)

    }