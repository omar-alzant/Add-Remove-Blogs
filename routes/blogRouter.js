const express = require("express");
const router = express.Router();
const blogControllers = require("../controllers/blogController");

const Blog = require("../models/blogs");

router.get("/", blogControllers.blog_index);

router.post("/", blogControllers.blog_create_post);

router.get("/create", blogControllers.blog_create_get);

router.get("/:myid", blogControllers.blog_details);

router.delete("/:myid", blogControllers.blog_delete);

module.exports = router;
