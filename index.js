const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const keys = require("./config/keys");
const PORT = process.env.PORT || 5000;
const todoRoutes = require("./routes/todos");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const logoutRoute = require("./routes/logoutRoute");
mongoose.promise = global.promise;
const app = express();
require("./services/passport");

// set the debug so we can see the errors in the console.
mongoose.set("debug", true);

// connect to mongodb NOTE: we can name our db anything. this one is 'todo-api'
mongoose.connect("mongodb://localhost/todo-api");
//Body Parser Config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));

app.use(passport.initialize());
app.use(passport.session());

// helper clean routes example ... follow the trail of require()'s
app.use("/auth/google", authRoutes);
app.use("/api/todos", todoRoutes);
app.use("/api/current_user", userRoutes);
app.use("/api/logout", logoutRoute);

// dirty generic example
app.get("/api/test", (req, res) => {
  res.json({
    data: "Test Passed!"
  });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, err => {
  if (err) {
    console.error("Error connection to the server :", err);
  } else {
    console.log("Listening on port " + PORT);
  }
});
