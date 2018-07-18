const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose.js');
const {ToDo} = require('./../server/models/todo.js');
const {User} = require('./../server/models/Users.js')
// var id = '5b4f9611b7cbd13bfece44789';
//
// if (!ObjectID.isValid(id)) {
//   return console.log(`Id not valid`);
// }

//
// ToDo.find({
//   _id:id
// }).then((res)=>{
//   console.log(`Todos ${res}`);
// })
//
// ToDo.findOne({
//   _id:id
// }).then((res) => {
//   console.log(`Todo ${res}`);
// })
//
// ToDo.findById(id).then((res) => {
//   if (!todo) {
//     return console.log(`Id not found`);
//   }
//   console.log(`Todo By Id ${res}`);
// }).catch((err)=>{console.log(err);})
var id = `5b4ece3219d13e0d172fe3cb`;
User.findById(id).then((res)=>{
if (!res) {
  return console.log(`User not found`);
}
    console.log(JSON.stringify(res,undefined,2));
},(e)=>{
  console.log(e);
})
