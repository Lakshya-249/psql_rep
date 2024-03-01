const express = require("express");
const router = require("./router");
const { Server } = require("http");

const port = 5000;

const app = express();

app.use(express.urlencoded({extended:false}));

app.use(express.json());

app.use("/user",router);


app.listen(port,()=>{
    console.log("server running...");;
})