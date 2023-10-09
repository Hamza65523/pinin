const User = require('../models/user')
const crypto = require('crypto')
const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer')
// const sendgridTransport = require('nodemailer-sendgrid-transport')
const {generateToken}  = require('../utils/features')


// const transporter = nodemailer.createTransport(sendgridTransport({
//     auth:{
//         api_key:process.env.SENDGRID_API
//     }
// }))

exports.Signup = (req,res)=>{
    const {name,email,password,userType,LoginType,userBio} = req.body 
    if(!email || !password ||!LoginType){
       return res.status(422).json({error:"please add all the fields"})
    }
    User.findOne({email:email}).then(async(savedUser)=>{
        if(savedUser){
          return res.status(422).json({error:"user already exists with that email",status:false})
        }
        
        bcrypt.hash(password,12)
        .then(hashedpassword=>{
              const user = new User({
                  email,
                  password:hashedpassword,
                  name,
                  userType,
                  LoginType,
              })
              user.save()
              .then(user=>{
                //   transporter.sendMail({
                //       to:user.email,
                //       from:"no-reply@insta.com",
                //       subject:"signup success",
                //       html:"<h1>Your otp code is</h1>"
                //   })
                const token =generateToken(user) 
                const {_id,name,email} = user
                res.json({message:"User register successfully",token,user:{_id,name,email},status:true})
              })
              .catch(err=>{
                  console.log(err)
              })
        })
       
    })
    .catch(err=>{
      console.log(err)
    })
  }

exports.Signin =  (req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
       return res.status(422).json({error:"please add email or password",status:false})
    }
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
           return res.status(422).json({error:"Invalid Email or password",status:false})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){
                // res.json({message:"successfully signed in"})
               const token =generateToken(savedUser) 
               res.json({token,user: savedUser,status:true})
            }
            else{
                return res.status(422).json({error:"Invalid Email or password",status:false})
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })
}

exports.ResetPassword = (req,res)=>{
    crypto.randomBytes(32,(err,buffer)=>{
        if(err){
            console.log(err)
        }
        const token = buffer.toString("hex")
        User.findOne({email:req.body.email})
        .then(user=>{
            if(!user){
                return res.status(422).json({error:"User dont exists with that email",status:false})
            }
            user.resetToken = token
            user.expireToken = Date.now() + 3600000
            user.save().then((result)=>{
                // transporter.sendMail({
                //     to:user.email,
                //     from:"no-replay@insta.com",
                //     subject:"password reset",
                //     html:`
                //     <p>You requested for password reset</p>
                //     <h5>click in this <a href="${process.env.EMAIL}/reset/${token}">link</a> to reset password</h5>
                //     `
                // })
                res.json({message:"check your email",status:true})
            })

        })
    })
}

exports.NewPassword = (req,res)=>{
    const newPassword = req.body.password
    const sentToken = req.body.token
    User.findOne({resetToken:sentToken,expireToken:{$gt:Date.now()}})
    .then(user=>{
        if(!user){
            return res.status(422).json({error:"Try again session expired"})
        }
        bcrypt.hash(newPassword,12).then(hashedpassword=>{
           user.password = hashedpassword
           user.resetToken = undefined
           user.expireToken = undefined
           user.save().then((saveduser)=>{
               res.json({message:"password updated success"})
           })
        })
    }).catch(err=>{
        console.log(err)
    })
}

exports.verifyUser=async(req,res)=>{
    try {
        let user = await User.findByIdAndUpdate({_id:req.params.id},{verifyUser:true})
        return res.status(200).json({message:"verified user",data:user})
    } catch (error) {
        return res.status(422).json({error:"Not verified user"})
    }
    
}