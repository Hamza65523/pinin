const express = require('express')
const mongoose  = require('mongoose')
const PORT = process.env.PORT || 5000
const app = express()
require('dotenv').config()


console.log(process.env.MOGOURI)
mongoose.connect(process.env.MOGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology: true

})
mongoose.connection.on('connected',()=>{
    console.log("conneted to mongo yeahh")
})
mongoose.connection.on('error',(err)=>{
    console.log("err connecting",err)
})
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));
app.use("/uploads", express.static("uploads"));


app.use(require('./routes/auth'))
app.use(require('./routes/pin'))

app.get("/", (req, res) => {
    res.send("Welcome our Pinin...");
  });


app.listen(PORT,()=>{
    console.log("server is running on",PORT)
})
