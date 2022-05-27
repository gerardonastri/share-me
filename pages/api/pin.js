import dbConnect from "../../util/mongo";
import Pin from '../../models/Pin'

//register
const handler =  async (req,res) => {
    await dbConnect()
    if(req.method === 'GET'){
        const {id} = req.query;
        try {
            const pin = await Pin.findById(id)
            res.status(200).json(pin)
        } catch (error) {
            res.status(500).json(error.message)
            console.log(error);
        }
    }
    if(req.method === 'POST'){
        const {id} = req.query;
        const {user} = req.body;
        try {
            const pin = await Pin.findByIdAndUpdate(id, {
                $push: {save: user}
            })
             res.status(200).json('pin updated')
        } catch (error) {
            res.status(500).json(error.message)
            console.log(error);
        }
    }
    if(req.method === 'PUT'){
        const {text, username, img} = req.body;
        const {id} = req.query;
        try {
            const comment = await  Pin.findByIdAndUpdate(id, {$push: {comments: {text: text, username: username, img: img}}});
            res.status(200).json('pin updated')
        } catch (e) {
            res.status(500).json(error.message)
            console.log(error);
        }
    }
    if(req.method === 'DELETE'){
        const {id} = req.query;
        try {
            await Pin.findByIdAndDelete(id)
            res.status(200).json('pin deleted')
        } catch (error) {
            res.status(500).json(error.message)
            console.log(error);
        }
    }
};
export default handler