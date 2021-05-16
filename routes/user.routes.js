const {authJwt} = require("../middleware")
const controller = require("../controller/user.controller")
const post = require("../controller/post.controller")
module.exports = (app) =>{
    app.use((req,res,next) =>{
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        )
        next()
    })
    app.get("/api/dev/all", controller.allAccess)

    app.get(
        "/api/dev/user",
        [authJwt.verifyToken],
        controller.userBoard
    )

    app.get(
        "/api/dev/mod",
        [authJwt.verifyToken, authJwt.isModerator],
        controller.moderatorBoard
    )
    
    app.get(
        "/api/dev/admin",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.adminBoard
    )
}