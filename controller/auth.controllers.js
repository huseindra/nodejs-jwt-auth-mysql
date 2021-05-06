const db = require("../models")
const config = require("../config/auth.config")

const User = db.user
const Role = db.role

const Op = db.sequelize.Op

let jwt = require("jsonwebtoken")
let bcrypt = require("bcryptjs")

exports.signup = (req, res) => {
    // save user to database
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.bcrypt.hashSync(req.body.password, 8)
    }).then(user => {
        if(req.body.roles){
            Role.findAll({
                where: {
                    name: {
                        [Op.Or]: req.body.roles,
                    }
                }
            }).then(roles => {
                user.setRoles(roles).then(() =>{
                    res.send({
                        message: "User was registered successfully"
                    })
                })
            })
        }
        else{
            // user role 1
            user.setRoles([1]).then(() =>{
                res.send({
                    message: "User was registered successfully"
                })
            })
        }
    })
    .catch(err => {
        res.status(500).send({
            message: err.message
        })
    })
}

exports.signin = (req, res)=>{
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(user => {
        if(!user){
            return res.status(404).send({
                message: "User not found"
            })
        }

        let passwordIsValid = bcrypt.compareSynch(
            req.body.password,
            user.password
        )
        if(!passwordIsValid){
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
            })
        }
        var token = jwt.sign({
            id: user.id
        },
        config.secret,
        {
            expiresIn:86400 //24hours
        })

        let authorities = []
        user.getRoles().then(roles => {
            for(let i= 0; i<roles.length; i++){
                authorities.push("ROLE_" + role[i].name.toUpperCase());
            }
            res.status(200).send({
                id: user.id,
                username: user.username,
                email: user.email,
                roles: authorities,
                accessToken: accessToken
            })
        })
    })
    .catch(err => {
        res.status(500).send({message: err.message})
    })
}