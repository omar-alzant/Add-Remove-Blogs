const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const blogRouter = require("./routes/blogRouter");
const app = express();

const db =
  "mongodb+srv://Node:S3MPYGcPUOOhDKtH@cluster0.qiltg3e.mongodb.net/Node?retryWrites=true&w=majority";
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => console.log("Connect to db"))
  .catch((err) => console.error(err));

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
// app.use(morgan("dev")); // this instead of middleware

app.listen(4000);

app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
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
  res.render("about", { title: "About", blogs: blogs });
});

app.use("/blogs", blogRouter); // localhost:3000/blogs/

app.use((req, res) => {
  res.status(404).render("404", { title: "Error" });
});
