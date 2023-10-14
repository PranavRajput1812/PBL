import mongoose, { model } from "mongoose";

import bcrypt from 'bcrypt'

import { config } from "dotenv";
config()
import crypto from 'crypto'



// userSchema
const userSchema = new mongoose.Schema({
    fullName:{
        type:'String',
        required:[true,`Name is required field`],
        trim : true,
    }
    ,
    email:{
        type:'String',
        required:[true ,`Name is required field`],
        trim:true,
        unique:true,
        match:[/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,'Please fill a valid email address']
    },
    password:{
        type:'String',
        required: [true,`Password is a required feild`],
        trim:true,
        select:false,
        minLength:[6,`Password must be atleast of 6 characters`]

    },
    avatar:{
        public_id:{type:'String'},
        secure_url:{type:'String'}
    },
    role:{
        type:'String',
        enum:['USER','ADMIN'],
        default:'USER'
    },
    forgotPasswordToken:{
        type : 'String'
    },
    forgotPasswordExpiry :{
        type:'Date'
    },
   
},{
    timestamps:true
})

//ENCRYPTING PASSWORD

userSchema.pre('save',async function(next){
        if(!this.isModified('password')){
            return next()
        }
        this.password = await bcrypt.hash(this.password,7)
})

//JWT TOKEN GENRATION
userSchema.methods = {
    generateJWTToken : async function(){
        return await jwtToken.sign(
            {
                id:this._id,email:this.email,role:this.role
                                                            
            },
            process.env.SECRET,
            {
                expiresIn : process.env.JWT_EXPIRY
            }

        )
    },
    comparePassword : async function(plainTextPassword){
        return await bcrypt.compare(plainTextPassword,this.password)

    },
    generatePasswordResetToken: async function(){
        const resetToken = crypto.randomBytes(20).toString('hex')

        this.forgotPasswordToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex')

        //set expiry 15 min from now

        this.forgotPasswordExpiry = Date.now() + (15*60*1000)

        return resetToken;
    },

}

const user = model('User',userSchema)

export default user