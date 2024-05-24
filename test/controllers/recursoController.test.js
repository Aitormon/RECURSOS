import connectDB from "../../src/config/mongo.js";
import mongoose from 'mongoose';
import recursoController from "../../src/controllers/recursos/recursoController.js";
import categoriaController from "../../src/controllers/categorias/categoriaController.js";
import userController from "../../src/controllers/users/userController.js";
const recursoData = {
    content: "tarea",
}
let categoriaId;
let newUser;
let recursoId;
describe("Test de recursoController",()=>{
    beforeAll(async ()=>{
        await connectDB();
        try {
            
            await mongoose.connection.collections["recursos"].drop();
            newUser = await userController.getByProperty("email","mail");
            if(!newUser){
                newUser = await userController.create({username:"algo",email:"mail",password:"1234"});
            }
            console.log("newUser",newUser);
        } catch (error) {
            console.error(error);   
        }
    })
    afterAll(async()=>{
        await mongoose.connection.close();
    })

    test("añadir recurso",async()=>{
        const categorias = await categoriaController.getAll();
        categoriaId = categorias[0]._id;

        recursoData.categoria = categoriaId;
        const recurso = await recursoController.create(recursoData);
        expect(recurso).not.toBeNull();
        expect(recurso.content).toEqual(recursoData.content);
        recursoId=recurso._id;

    })
    test("buscar recursos por categoriao",async()=>{
        const recursos= await recursoController.getAll(categoriaId);
        expect(recursos.length).toBeGreaterThanOrEqual(1);
        const recurso = recursos[0];
        expect(recurso.content).toEqual(recursoData.content);

    })
    test("Añadir usuario",async()=>{
        
        const recurso = await recursoController.addUser(recursoId,newUser._id);
        expect(recurso).not.toBeNull();
        expect(recurso.users).toContain(newUser._id);

    })

})