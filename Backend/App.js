const express = require('express')
const app = express()
const port = 5000
const mongoose = require('mongoose')
const url = " mongodb://127.0.0.1:27017/badru"
const cors =require('cors')
const Read = require('./route/Read')
const Delete = require('./route/Delete')
const Create  = require('./route/Create')
const Edit = require('./route/Edit')

mongoose.connect(url,
    {useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:false},
    function(err){
     if(err)  throw err
     console.log(`connected!`)
    })

app.use(cors())
app.use(express.json())

app.get('/',(req,res) =>{
     res.send("This is Home page")
})

app.use('/read',Read)
app.use('/delete',Delete)
app.use('/create',Create)
app.use('/edit',Edit)

app.listen(port,(req,res)=>{
    console.log(`localhost:${port}`)
})



