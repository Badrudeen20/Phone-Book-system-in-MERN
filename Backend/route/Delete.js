const express = require('express')
const router = express.Router()
const Contact = require('../model/Schema')

router.post('/', (req,res) =>{
    Contact.remove({_id:req.body.id},
        function(err,data){
             if(err) throw err
              res.redirect('/read')
        })
})

module.exports = router