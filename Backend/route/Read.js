const express = require('express')
const router = express.Router()
const Conact = require('../model/Schema')

router.get('/',async (req,res) =>{
     const list  = await Conact.find({})

     try{
         res.json(list)
     }catch(err){
          console.log(err)
     }
})

module.exports = router
