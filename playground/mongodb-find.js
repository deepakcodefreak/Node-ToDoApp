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

  // db.collection('Todos').find({
  //   _id:new ObjectID('5b4a49ac26dc064b527e1c1a')
  // }).toArray().then((docs)=>{
  //   console.log(`Todos  :`);
  //   console.log(JSON.stringify(docs,undefined,2));
  // },(err) => {
  //   console.log(`Unable to fetch todos`);
  // });
  //
  db.collection('Users').find().count().then((count)=>{
    console.log(`Todos  :${count}`);
    // console.log(JSON.stringify(count,undefined,2));
  },(err) => {
    console.log(`Unable to fetch todos`);
  });


db.collection('Users').find({name:'Deepak'}).toArray().then((docs) => {
  console.log(`Users with name Deepak`);
  console.log(JSON.stringify(docs,undefined,2));
},(error)=>{
  console.log(`Unable to fetch data`, error);
})

client.close();
});
