'use strict'
const PORT = 8000;
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const TodoList = require('./models/todoList');
const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get('/todos', (req, res) => {
  TodoList.getAllTodoLists((err, todos) => {
    if(err) return res.status(400).send(err);
    res.send(todos);
  });
});

app.post('/todos', (req, res) => {
  TodoList.createNewTodo(req.body, err => {
    if(err) return res.status(400).send(err);
    res.send('success')
  });
});

app.delete('/todos/complete', (req, res) => {
  TodoList.removeCompleteTodo((err, todos) => {
    if(err) return res.status(400).send(err);
    res.send("done");
  });
});

app.delete('/todos/:id', (req, res) => {
  let id = req.params.id;
  TodoList.removeTodo(id, err => {
    if(err) return res.status(400).send(err);
    res.send("done");
  });
});

app.put('/todos/:id', (req, res) => {
  let id = req. params.id;
  TodoList.updateTodo(id, req.body, (err, todo) => {
    if(err) return res.status(400).send(err);
    res.send(todo);
  });
});



//
// //  get a category question  /question/category
// app.get('/question/:category',(req, res) => {
//   FlashCard.getAllQuestions((err, questions) => {
//     if(err) {
//       return res.status(400).send(err);
//     }
//     let category = req.params.category;
//     let newQuestionArr = questions.filter(question => {
//       return question.category === category;
//     })
//     let total = newQuestionArr.length;
//     let index = Math.floor(Math.random() * total);
//     let questionObj = newQuestionArr[index];
//     id = questionObj.id;
//     let question = `[ ${questionObj.category} ] Q: ${questionObj.question}`;
//     res.send(question);
//   })
// });
//
// //  get answer  /answer
// app.get('/answer',(req, res) => {
//   FlashCard.getOneQuestion(id, (err, question) => {
//     if(err) {
//       return res.status(400).send(err);
//     }
//     let answer =`The answer is: ${question.answer}`;
//     res.send(answer);
//   })
// });
//


app.listen(PORT, err => {
  console.log(err || `Express listening on port ${PORT}`);
});
