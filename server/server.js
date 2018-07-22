const {ObjectID} = require('mongodb')
const express = require('express')
const bodyParser = require('body-parser')
const _ = require('lodash')

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


app.patch('/todos/:id',(req,res)=>{
  // console.log('hello guys');
  // res.send('hello guys');
  var id = req.params.id;
  // res.send(id);

  var body = _.pick(req.body,['text','completed']);


  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

   if (_.isBoolean(body.completed) && body.completed) {
     body.completedAt = new Date().getTime(); //return js time stamp

   }else {
     body.completed = false;
     body.completedAt = null;
   }

   ToDo.findByIdAndUpdate(id,{$set:body},{new:true}).then((todo) => {
     if (!todo) {
       return res.status(404).send();
     }
     res.send({todo});
   }).catch((err) => {
     res.status(400).send()
   })





})





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


app.delete('/todos/:id',(req,res)=>{
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

ToDo.findByIdAndRemove(id).then((todo) => {
  if (!todo) {
    return res.status(404).send()
  }
  res.send({todo})
},(err)=>{
  res.send(err)
}).catch((err)=>{
  res.status(400).send()
})

})



//
// app.patch('/todos/:id', function (req, res) {
//     var updateObject = req.body; // {last_name : "smith", age: 44}
//     var id = req.params.id;
//     var ID = new ObjectID(id);
//     ToDo.update({_id  : ID }, {$set: updateObject});
// });





app.listen(port,()=>{
  console.log(`started on port ${port}`);
})

module.exports = {app}
