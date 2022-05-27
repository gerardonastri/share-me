import dbConnect from "../../util/mongo";
import Pin from '../../models/Pin'

//register
const handler =  async (req,res) => {
    await dbConnect()
    if(req.method === 'GET'){
        const {cat} = req.query;
        const {user} = req.query;
        const {created} = req.query;
        try {
            let pins;
           if(cat){
             pins = await Pin.find({category: cat})
           } else if(user){
             if(created == "true"){
                pins = await Pin.find({author: user})
             } else {
                pins = await Pin.find({save: user})
             }
           }
           else {
            pins = await Pin.find()
           }
            res.status(200).json(pins)
        } catch (error) {
            res.status(500).json(error.message)
            console.log(error);
        }
    }
    if(req.method === 'POST'){
        
        try {
            const pin = await Pin.create(req.body)
            res.status(200).json(pin)
        } catch (error) {
            res.status(500).json(error.message)
            console.log(error);
        }
    }
};
export default handler