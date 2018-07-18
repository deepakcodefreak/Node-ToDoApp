const expect = require('expect')
const request = require('supertest')

const {app} = require('./../server.js');
const {ToDo} = require('./../models/todo.js')

beforeEach((done)=>{
  ToDo.remove({}).then(()=>done())
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
      ToDo.find().then((todos)=>{
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
      expect(todos.length).toBe(0)
      done();
    }).catch((err)=>done(err))
  })
});

})
