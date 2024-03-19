const express = require('express');
const app = express();
const cors = require("cors");
const connection = require('./database/connection');
const studentRouter = require('./src/controller/studentController');

app.use(express.json());
app.use(cors({ origin: "*" }));
connection()
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With ,Content-Type,Authorization ,Accept",
    "HTTP/1.1 200 OK",
    "append,delete,entries,foreach,get,has,keys,set,values,Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PATCH,DELETE,OPTIONS,PUT"
  );
  next();
});

app.use('/', studentRouter);


app.listen(8000, () => {
  console.log('server connected');
});

