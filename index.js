const express = require('express');
require('dotenv').config()

const { Connection } = require('./Server/db');

var cors = require('cors');
const { authRouter } = require('./Routes/Allroutes');

 



const app = express();
app.use(express.json());
app.use(cors())

app.get("/",(req,res)=>{
    res.send("This is the first server")
})
app.use("/auth",authRouter);

// this is the port and shold accept the async
app.listen(process.env.port || 3000, async () =>{
    try{
    await Connection
    console.log("This server is listening the 1234 port")
    }
    catch(e){
        console.log("The api didnot connect wth database");
        console.log(e);
    }
})