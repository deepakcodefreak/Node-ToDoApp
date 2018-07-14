// const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');
const obj = new ObjectID;
console.log(obj);
// 
// const user =  {name:'Depak',age:18}
// var {name} = user;
// console.log(name);



MongoClient.connect('mongodb://localhost:27017/ToDoApp',(error,client) => {
  if (error) {
    return console.log(`We are unable to connect MonGoDB Server`);
  }
  console.log(`Connected to MongoDB Server`);

  const db = client.db('ToDoApp')
//
//   db.collection(`Todos`).insertOne({
//     text:'Something to do',
//     completed:false
//   },(error,result)=>{
//     if (error) {
//       return console.log(`unable to insert todo`, error);
//     }
//     console.log(JSON.stringify(result.ops,undefined,2));
//   })
//   client.close();
// });


db.collection('Users').insertOne({
  name:'Deepak',
  age:18,
  loaction:'Panchkula'

},(err,result)=>{
  if (err) {
  return console.log(`Unable to insert data` , err);
  }
  console.log(JSON.stringify(result.ops[0]._id.getTimestamp(),undefined,2));
})
client.close();
});
