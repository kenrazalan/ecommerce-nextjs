import connectDB from '../../../utils/connectDb'
import valid from '../../../utils/valid';
import Users from '../../../models/userModel'
import bcrypt from 'bcrypt'




connectDB()

export default async (req, res) => {
    switch(req.method){
        case "POST":
            await register(req, res)
            break;
    }
}

const register = async (req,res) => {
    try {
        const {name,email,password,cf_password} = req.body;
        const errorMsg = valid(name,email,password,cf_password) 
        if(errorMsg) return res.status(400).json({err: errorMsg})

        const user = await Users.findOne({email})
        if(user) return res.status(400).json({err:"Email already exist"})
        const passwordHashed = await bcrypt.hash(password,12)

        const newUser = new Users({ 
            name, email ,password:passwordHashed, cf_password
        })
        await newUser.save()
        res.json({msg:"Register Success"})
    }catch(err) {
        res.status(500).json({err: err.message})
    }
}
