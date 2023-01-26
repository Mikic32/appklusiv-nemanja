const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const homeRoutes = require("./routes/home")
const registerRoutes = require("./routes/register")

const MONGODB_URI = "mongodb://localhost/auth-db-nm";

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});

mongoose.set("strictQuery", true);
mongoose.connect(MONGODB_URI);

app.use(
  cors({
    optionsSuccessStatus: 200,
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
    credentials: true,
    origin: "http://127.0.0.1:5173",
  })
);

app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use(express.json());

app.use(registerRoutes);

app.use(homeRoutes);

app.listen(3000);
