var {ObjectID} = require('mongodb')
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
const port = process.env.PORT || 3000;

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

app.get('/todos/:id',(req,res)=>{
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send()
  }

  ToDo.findById(id).then((todo)=>{
    if(!todo){
        return res.status(404).send()
    }
    res.send({todo})

  },(err)=>{
    res.send(err)
}).catch((err) => {
  res.status(400).send()
})
})


app.listen(port,()=>{
  console.log(`started on port ${port}`);
})

module.exports = {app}
