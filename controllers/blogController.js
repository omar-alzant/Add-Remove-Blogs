const Blog = require("../models/blogs"); // for noSQL

const blog_index = (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("blogs/index", { title: "All Blogs", blogs: result });
    })
    .catch((err) => console.log(err));
};

const blog_create_post = (req, res) => {
  // receive data from create form
  const blog = new Blog(req.body);
  blog
    .save()
    .then((result) => {
      res.redirect("/blogs"); // print new data on the blog body
    })
    .catch((err) => console.log(err));
};

const blog_details = (req, res) => {
  const id = req.params.myid;

  Blog.findById(id)
    .then((result) => {
      res.render("blogs/details", { blog: result, title: "Blog Details" });
    })
    .catch((err) => {
      console.log(err); 
      res.status(404).render('404', { title: 'Error'});
    });
};

const blog_create_get = (req, res) => {
  res.render("blogs/create", { title: "New blog" });
};

const blog_delete = (req, res) => {
  const id = req.params.myid;

  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => console.log(err));
};

module.exports = {
  blog_index,
  blog_create_post,
  blog_details,
  blog_create_get,
  blog_delete,
};
