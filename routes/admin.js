var express = require('express')
var router = express.Router()
var pool = require('./pool')


// for Submit Registration Details

router.post('/userdetailssubmit', function (req, res, next) {
    console.log(req.body)
    pool.query("insert into admins(name,mobile,email,password,company,agency ) values(?,?,?,?,?,?)",
     [ req.body.name, req.body.mobile,req.body.email, req.body.password,req.body.company,req.body.agency], function (error, result) {
        console.log(req.body.mobile)       
        if (error) 
            {   console.log(error)
                res.status(500).json({ status: false, message: 'Server Error ...' })
           }
        else 
          {    console.log(result)
            res.status(200).json({ status: true, message: 'Record Sumbitted Successfully ...' })
            }
    })
  });

 // For User Login

 router.post('/userlogin', function(req, res, next) {
    pool.query("select * from admins where email=?  and password=?",[req.body.email,req.body.password],function(error,result){
        if (error)
        {   
            res.status(500).json({status:false,message:'Server Error'})
        }
        else
        {
            if(result.length==1)
            {  
              res.status(200).json({status:true,admin:result[0]}) 
            }
            else
            {  
                res.status(200).json({status:false,message:'Invalid Email or Password'})
            }
        }
    })
});



    

module.exports = router;