const express = require('express')
const router = express.Router()
const Contact = require('../model/Schema')

router.post('/',async (req,res) =>{
     var result = await new Contact()
        result.name = req.body.name,
        result.number = req.body.number

        result.save(function(err, data){
            if(err) throw err
            res.redirect('/read');
            
     })
})

module.exports = router