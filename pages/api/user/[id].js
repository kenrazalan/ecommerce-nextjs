import connectDB from '../../../utils/connectDB'
import Users from '../../../models/userModel'
import auth from '../../../middleware/auth'



connectDB()

export default async (req,res) => {
    switch(req.method){
        case "PATCH":
            await updateRole(req,res)
            break;
    }
    switch(req.method){
        case "DELETE":
            await deleteUser(req,res)
            break;
    }

}

    const deleteUser = async (req,res) => {
        try {
        const result = await auth(req,res)
        if(result.role !== 'admin' || !result.root) {
            console.log(result.role !== 'admin' || !result.root)
            return res.status(500).json({err: 'Invalid Authentication'})
        }
        const { id } = req.query
        

        await Users.findOneAndDelete(id)
        res.json({ msg: "Deleted." })
        
        } catch (err) { 
            return res.status(500).json({err: err.message})
        }
    }

    const updateRole = async (req,res) => {
        try {
           const result = await auth(req,res)
           if(result.role !== 'admin' || !result.root) {
               console.log(result.role !== 'admin' || !result.root)
               return res.status(500).json({err: 'Invalid Authentication'})
           }
           

           const { id } = req.query
           const { role } = req.body

            await Users.findOneAndUpdate({ _id: id}, {role}).select('-password')
           res.json({ msg: "Update Success." })
           
        } catch (err) { 
            return res.status(500).json({err: err.message})
        }
    }
