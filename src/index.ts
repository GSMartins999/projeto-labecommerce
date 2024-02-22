import { users, products } from "./database";
import express from 'express';
import { Request, Response } from "express";
import cors from "cors";
import { TProducts, TUser } from "./types";


const app = express();
app.use(express.json());
app.use(cors());

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
})

//Pegando todos os usuários: 
app.get("/users", (req: Request, res: Response) => {
    try {
        res.status(200).send(users)
    }
    catch (error) {
        if (res.statusCode === 200) {
            res.statusCode = 500
        }
        res.send(error instanceof Error)
    }
})

//Pegando todos os produtos: 
app.get("/products", (req: Request, res: Response) => {
    try {
        const nameToFind = req.query.name as string

        if (nameToFind !== undefined) {
            if (nameToFind.length < 1) {
                res.statusCode = 400
                throw new Error("'nameToFind', precisa de mais de 1 caractere.")
            }
            const result: TProducts[] = products.filter((product) => {
                return product.name.toLowerCase().includes(nameToFind.toLowerCase())
            })
            res.status(200).send(result)
        }
        res.status(200).send(products)
    }
    catch (error) {
        if (req.statusCode === 200) {
            res.status(500)
        }
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado.")
        }
    }

})


//Criando um novo usuário: 
app.post("/users", (req: Request, res: Response) => {
    try {

        const id = req.body.id as string | number
        const name = req.body.name as string
        const email = req.body.email as string
        const password = req.body.password as string | number

        const newUser: TUser = {
            id,
            name,
            email,
            password,
            createdAt: new Date().toISOString(),
        }


        if (id === undefined || name === undefined || email === undefined) {
            res.statusCode = 400
            throw new Error("'Error!!', id, name e email devem ser declarados.")
        }


        if (typeof id !== "string") {
            res.statusCode = 400
            throw new Error("'id' deve ser uma string")
        }


        if (id[0] !== "u") {
            res.statusCode = 400
            throw new Error("'id' deve começar com a letra 'u'")
        }


        const verifyId: TUser | undefined = users.find((user) => user.id === id);

        if (verifyId) {
            res.statusCode = 400
            throw new Error("Esse id já está sendo usado.")
        }

        const verifyEmail: TUser | undefined = users.find((user) => user.email === email);

        if (verifyEmail) {
            res.statusCode = 400
            throw new Error("Esse email já está sendo usado.")
        }

		
        if (password !== undefined) {

            // validamos que é uma string
          if (typeof password !== "string") {
                throw new Error("'password' deve ser uma string")
            }
        
            if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,12}$/g)) {
                throw new Error("'password' deve possuir entre 8 e 12 caracteres, com letras maiúsculas e minúsculas e no mínimo um número e um caractere especial")
            }
        }



        users.push(newUser)

        res.status(201).send("Usuário registrado com sucesso")
    }
    catch (error) {
        if (req.statusCode === 200) {
            res.status(500)
        }
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado.")
        }
    }

})


//Criando novos produtos:
app.post("/products", (req: Request, res: Response) => {
    try{
    
    const id = req.body.id as string | number
    const name = req.body.name as string
    const price = req.body.price as number
    const description = req.body.description as string
    const imageUrl = req.body.imageUrl as string

    if (id === undefined || name === undefined || price === undefined || description === undefined || imageUrl === undefined) {
        res.statusCode = 400
        throw new Error("Produto não existente.")
    }

    const newProduct: TProducts = {
        id,
        name,
        price,
        description,
        imageUrl
    }

    const verifyId: TProducts | undefined = products.find((product) => product.id === id);

    if (verifyId !== undefined) {
        res.statusCode = 400
        throw new Error("Esse 'id' já está sendo usado.")
    }

    if(typeof name !== "string"){
        res.statusCode = 400
        throw new Error("'name' deve ser uma string.")
    }

    if(name.length < 2 ){
        res.statusCode = 400
        throw new Error("'name' precisa ter pelo menos 2 caracteres.")
    }

    if(typeof price !== "number"){
        res.statusCode = 400
        throw new Error("'price' deve ser um number.")
    }

    if(typeof description !== "string"){
        res.statusCode = 400
        throw new Error("'description' deve ser uma string.")
    }

    if(typeof imageUrl !== "string"){
        res.statusCode = 400
        throw new Error("'imageUrl' deve ser um number.")
    }

    products.push(newProduct)

    res.status(201).send("Produto registrado com sucesso")
    }    catch (error) {
        if (req.statusCode === 200) {
            res.status(500)
        }
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado.")
        }
    }
    
})


//Delete User
app.delete("/users/:id", (req: Request, res: Response) => {
    try{
        const idToDelete = req.params.id

        const accountIndex = users.findIndex((user) => user.id === idToDelete)
    
    
        if (accountIndex < 0) {
            res.statusCode = 404
            throw new Error("Usuário não encontrado.")
        }

        if (accountIndex >= 0) {
            users.splice(accountIndex, 1)
        }
    
        res.send("User apagado com sucesso!")
    }
    catch (error) {
        if (req.statusCode === 200) {
            res.status(500)
        }
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado.")
        }
    }
    
})


//Delete Products
app.delete("/products/:id", (req: Request, res: Response) => {
   try{
    const idToDelete = req.params.id

    const accountIndex = products.findIndex((product) => product.id === idToDelete)


    if (accountIndex < 0) {
        res.statusCode = 404
        throw new Error("Produto não encontrado.")
    }

    if (accountIndex >= 0) {
        products.splice(accountIndex, 1)
    }

    res.send("Produto apagado com sucesso!")

   }
   catch (error) {
    if (req.statusCode === 200) {
        res.status(500)
    }
    if (error instanceof Error) {
        res.send(error.message)
    } else {
        res.send("Erro inesperado.")
    }
    }
})


//Edit Products
app.put("/products/:id", (req: Request, res: Response) => {
    
    try{

    //Recebendo o id:
    const idToEdit = req.params.id

    const accountIndex = products.findIndex((product) => product.id === idToEdit)

    if (accountIndex === undefined) {
        res.statusCode = 404
        throw new Error("Produto não encontrado.")
    }

    const { id, name, price, description, imageUrl} = req.body

    if(id === undefined){
        if(typeof id === "string"){
            res.statusCode = 400;
            throw new Error("'id' deve ser string.")
        }
    }
    if(name === undefined){
        if(typeof name === "string"){
            res.statusCode = 400;
            throw new Error("'name' deve ser string.")
        }
    }
    if(price === undefined){
        if(typeof price === "number"){
            res.statusCode = 400;
            throw new Error("'price' deve ser um number.")
        }
    }
    if(description === undefined){
        if(typeof description === "string"){
            res.statusCode = 400;
            throw new Error("'description' deve ser string.")
        }
    }
    if(imageUrl === undefined){
        if(typeof imageUrl === "string"){
            res.statusCode = 400;
            throw new Error("'imageUrl' deve ser string.")
        }
    }

    const result = products.find((product) => product.id === idToEdit)

    if (result) {
        result.id = id || result.id
        result.name = name || result.name
        result.price = isNaN(Number(price)) ? result.price : price as number
        result.description = description || result.description
        result.imageUrl = imageUrl || result.imageUrl
        res.status(200).send("Produto atualizado com sucesso!")
    }

}
catch (error) {
    if (req.statusCode === 200) {
        res.status(500)
    }
    if (error instanceof Error) {
        res.send(error.message)
    } else {
        res.send("Erro inesperado.")
    }
}
})
