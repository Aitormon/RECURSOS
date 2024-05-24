import categoriaModel from "../../models/categoriaModel.js";
import recursoController from "../recurso/recursoController.js";
import userController from "../users/userController.js";

const getAll = async(userId=null)=> {
    try {
        if(!userId){
            const categorias = await categoriaModel.find();
            return categorias;
        }
        const user =await userController.getById(userId);
        await user.populate("categorias");
        return user.categorias;
    } catch (error) {
        console.error(error);
        return [];
    }
}
const getById = async(id) =>{
    try {
        const categoria = await categoriaModel.findById(id);
        if(!categoria){
            return null;
        }
        await categoria.populate("users");
        await categoria.populate("recursos");
        return categoria;
    } catch (error) {
        console.error(error);
        return null;
        
    }
}

const create = async(data) =>{
    try {
        const categoria = await categoriaModel.create(data);
        categoria.users.push(data);
        await categoria.save();
        await userController.addcategoria(data,categoria._id);
        return categoria;
    } catch (error) {
        console.error(error); 
        return null;  
    }
}

const update = async(id,data) =>{
    try {
        await categoriaModel.findByIdAndUpdate(id,data);

        const categoria = await categoriaModel.findById(id);
        return categoria;
    } catch (error) {
        console.error(error);
        return null;
    }
}

const remove = async(id) =>{
    try {
        const categoria = await categoriaModel.findByIdAndDelete(id);
        const result = await recursoController.removeForcategoria(id);
        await userController.removecategoria(id)
        return categoria;
    } catch (error) {
        console.error(error);
        return null;
    }
}
const addUser = async(categoriaId,userId) =>{
    try {
        console.log("usuriio",userId)
        const categoria = await getById(categoriaId);
        console.log("categoriao",categoria);
        await userController.addcategoria(userId,categoriaId)
        if(!categoria.users.includes(userId)){
            categoria.users.push(userId);
            await categoria.save();
            return categoria
        }
        return categoria;
    } catch (error) {
        return null;
    }
}
const removeUser = async(categoriaId,userId)=>{
    try {
        console.log("removeUser",categoriaId,userId)
        const categoria = await getById(categoriaId);

        await userController.removecategoria(userId,categoriaId);
        if(categoria.users.includes(userId)){
            categoria.users = categoria.users.filter(u=> !u.equals(userId));
            await categoria.save();
            return categoria
        }
        return categoria;
    } catch (error) {
        return null;
    }
}
const addrecurso = async(categoriaId,recursoId) =>{
    try {
        const categoria = await getById(categoriaId);
        if(!categoria.recursos.includes(recursoId)){
            categoria.recursos.push(recursoId);
            await categoria.save();
            return categoria
        }
        return categoria;
    } catch (error) {
        return null;
    }
}
const removerecurso = async(categoriaId,recursoId)=>{
    try {
        const categoria = await getById(categoriaId);
        if(categoria.recursos.includes(recursoId)){
            categoria.recursos = categoria.recursos.filter(u=> u!==recursoId);
            await categoria.save();
            return categoria
        }
        return categoria;
    } catch (error) {
        return null;
    }
}
export const functions = {
    getAll,
    getById,
    create,
    update,
    remove,
    addUser,
    removeUser,
    addrecurso,
    removerecurso
}

export default functions;