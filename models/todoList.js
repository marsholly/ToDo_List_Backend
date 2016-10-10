const fs = require('fs');
const path = require('path');
const todoListPath = path.join(__dirname, '../data/todoList.json');
const uuid = require('uuid');

exports.getAllTodoLists = function(cb) {
  fs.readFile(todoListPath, (err, buffer) => {
    if (err) return cb(err);
    let data;
    try {
      data = JSON.parse(buffer);
    } catch(e) {
      data = [];
    }
    cb(null, data);
  });
}

exports.write = function(newData, cb) {
  let json = JSON.stringify(newData);
  fs.writeFile(todoListPath, json, cb);
}

exports.createNewTodo = function(newTodo, cb) {
  exports.getAllTodoLists((err, todos) => {
    if(err) return cb(err);
    newTodo.id = uuid();
    newTodo.isComplete = false;
    todos.push(newTodo);
    exports.write(todos, cb);
  });
}

exports.removeTodo = function(id, cb) {
  exports.getAllTodoLists((err, todos) => {
    if(err) return cb(err);
    let newTodoList = todos.filter(todo => todo.id !== id);
    exports.write(newTodoList, cb);
  })
}
