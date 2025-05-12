const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

var methodOverride=require("method-override")
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));

let posts = [
  { id: uuidv4(), username: "apnacollege", content: "I love coding" },
  { id: uuidv4(), username: "shraddhakhapra", content: "Hard work is important" },
  { id: uuidv4(), username: "rahul", content: "I got selected" },
];

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => { 
  res.render("new.ejs");
});

app.post("/posts", (req, res) => {
  let { username, content } = req.body;
  posts.push({ id: uuidv4(), username, content }); // Added ID here
  res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => p.id === id); // Ensuring exact string match
  res.render("show.ejs", { post });
});

app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let newContent=req.body.content;
    let post=posts.find((p)=>id==p.id);
    post.content=newContent;
    console.log(post);
    // res.send("patch request succesfull")
    res.redirect("/posts")
})

app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id==p.id);
res.render("edit.ejs",{post})
})

//delete part remaining

app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;
  posts = posts.filter((p) => p.id !== id); // Remove post by ID
  res.redirect("/posts");
});
app.get("/posts/:id/delete", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => p.id === id);
    res.render("delete.ejs", { post });
});

