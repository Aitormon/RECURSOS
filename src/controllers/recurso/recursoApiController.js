import recursoController from "./recursoController.js";

const getAll = async(req,res)=>{
    const categoriaId = req.query.categoriaId;
    const recursos = await recursoController.getAll(categoriaId);
    res.json({data:recursos});
}

const getById = async (req,res) =>{
    const id = req.params.id
    const recurso = await recursoController.getById(id);
    res.json({data:recurso});
}


const create = async(req,res)=>{
    const recurso = await recursoController.create(req.body);
    res.json({data:recurso})
}

const update = async(req,res)=>{
    const id =req.params.id;
    const recurso = await recursoController.update(id,req.body);
    res.json({data:recurso})
}
const changeStatus = async(req,res)=>{
    const id = req.params.id
    const status = req.body.status;
    const recurso  = await recursoController.changeStatus(id,status);
    res.json({data:recurso})
}
const remove = async(req,res)=>{
    
    const id= req.params.id;

    const recurso = await recursoController.findById(id);

    if (!recurso.owner.equals( req.user._id)) {
        return res.status(403).json({ error: 'No tienes permiso para borrar este recurso' });
    }

    const recursoborrado = await recursoController.remove(id);
    res.json({data:recursoborrado})
}

const addUser = async(req,res)=>{
    const recursoId = req.params.id;
    const userId = req.body.userId;
    const recurso = await recursoController.addUser(recursoId,userId);
    res.json({data:recurso})
}

const removeUser = async(req,res)=>{
    const recursoId = req.params.id;
    const userId = req.body.userId;
    const recurso = await recursoController.removeUser(recursoId,userId);
    res.json({data:recurso})
}


export default{
    getAll,
    getById,
    create,
    update,
    changeStatus,
    remove,
    addUser,
    removeUser,
}

