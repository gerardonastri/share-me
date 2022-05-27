import mongoose from 'mongoose'

const PinSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    image: {
        type: String
    },
    category: {
        type: String
    },
    about: {
        type: String
    },
    destination: {
        type: String
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    save: {
        type: Array,
        default: []
    },
    comments: [
        {
            username: {
                type:String
            },
            text: {
                type: String
            },
            img: {
                type: String
            }
        }
    ]
}, {timestamps: true})

export default mongoose.models.Pin || mongoose.model('Pin', PinSchema)