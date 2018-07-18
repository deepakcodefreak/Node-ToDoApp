var express = require('express')
var bodyParser = require('body-parser')

var {mongoose} = require('./db/mongoose.js')
var {ToDo} = require('./models/todo.js')
var {Users} = require('./models/Users.js')

// var app = express();
//
// app.use(bodyParser.json());
//
// app.post('/todos',(req,res)=>{
//   var newtodo = ToDo({
//     text:req.body.text
//   })
//   newtodo.save().then((doc)=>{
//     res.send(doc)
//   },(e)=>{
//     res.status(400).send(e);
//   })
// })

var app = express();

app.use(bodyParser.json());

app.post('/todos',(req,res)=>{
  var newtodo = new ToDo({
    text:req.body.text
  })
  newtodo.save().then((docs)=>{
    res.send(docs)
  },(e)=>{
    res.status(400).send(e)
  })
})

app.get('/todos',(req,res)=>{
  ToDo.find().then((todos)=>{
    res.send({
      todos,
    })
  },(e)=>{
    res.status(400).send(e)
  })
})

app.listen(3000,()=>{
  console.log(`started on port 3000`);
})

module.exports = {app}
