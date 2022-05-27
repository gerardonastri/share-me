import dbConnect from "../../util/mongo";
import Pin from '../../models/Pin'

//register
const handler =  async (req,res) => {
    await dbConnect()
    if(req.method === 'GET'){
        const {searchTerm} = req.query;
        try {
            const pins = await Pin.find({
                $or: [{title: searchTerm}, {about: searchTerm}]
            })
            res.status(200).json(pins)
        } catch (error) {
            res.status(500).json(error.message)
            console.log(error);
        }
    }
};
export default handler