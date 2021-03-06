const model = require('../models/index')

class AuthCtrl {
  static login(req, res, next) {
    model.User.login(req.body.email, req.body.password).then((data)=>{
      res.status(200).send(data)
    }).catch((err)=>{
      res.status(500).send(err)
    })
  }
  static register(req, res, next) {
    model.User.register(req.body).then((data)=>{
      res.status(200).send(data)
    }).catch((err)=>{
      res.status(500).send(err)
    })
  }
  static isAdmin(req, res, next) {
    model.User.isAdmin(req.body.token).then((data)=>{
      res.status(200).send(data)
    }).catch((err)=>{
      res.status(500).send(err)
    })
  }
  static loginFB(req, res, next) {
    model.User.loginFB(req.body.accessToken, req.body.fb_id).then((data)=>{
      res.status(200).send(data)
    }).catch((err)=>{
      res.status(500).send(err)
    })
  }
}

module.exports = AuthCtrl;
