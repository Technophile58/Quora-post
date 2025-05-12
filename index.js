// index.js
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Dummy posts data
let posts = [
  { id: uuidv4(), username: "apnacollege", content: "I love coding" },
  { id: uuidv4(), username: "shraddhakhapra", content: "Hard work is important" },
  { id: uuidv4(), username: "rahul", content: "I got selected" },
];

// Routes

// Redirect root to /posts
app.get("/", (req, res) => {
  res.redirect("/posts");
});

// INDEX - Show all posts
app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});

// NEW - Form to create a new post
app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});

// CREATE - Add new post
app.post("/posts", (req, res) => {
  const { username, content } = req.body;
  posts.push({ id: uuidv4(), username, content });
  res.redirect("/posts");
});

// SHOW - Display a single post
app.get("/posts/:id", (req, res) => {
  const { id } = req.params;
  const post = posts.find((p) => p.id === id);
  res.render("show.ejs", { post });
});

// EDIT - Show form to edit a post
app.get("/posts/:id/edit", (req, res) => {
  const { id } = req.params;
  const post = posts.find((p) => p.id === id);
  res.render("edit.ejs", { post });
});

// UPDATE - Modify a post
app.patch("/posts/:id", (req, res) => {
  const { id } = req.params;
  const newContent = req.body.content;
  const post = posts.find((p) => p.id === id);
  post.content = newContent;
  res.redirect("/posts");
});

// DELETE CONFIRMATION PAGE
app.get("/posts/:id/delete", (req, res) => {
  const { id } = req.params;
  const post = posts.find((p) => p.id === id);
  res.render("delete.ejs", { post });
});

// DELETE - Remove a post
app.delete("/posts/:id", (req, res) => {
  const { id } = req.params;
  posts = posts.filter((p) => p.id !== id);
  res.redirect("/posts");
});

// Server listen
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
