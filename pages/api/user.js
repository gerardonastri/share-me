import dbConnect from "../../util/mongo";
import User from '../../models/User'

//register
const handler =  async (req,res) => {
    await dbConnect()
    if(req.method === 'GET'){
        const {user} = req.query;
        const {id} = req.query;
        try {
            if(user){
                const profile = await User.findOne({username: user})
                res.status(200).json(profile)
            } else {
                const profile = await User.findById(id)
                res.status(200).json(profile)
            }
        } catch (error) {
            res.status(500).json(error.message)
            console.log(error);
        }
    }
};
export default handler