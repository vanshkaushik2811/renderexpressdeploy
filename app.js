const express = require("express");
const bodyParser = require("body-parser");

var app = express();
app.set("view engine","ejs");
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());


var todos = [];

app.get("/",function(req,res){
    res.render("list",{todos: todos});
});


app.post("/add",function(req, res){
    var todoText = req.body.todoText;
    var priority = req.body.priority || "medium";
    
    if (todoText && todoText.trim() !== "") {
        var newTodo = {
            id: Date.now(),
            text: todoText.trim(),
            priority: priority,
            completed: false,
            createdAt: new Date()
        };
        todos.push(newTodo);
    }
    res.redirect("/");
});


app.post("/delete/:id", function(req, res) {
    var todoId = parseInt(req.params.id);
    todos = todos.filter(todo => todo.id !== todoId);
    res.redirect("/");
});


app.post("/edit/:id", function(req, res) {
    var todoId = parseInt(req.params.id);
    var newText = req.body.newText;
    var newPriority = req.body.newPriority;
    
    if (newText && newText.trim() !== "") {
        var todoIndex = todos.findIndex(todo => todo.id === todoId);
        if (todoIndex !== -1) {
            todos[todoIndex].text = newText.trim();
            todos[todoIndex].priority = newPriority;
        }
    }
    res.redirect("/");
});

app.post("/toggle/:id", function(req, res) {
    var todoId = parseInt(req.params.id);
    var todoIndex = todos.findIndex(todo => todo.id === todoId);
    if (todoIndex !== -1) {
        todos[todoIndex].completed = !todos[todoIndex].completed;
    }
    res.redirect("/");
});

app.listen(4000,function(){
    console.log("Server Started");
});

