import mongoose from "mongoose";

const categoriaschema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    users:[
        {
            type: mongoose.Schema.ObjectId,
            ref: 'users'
        }
    ],
    recursos: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'recursos'
        }
    ]
});

const categoriaModel = mongoose.model("categorias",categoriaschema);

export default categoriaModel;