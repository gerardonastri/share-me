import dbConnect from "../../util/mongo";
import Pin from '../../models/Pin'

//register
const handler =  async (req,res) => {
    await dbConnect()
    if(req.method === 'POST'){
        
        try {
            const pin = await Pin.create(req.body)
             res.status(200).json('pin created')
        } catch (error) {
            res.status(500).json(error.message)
            console.log(error);
        }
    }
   
};
export default handler