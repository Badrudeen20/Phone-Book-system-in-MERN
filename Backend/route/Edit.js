const express = require('express')
const router = express.Router()
const Contact = require('../model/Schema')

router.post('/',async (req,res)=>{
     var res = await Contact.findByIdAndUpdate(req.body.id,{
         name:req.body.name,
         number:req.body.number
     },function(err,data){
         if(err) throw err
         res.redirect('/read')
     })
})

module.exports = router