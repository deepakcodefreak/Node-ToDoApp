const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/ToDoApp',(err,client)=>{
  if (err) {
    return console.log(`Unable to connect to DataBase`,err);
  }
  console.log(`Connected to DataBase`);
  const db = client.db('ToDoApp');

    db.collection('Users').findOneAndUpdate({
      name:'abhishek'
    },{
      $set : {
        name:'gautam'
      },
      $inc : {
        age:+1
      }
    },{
      returnOriginal:false
    }).then((value) => {
      console.log(value);
    })

client.close();
})
