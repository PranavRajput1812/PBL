import user from "../model/userModel.js"

const register = async (req,res)=>{
    try {
        const {fullName,email,password} = req.body

            if(!fullName|| !email || !password){
                res.status(500).json({
                    success: false ,
                    message: 'All fields are required !'
                })
            }

            const userExists = await user.findOne({email})

            if(userExists){
                res.status(500).json({
                    success: false ,
                    message: 'User Already Exists!'
                })
            }

            const newUser = await user.create({
                fullName,
                email,
                password,
                
            })

            if(!newUser){
                res.status(500).json({
                    success: false ,
                    message: 'User cannot be created!'
                })
            }

            // save user in DB
            await newUser.save()
    } catch (error) {
        console.log(error.message);
    }


}

export {register}