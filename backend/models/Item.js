import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true,
        unique: true
    },
    themes:{
        type: Array,
        required: true
    },
    viewsCount: {
        type : Number,
        default: 0
    },
    user: {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    
    imageUrl: String,
},
{
   
    timestamps: true
},
)

export default mongoose.model('Item', ItemSchema);