const express = require("express");
const cookieParser = require("cookie-parser");
const csrf = require('csurf');
const app = express();
const port = process.env.PORT || 3000;
const csrfProtection = csrf({cookie: true});
app.use(cookieParser());
app.set("view engine", "pug");

const users = [
  {
    id: 1,
    firstName: "Jill",
    lastName: "Jack",
    email: "jill.jack@gmail.com"
  }
];
//index.pug tds----------------------

app.get("/", (req, res) => {
  // res.send("Hello World!");
  res.render("index", {users});
});

app.get("/create", csrfProtection, (req, res, next) => {
  res.render("Create-Form", { title: "Create Form", csrfToken: req.csrfToken() });

});

app.post("/create", csrfProtection, (req, res) => {
  res.send("csrf working");
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = app;
