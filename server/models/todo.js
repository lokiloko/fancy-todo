var idvalidator = require('mongoose-id-validator');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var Schema = mongoose.Schema
var connectionUrl = 'mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASSWORD + '@ds229435.mlab.com:29435/todo-fancy'
mongoose.connect(connectionUrl);
mongoose.Promise = global.Promise;
var todoSchema = new Schema({
  todo: {
    type: String,
    required: true
  },
  posted_by: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  created_at: {
    type: Date,
    required: true
  },
  due_date: {
    type: Date,
    required: true
  },
  finished_at: {
    type: Date,
  },
  star: {
    type: String,
  },
  category: {
    type: String,
  }
});

todoSchema.plugin(idvalidator)

var Todo = mongoose.model('Todo', todoSchema);
class Model {
  static read(id) {
    jwt.verify(id, process.env.JWT_KEY, function(err, decoded) {
      id = decoded._id
    });
    return new Promise((resolve, reject) => {
      Todo.find({
        "posted_by": id
      }).populate('posted_by').then((data) => {
        var obj = {
          message: 'Data Found',
          data: data
        }
        resolve(obj)
      }).catch((err) => {
        reject(err)
      })
    })
  }
  static readOne(id) {
    return new Promise((resolve, reject) => {
      Todo.findOne({
        "_id": id
      }).then((data) => {
        var obj = {
          message: 'Data Found',
          data: data
        }
        resolve(obj)
      }).catch((err) => {
        reject(err)
      })
    })
  }
  static create(insert, file) {
    jwt.verify(insert.posted_by, process.env.JWT_KEY, function(err, decoded) {
      insert.posted_by = decoded._id
    });
    return new Promise((resolve, reject) => {
      Todo.create({
        todo: insert.todo,
        posted_by: insert.posted_by,
        created_at: Date.now(),
        due_date: insert.due_date,
        star: insert.starred,
        category: insert.category
      }).then((data) => {
        var obj = {
          message: 'Insert Success',
          data: data
        }
        resolve(obj)
      }).catch((err) => {
        reject(err)
      })
    })
  }
  static update(update) {
    return new Promise((resolve, reject) => {
      jwt.verify(update.posted_by, process.env.JWT_KEY, function(err, decoded) {
        update.posted_by = decoded._id
      });
      Todo.findOne({
        "_id": update._id
      }).then((data) => {
        if (data.posted_by.toString() == update.posted_by) {
          Todo.findOneAndUpdate({
            "_id": update._id
          }, {
            todo: update.todo,
            category: update.category,
            due_date: update.due_date,
            star: update.starred
          }, {new:true}).then((updated) => {
            var obj = {
              message: 'Update Success',
              data: update
            }
            resolve(obj)
          })
        }
        else {
          reject({
            message: 'You are not allowed to update this'
          })
        }
      }).catch((err) => {
        reject(err)
      })
    })
  }
  static starred(id, token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, process.env.JWT_KEY, function(err, decoded) {
        token = decoded._id
      });
      Todo.findOne({
        "_id":id
      }).then((todo)=>{
        if(todo.posted_by == token){
          var star = ''
          var message = 'Unstar'
          if(todo.star == ''){
            star = 'starred'
            message = 'Starred'
          }
          Todo.findOneAndUpdate({
            "_id": id
          }, {star:star}, {new:true}).then((data) => {
            var obj = {
              message: message,
              data: data
            }
            resolve(obj)
          }).catch((err) => {
            reject(err)
          })
        }
        else {
          reject({
            message: 'You are not allowed to star this'
          })
        }
      }).catch((err)=>{
        reject(err);
      })
    })
  }
  static finished(id, token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, process.env.JWT_KEY, function(err, decoded) {
        token = decoded._id
      });
      Todo.findOne({
        "_id":id
      }).then((todo)=>{
        if(todo.posted_by == token){
          var finished = Date.now()
          var message = 'Finished'
          console.log(todo.finished_at)
          if(todo.finished_at != null){
            finished = null
            message = 'Unfinish'
          }
          Todo.findOneAndUpdate({
            "_id": id
          }, {finished_at:finished}, {new:true}).then((data) => {
            var obj = {
              message: message,
              data: data
            }
            resolve(obj)
          }).catch((err) => {
            reject(err)
          })
        }
        else {
          reject({
            message: 'You are not allowed to star this'
          })
        }
      }).catch((err)=>{
        reject(err);
      })
    })
  }
  static delete(id, token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, process.env.JWT_KEY, function(err, decoded) {
        token = decoded._id
      });
      Todo.findOne({
        "_id":id
      }).then((todo)=>{
        if(todo.posted_by == token){
          Todo.findOneAndRemove({
            "_id": id
          }).then((data) => {
            var obj = {
              message: 'Delete Success',
              data: data
            }
            resolve(obj)
          }).catch((err) => {
            reject(err)
          })
        }
        else {
          reject({
            message: 'You are not allowed to delete this'
          })
        }
      }).catch((err)=>{
        reject(err);
      })
    })
  }
}

module.exports = Model;
