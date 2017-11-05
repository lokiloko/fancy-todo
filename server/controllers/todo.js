const model = require('../models/index')

class TodoCtrl {
  static read(req, res, next) {
    model.Todo.read(req.params.user_id).then((data)=>{
      res.status(200).send(data)
    }).catch((err)=>{
      res.status(500).send(err)
    })
  }
  static readOne(req, res, next){
    model.Todo.readOne(req.params.id).then((data)=>{
      res.status(200).send(data)
    }).catch((err)=>{
      res.status(500).send(err)
    })
  }
  static create(req, res, next){
    req.body.posted_by = req.headers.token
    model.Todo.create(req.body).then((data)=>{
      res.status(200).send(data)
    }).catch((err)=>{
      res.status(500).send(err)
    })
  }
  static update(req, res, next){
    req.body._id = req.params.id
    req.body.posted_by = req.headers.token
    model.Todo.update(req.body).then((data)=>{
      res.status(200).send(data)
    }).catch((err)=>{
      console.log(err)
      res.status(500).send(err)
    })
  }
  static starred(req, res, next){
    model.Todo.starred(req.params.id, req.headers.token).then((data)=>{
      res.status(200).send(data)
    }).catch((err)=>{
      console.log(err)
      res.status(500).send(err)
    })
  }
  static delete(req, res, next){
    model.Todo.delete(req.params.id, req.headers.token).then((data)=>{
      res.status(200).send(data)
    }).catch((err)=>{
      console.log(err)
      res.status(500).send(err)
    })
  }
}

module.exports = TodoCtrl;
