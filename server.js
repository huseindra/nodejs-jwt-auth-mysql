const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")

const app = express();

// database
const db = require("./models");
const { sequelize } = require("./models");
const Role = db.role

// // if you want to force to sync and drop db 
// db.sequelize.sync({force:true}).then(() => {
//     console.log("Drop & Resynch DB");
//     initial()
// })
db.sequelize.sync();
var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

//parse requests of content-type - application/json
app.use(bodyParser.json());

//parse request of content-type application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

//simple-route
app.get("/", (req, res) =>{
    res.json({message: "Welcome to the application."})
})

//routes
require("./routes/auth.routes")(app)
require("./routes/user.routes")(app)

//set port, listen for requests
const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}.`)
})

// initial db role 
function initial(){
    Role.create({
        id: 1,
        name: "user"
    })
    Role.create({
        id: 2,
        name: "moderator"
    })
    Role.create({
        id: 3,
        name: "admin"
    })
}