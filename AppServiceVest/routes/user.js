'use strict';
let mongoose = require('mongoose');
// let User = mongoose.model("Users");
let User = require('../models/User')
let path = require('path');
let ObjectId = mongoose.Schema.Types.ObjectId;


function createUser(req, res, next) {
   let usermodel = new User(req.body);
   usermodel.save(function(err,body){
       if (err){
           res.json({
               data:"Error happened:"+err
           });
       }
       else{if(User){
           res.json({
               data:User
           });
       }}
   })
}
function queryUser(req,res){
    User.findById(req.params.id,function(err,User){
        if (err){
            res.status(500);
            res.json({
                data:"Error happened:"+err
            })
        }else{
            if (User) {
                res.json({data: "User is:" + User})
            }else{
                res.json({data:"User is not found"+req.params.id})
            }
        }
    })
}

function updateUser(req,res,next){
    // let updateusermodel = new User(req.body);
    User.findByIdAndUpdate(req.params.id,req.body,function(err,User){
        if (err){
            res.status(500);
            res.json({data:"Error happened:"+err})
        }
        else{
            if (User){
                res.json({data:User})
            }
            else{
                res.json({data:"User not found"+req.params.id})
            }
        }
    })

}

function delUSer(req,res,next){
    User.findByIdAndRemove(req.params.id,function(err,User){
        if (err){
            res.status(500);
            res.json({data:"Error happened"+err})
        }else{
            res.json({
                data:"User deleted successfully"+req.params.id
            })
        }

    })
}

module.exports = {
    createUser:createUser,
    delUSer:delUSer,
    updateUser:updateUser,
    queryUser:queryUser

};