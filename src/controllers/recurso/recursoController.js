import recursoModel from "../../models/recursoModel.js";
import categoriaController from "../categorias/categoriaController.js"

const getAll = async (categoriaId) =>{
    try {
        const recursos = await recursoModel.find({categoria:categoriaId});
        return recursos;
    } catch (error) {
        console.error(error);
        return [];
    }
}


const getById = async(id) =>{
    try {
        const recurso = await recursoModel.findById(id);
        return recurso;
    } catch (error) {
        console.error(error);
        return null;
        
    }
}
const getByProperty = async(property,value) =>{
    try {
        const recurso = await recursoModel.find({[property]:value})
        return recurso;
    } catch (error) {
        return null;
    }
}
const create = async(data) =>{
    try {
        const recurso = await recursoModel.create(data);
        if(recurso){
            await categoriaController.addrecurso(recurso.categoria,recurso._id)
        }
        return recurso;
    } catch (error) {
        console.error(error); 
        return null;  
    }
}

const changeStatus = async(id,status) =>{
    try {
        const data = {
            status: status
        }
        await recursoModel.findByIdAndUpdate(id,data);

        const recurso = await recursoModel.findById(id);
        return recurso;
    } catch (error) {
        console.error(error);
        return null;
    }
}
const update = async(id,data) =>{
    try {
         await recursoModel.findByIdAndUpdate(id,data);

        const recurso = await recursoModel.findById(id);
        return recurso;
    } catch (error) {
        console.error(error);
        return null;
    }
}

const remove = async(id) =>{
    try {
        
        const recurso = await recursoModel.findByIdAndDelete(id);
        await categoriaController.removerecurso(recurso.categoria,recurso._id);
        return recurso;
    } catch (error) {
        console.error(error);
        return null;
    }
}
const removeForcategoria = async(categoriaId) =>{
    try {
        const recursos = await recursoModel.deleteMany({ categoria: categoriaId });
        return recursos;
    } catch (error) {
        console.error(error);
        return null;
    }
}
const removeMany = async(ids) =>{
    try {
        const recursos = await recursoModel.deleteMany({ _id: { $in: ids } });
        return recursos;
    } catch (error) {
        console.error(error);
        return null;
    }
}
const addrecurso = async(categoriaId,recursoId) =>{
    try {
        const recurso = await getById(recursoId);
        if(!recurso.recursos.includes(recursoId)){
            recurso.recursos.push(recursoId);
            await recurso.save();
            return recurso
        }
        return recurso;
    } catch (error) {
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
const removeUser = async(recursoId,userId)=>{
    try {
        const recurso = await getById(recursoId);
        if(recurso.users.includes(userId)){
            recurso.users = recurso.users.filter(u=> u!==userId);
            await recurso.save();
            return recurso
        }
        return recurso;
    } catch (error) {
        return null;
    }
}
export const functions = {
    getAll,
    getById,
    getByProperty,
    create,
    update,
    changeStatus,
    remove,
    removeMany,
    removeForcategoria,
    addUser,
    removeUser
}

export default functions;