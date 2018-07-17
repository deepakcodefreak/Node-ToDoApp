const {MongoClient,ObjectID} = require('mongodb');
MongoClient.connect(`mongodb://localhost:27017`,(err,client)=> {
  if (err) {
    return console.log(`Unable to connect to DataBase`, err);
  }
  console.log(`Connected to DataBase`);
  const db = client.db('ToDoApp');

  // db.collection('Todos').find().count().then((docs)=>{
  //   console.log(`Todos:`);
  //   console.log(JSON.stringify(docs,undefined,2));
  // },(err)=>{
  //   console.log(`Unable to fetch ToDos...`,err);
  //
  // })
  // //
  // db.collection('Todos').find({_id:
  //   new ObjectID('5b4a2e066e35c81f098b53f2')
  // }).toArray().then((docs)=>{
  //   console.log(`Todos:`);
  //   console.log(JSON.stringify(docs,undefined,2));
  // },(err)=>{
  //   console.log(`Unable to fetch ToDos...`,err);
  //
  // })

db.collection('Users').find({name:'Deepak'}).toArray().then((docs)=>{
  console.log(`Required ToDos:`);
  console.log(JSON.stringify(docs,undefined,2));
},(err)=>{
  console.log(`Unable to fetch required ToDos...`);
  console.log(err);
})


client.close();
})
