const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/ToDoApp',(err,client)=>{
  if (err) {
    return console.log(`Unable to connect to DataBase`,err);
  }
  console.log(`Connected to DataBase`);
  const db = client.db('ToDoApp');


// deleteMany
  //
  // db.collection('Todos').deleteMany({text:'Eat dinner'}).then((result)=>{
  //   console.log(result);
  // })

  // deleteOne
// db.collection('Todos').deleteOne({completed:true}).then((result)=>{
//   console.log(result);
// })

// // findOneAndDelete
// db.collection('Todos').findOneAndDelete({completed:false}).then((result)=>{
//   console.log(result);
// })

//Users....
db.collection('Users').deleteMany({name:'Deepak' }).then((result)=>{
  console.log(result);
})






client.close();
})
