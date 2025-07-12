require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

var app = express();
app.set("view engine","ejs");
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

const dbURI = process.env.MONGODB_URI || "mongodb://localhost:27017/todo";
const port = process.env.PORT || 4000;

mongoose.connect(dbURI, {
    useNewUrlParser: true
}).then(() => {
    console.log("Connected to MongoDB successfully!");
}).catch((err) => {
    console.log("MongoDB connection error:", err);
});
const todoSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        trim: true
    },
    priority: {
        type: String,
        enum: ['high', 'medium', 'low'],
        default: 'medium'
    },
    completed: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Todo = mongoose.model("Todo", todoSchema);
app.get("/", async function(req, res) {
    try {
        const todos = await Todo.find({}).sort({ createdAt: -1 });
        res.render("list", { todos: todos });
    } catch (err) {
        console.log("Error fetching todos:", err);
        res.render("list", { todos: [] });
    }
});

app.post("/add", async function(req, res) {
    var todoText = req.body.todoText;
    var priority = req.body.priority || "medium";
    
    if (todoText && todoText.trim() !== "") {
        try {
            const newTodo = new Todo({
                text: todoText.trim(),
                priority: priority
            });
            await newTodo.save();
            console.log("Todo saved successfully:", newTodo);
        } catch (err) {
            console.log("Error saving todo:", err);
        }
    }
    res.redirect("/");
});

app.post("/delete/:id", async function(req, res) {
    try {
        const todoId = req.params.id;
        await Todo.findByIdAndDelete(todoId);
        console.log("Todo deleted successfully");
    } catch (err) {
        console.log("Error deleting todo:", err);
    }
    res.redirect("/");
});

app.post("/edit/:id", async function(req, res) {
    var newText = req.body.newText;
    var newPriority = req.body.newPriority;
    
    if (newText && newText.trim() !== "") {
        try {
            const todoId = req.params.id;
            await Todo.findByIdAndUpdate(todoId, {
                text: newText.trim(),
                priority: newPriority
            });
            console.log("Todo updated successfully");
        } catch (err) {
            console.log("Error updating todo:", err);
        }
    }
    res.redirect("/");
});

app.post("/toggle/:id", async function(req, res) {
    try {
        const todoId = req.params.id;
        const todo = await Todo.findById(todoId);
        if (todo) {
            todo.completed = !todo.completed;
            await todo.save();
            console.log("Todo toggled successfully");
        }
    } catch (err) {
        console.log("Error toggling todo:", err);
    }
    res.redirect("/");
});
app.post("/clear-completed", async function(req, res) {
    try {
        await Todo.deleteMany({ completed: true });
        console.log("Completed todos cleared successfully");
    } catch (err) {
        console.log("Error clearing completed todos:", err);
    }
    res.redirect("/");
});

app.listen(port, function() {
    console.log(`Server Started on port ${port}`);
    console.log("MongoDB integration active");
});

