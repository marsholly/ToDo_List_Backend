'use strict'
const PORT = 8000;
const http = require('http')
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const TodoList = require('./models/todoList');
const app = express();
const server = http.createServer(app);

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/todos', (req, res) => {
  let { complete } = req.query
  if ( complete === 'true') {
    TodoList.getAllCompleteTodo((err, todos) => {
      if(err) return res.status(400).send(err);
      res.send(todos);
    });
  } else if (complete === 'false') {
    TodoList.getAllUncompleteTodo((err, todos) => {
      if(err) return res.status(400).send(err);
      res.send(todos);
    });
  } else {
    TodoList.getAllTodoLists((err, todos) => {
      if(err) return res.status(400).send(err);
      res.send(todos);
    });
  }
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

server.listen(PORT, err => {
  console.log(err || `Express listening on port ${PORT}`);
});
