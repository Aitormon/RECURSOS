import categoriaController from "./categoriaController.js";

const getAll = async(req,res)=>{
    const isAdmin = req.user.role === "admin";
    const userId = isAdmin ? null : req.user._id;
     const categorias = await categoriaController.getAll(userId);
    res.json({data:categorias});
}

const getById = async (req,res) =>{
    const id = req.params.id
    const categoria = await categoriaController.getById(id);
    res.json({data:categoria});
}



const create = async(req,res)=>{
    const categoria = await categoriaController.create(data);
    res.json({data:categoria})
}

const update = async(req,res)=>{
    const id =req.params.id;
    const categoria = await categoriaController.update(id,req.body);
    res.json({data:categoria})
}

const remove = async(req,res)=>{
    const id= req.params.id;
    const categoria = await categoriaController.remove(id);
    res.json({data:categoria})
}

const addUser = async(req,res)=>{
    const categoriaId = req.params.id;
    const userId = req.body.userId;
    const categoria = await categoriaController.addUser(categoriaId,userId);
    res.json({data:categoria})
}

const removeUser = async(req,res)=>{
    const categoriaId = req.params.id;
    const userId = req.body.userId;
    const categoria = await categoriaController.removeUser(categoriaId,userId);
    res.json({data:categoria})
}


export default{
    getAll,
    getById,
    create,
    update,
    remove,
    addUser,
    removeUser,
}

