import connectDB from "../../src/config/mongo.js";
import mongoose from 'mongoose';
import categoriaController from "../../src/controllers/categorias/categoriaController.js";
import recursoController from "../../src/controllers/recursos/recursoController.js"

let categoriaId = null;
let recursoId = null;
let newrecurso;
describe("Test de categoriaController",()=>{
    beforeAll(async ()=>{
        await connectDB();
        try{
            await mongoose.connection.collections["categorias"].drop();
            newrecurso = await recursoController.getByProperty("email","mail");
            if(!newrecurso){
                newrecurso = await recursoController.create({recursoname:"algo",email:"mail",password:"1234"});
            }
        }
        catch(error){
            console.error(error);
        }
    })
    afterAll(async()=>{
        await mongoose.connection.close();
    })

    test("Crear categoria",async()=>{
        const recursos = await recursoController.getAll();
        console.log("usuario",recursos[0])
        const categoriaData = {
            name: "pruebas",
            recursos:recursos
        }
        const categoria = await categoriaController.create(categoriaData)
        categoriaId = categoria._id;
        expect(categoria).not.toBeNull();

    })
    test("Añadir recurso",async()=>{
        
        recursoId = newrecurso._id;
        const categoria = await categoriaController.addrecurso(categoriaId,newrecurso._id);
        expect(categoria).not.toBeNull();
        expect(categoria.recursos).toContain(newrecurso._id);

    })
    test("Quitar recurso",async()=>{
        const categoria = await categoriaController.removerecurso(categoriaId,recursoId);
        expect(categoria).not.toBeNull();
        expect(categoria.recursos).not.toContain(recursoId);
    })
})