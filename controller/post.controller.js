const db = require("../models");
const Posts = db.post;
const Op = db.Sequelize.Op;

//create and save a  new post
exports.create = (req, res)=>{
    if(!req.body.title){
        res.status(400).send({
            message: "Content can not be empty"
        })
    }

    //create a post
    const post = {
        title: req.body.title,
        slug: req.body.slug,
        description: req.body.description,
        published: req.body.published ? req.body.published :false
    }

    Posts.create(post)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some errors while creating Post"
            })
        })
}

//retrieve all posts from the database by title
exports.findAll = (req, res) =>{
    const title = req.body.title
    var condition = title ? {title: {[Op.like]: `%${title}%`}}: null

    Posts.findAll({where: condition})
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some errors occured while trying retrieved posts"
            })
        })
}
// find a single post with an id 
exports.findOne = (req, res) =>{
    const id = req.body.id
    Posts.findByPk(id)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Errors retrieving post with id= " +id
            })
        })
}

// Update a post by the id in the request
exports.update = (req, res) =>{
    const id = req.params.id
    Posts.update(req.body, {where: {id: id}})
        .then(num => {
            if(num == 1){
                res.send({
                    message: "Post was updated successfully"
                })
            }
            else{
                res.send({
                    message: `Cannot be updated post with id ${id}. Maybe post was not found or req.body is empty`
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message:
                err.message || "Error updating Post with id=" + id
            })
        })
}

// delete a single post with specific id
exports.delete = (req, res) =>{
    const id = req.params.id
    Posts.destroy(req.body, {where: {id: id}})
        .then(num => {
            if(num == 1){
                res.send({
                    message: "Post was deleted successfully"
                })
            }
            else{
                res.send({
                    message: `Cannot be deleted post with id ${id}. Maybe post was not found or req.body is empty`
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message:
                err.message || "Error deleted Post with id=" + id
            })
        })
}

// delete all post 
exports.deleteAll = (req, res) => {
    Posts.destroy({
        where: {},
        truncate: false
    })
    .then(num =>{
        res.send({message: `${num} Post successfully deleted` })
    })
    .catch(err => {
            err.message || "Some error occurred while removing all posts."
    })
}

// find all pubslihed post 
exports.findAllPublished = (req, res) =>{
    Posts.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving posts."
      });
    });
}