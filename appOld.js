const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blogs");

const app = express();

// Connect to mongoDB
const db =
  "mongodb+srv://Node:S3MPYGcPUOOhDKtH@cluster0.qiltg3e.mongodb.net/Node?retryWrites=true&w=majority";
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => console.log("Connect to db"))
  .catch((err) => console.error(err));

// register view engin
app.set("view engine", "ejs");

//  Middleware  & Static :

// app.use((req,res, next)=>{
//     console.log('new Request made:');
//     console.log('Host : ', req.hostname);
//     console.log('Path : ', req.path );
//     console.log('method : ',req.method);

//     // to contimue runnig this code :
//     next();
// });

app.use(express.static("public")); // to import styles from style file

// express.urlencoded import all the url encoded data (create file ) and past that to  into an object to the request  (blog file)
app.use(express.urlencoded({ extended: true })); // to post data to blog
// we must add (app.post) bellow to can add new blog

app.use(morgan("dev")); // this instead of middleware

// mongoose and mongosandbox routes

// add blogs to mongoDB atlas and send it to the browser
/*
app.get('/add-blog',(req,res) => {
    const blog = new Blog({
        title : 'new blog ',
        snippet: 'about my blog',
        body: 'more about my blog'
    });

    blog.save()
        .then((result) => {
            res.send(result);    // send the result to the browser
        })
        .catch((err)=>console.log(err));
})


// View all the data from MongoDB atlas 
app.get('/all-blogs',(req, res)=>{
    Blog.find()
        .then((result)=> {
        res.send(result);
    })
      .catch((err)=>{console.log(err);})    
});


// Find -filter with id - the blog
app.get('/single-blog',(req,res)=>{
    Blog.findById('6297cf44f139dc145df0f786')
        .then((result)=>{
            res.send(result);
        })
        .catch(err => console.log(err));
});


*/

app.listen(3000);

// app.get('/',(req,res)=>{
//     // res.send('<p> Home page </p>');
//     // res.sendFile('./views/index.html',{root: __dirname});
//     res.render('index', {title : 'Blog'});
// });

app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  // res.sendFile('./view-engine/about.html',{root : __dirname});
  const blogs = [
    {
      title: "askld nkans",
      snippet:
        "dkifn jasdf jaojf uisfiasjdfupoerky5p eryk9687d oidj hok dfig jdhk",
    },
    {
      title: "askld nkans",
      snippet:
        "dkifn jasdf jaojf uisfiasjdfupoerky5p eryk9687d oidj hok dfig jdhk",
    },
    {
      title: "askld nkans",
      snippet:
        "dkifn jasdf jaojf uisfiasjdfupoerky5p eryk9687d oidj hok dfig jdhk",
    },
  ];
  res.render("about", { title: "About", blogs: blogs }); // or only blogs
});

app.get("/blogs", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { title: "All Blogs", blogs: result });
    })
    .catch((err) => console.log(err));
});

app.post("/blogs", (req, res) => {   // receive data from create form 
  const blog = new Blog(req.body);  
  blog
    .save()
    .then((result) => {
      res.redirect("/blogs");    // print new data on the blog body
    })
    .catch((err) => console.log(err));
});

app.get("/blogs/:myid", (req, res) => {
  const id = req.params.myid;

  Blog.findById(id)
    .then(result => {
      res.render('details', { blog: result, title: "Blog Details" });
    })
    .catch((err) => console.log(err));
});

app.delete("/blogs/:myid", (req, res) => {
  const id = req.params.myid;

  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => console.log(err));
});

app.get("/blog/create", (req, res) => {
  // res.sendFile('./view-engine/about.html',{root : __dirname});
  res.render("create", { title: "New blog" });
});

// 404 code page

app.use((req, res) => {
  // res.status(404).sendFile('./view-engine/404.html',{root : __dirname});
  res.status(404).render("404", { title: "Error" });
});
