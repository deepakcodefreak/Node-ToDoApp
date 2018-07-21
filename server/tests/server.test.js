const expect = require('expect')
const request = require('supertest')
const {ObjectID} = require('mongodb')

const {app} = require('./../server.js');
const {ToDo} = require('./../models/todo.js')

var todos = [{
  _id: new ObjectID(),
  text:'task no. 1'
},{
  _id: new ObjectID(),
  text:`task no. 2`
}];

beforeEach((done)=>{
  ToDo.remove({}).then(()=>{
    return ToDo.insertMany(todos);
  }).then(()=> done());
})



describe('POST /todos',()=>{
  it('Should create a new todo', (done) => {
    var text = 'I am testing todo text';
    request(app)
    .post('/todos')
    .send({text})   //json data {text} is automatically converted to string
    .expect(200)
    .expect((res)=>{
      expect(res.body.text).toBe(text);
    })
    .end((err,res)=>{
      if (err) {
        return done(err);
      }
      ToDo.find({text}).then((todos)=>{
        expect(todos.length).toBe(1);
        expect(todos[0].text).toBe(text);
        done();
      }).catch((err)=>done(err));
    })

  });

it('Should not add a note', (done) => {
  request(app)
  .post('/todos')
  .send()
  .expect(400)
  .end((err,res)=>{
    if (err) {
      return done(err);
    }
    ToDo.find().then((todos)=>{
      expect(todos.length).toBe(2)
      done();
    }).catch((err)=>done(err))
  })
});


})

describe('GET /todos',()=>{

  it('Should return notes', (done) => {
    request(app)
    .get('/todos')
    .expect(200)
    .expect((todo)=>{
      expect(todo.body.todos.length).toBe(2)
    })
    .end(done);

  });

})

describe('GET /todos/:id',()=>{
  it('Should return todo doc', (done) => {

    request(app)
    .get(`/todos/${todos[0]._id.toHexString()}`)
    .expect(200)
    .expect((res)=>{
      expect(res.body.todo.text).toBe(todos[0].text)
    })
    .end(done);
  });

it('Should return 404 status code if todo not found', (done) => {

  var id = new ObjectID();

  request(app)
  .get(`/todos/${id.toHexString()}`)
  .expect(404)
  .end(done)
});

it('Should return 404 for invalid object ID', (done) => {

    request(app)
    .get(`/todos/123abc`)
    .expect(404)
    .end(done)

});

})


describe('DELETE /todos:id',()=>{

  it('Should delete the todo', (done) => {

    var hexId = todos[1]._id.toHexString();

    request(app)
    .delete(`/todos/${hexId}`)
    .expect(200)
    .expect((res)=>{
      expect(res.body.todo._id).toBe(hexId)
    })
    .end((err,res) => {
      if (err) {
        return done(err)
      }

      ToDo.findById(hexId).then((todo) => {
        expect(todo).toNotExist();
        done();
      }).catch((err) => {done(err)})


    })
  });

  it('Should return 404 if todo not found', (done) => {
    var hexId = new ObjectID().toHexString();
    request(app)
    .delete(`/todos/${hexId}`)
    .expect(404)
    .end(done);
  });

  it('Should return 404 if ObjectID is invalid', (done) => {
    var hexId = `1234abc`;
    request(app)
    .delete(`/todos/${hexId}`)
    .expect(404)
    .end(done);
  });


})
