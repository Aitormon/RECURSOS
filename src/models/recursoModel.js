import mongoose from "mongoose";

const recursoSchema = new mongoose.Schema({
    content: {
        type:String,
        required:true
    },
    owner: {
        type: mongoose.Schema.ObjectId,
        ref: 'users'
    },
    categoria:{
        type: mongoose.Schema.ObjectId,
            ref: 'categorias',
            required: true
    }
})

const recursoModel = mongoose.model("recursos",recursoSchema);

export default recursoModel;