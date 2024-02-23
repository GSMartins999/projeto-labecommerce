import express from 'express';
import { Request, Response } from "express";
import cors from "cors";
import { TProduct, TPurchase, TUser } from "./types";
import {db} from "./database/knex";


const app = express();
app.use(express.json());
app.use(cors());

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
})

//Pegando todos os usuários: 
app.get("/users", async (req: Request, res: Response) => {
    try {
    const usuarios: Array<TUser> = await db("users");    
      res.status(200).send(usuarios);
      
    } catch (error) {
      console.log(error);
      if (res.statusCode === 200) {
        res.status(500);
      }
      if (error instanceof Error) {
        res.send(error.message);
      } else {
        res.send("Erro inesperado.");
      }
    }
  });

//Criando um novo usuário:
  app.post("/users", async (req: Request, res: Response) => {
    try {
      const {id, name, email, password} = req.body;
  
      if(id === undefined || name === undefined || email === undefined || password === undefined){
        res.status(400);
        throw new Error ("O body precisa ter todos esses atributos: 'id', 'name', 'email' e 'password'")
      }
  
      if (id !== undefined){
        if(typeof id !== "string"){
          res.statusCode = 400;
          throw new Error('O atributo "id" deve ser uma string');
        }
        if(id[0] !== "u"){
          res.statusCode = 400;
          throw new Error("O 'id' do usuário deve começar com a letra 'u'");
        }
        if(typeof name !== "string"){
          res.statusCode = 400;
          throw new Error ("O 'name' do usuário deve ser uma string");
        }
        if(name.length < 2){
          res.statusCode=400;
          throw new Error("O 'name' do usuário deve conter no mínimo 2 caracteres");
        }
        if(typeof email !== "string"){
          res.statusCode = 400;
          throw new Error ("O 'email' do usuário deve ser uma 'string'");
        }
        if(typeof password !== "string"){
          res.statusCode = 400;
          throw new Error ("O 'password' do usuário deve ser uma 'string'");
        }
      }
      const data = new Date().toISOString();
  
      const newUser = {
        id: id,
        name: name,
        email: email,
        password: password,
        created_at: data
      }
  
      await db("users").insert(newUser);
      res.status(201).send("Cadastro do usuário realizado com sucesso!");
    } catch (error) {
        if (res.statusCode === 200) {
          res.status(500);
        }
        if (error instanceof Error) {
          res.send(error.message);
        } else {
          res.send("Erro inesperado.");
        }
      }
    });


// //Pegando todos os produtos: 
app.get("/products", async (req: Request, res: Response) => {
    try {
      const productToFind = req.query.name as string;
  
      if (productToFind !== undefined) {
        if (productToFind.length < 1) {
          res.status(400);
          throw new Error ("A busca deve ter ao menos um caractere")
        }
  
        const search: Array<TProduct> | undefined = await db(`products`).where("name", "LIKE", `%${productToFind}`);
        
        return res.status(200).send(search);
      }
  
      const products: Array<TProduct> | undefined = await db("products");
      res.status(200).send(products);
      
    } catch (error) {
      if (res.statusCode === 200) {
        res.status(500);
      }
      if (error instanceof Error) {
        res.send(error.message);
      } else {
        res.send("Erro inesperado.");
      }
    }
  });
  




// //Criando novos produtos:
app.post("/products", async (req: Request, res: Response) => {
    try {
      const {id, name, price,description, imageUrl} = req.body;
  
      if(id === undefined || name === undefined || price === undefined || description === undefined || imageUrl === undefined) {
        res.status(400);
        throw new Error("O body do product precisa ter todos esses atributos: 'id', 'name', 'price', 'description', 'imageUrl'");
      }
  
      if(id !== undefined){
        if(typeof id !== "string"){
          res.status(400)
          throw new Error ("'Id' precisa ser uma string")
        }}
  
        if(!id.includes("prod")){
          res.status(400)
          throw new Error("O id deve começar com a letra 'p'")
        }
  
      if(typeof name !== 'string'){
        res.status(400)
        throw new Error("'name' deve ser do tipo string")
      }
  
      if(name.length < 2) {
        res.status(400);
        throw new Error("Nome deve ter mais de 2 caracteres");
      }
  
      if(typeof price !== 'number'){
        res.status(400);
        throw new Error("'price' deve ser do tipo number")
      }
      if(typeof description !== 'string'){
        res.status(400);
        throw new Error("'description' deve ser do tipo string")
      }
  
      if(typeof imageUrl !== 'string'){
        res.status(400);
        throw new Error("'imageUrl' deve ser do tipo string")
      }
  
      const [idProductsExist]: TProduct[] | undefined[] = await db("products").where({id})
  
      if (idProductsExist) {
        res.status(400)
        throw new Error(
          "Já existe um product com esse id. Cadastre com outro id."
        )
      }
  
      const newProduct: TProduct = {
        id,
        name,
        price,
        description,
        imageUrl
      };
  
      await db("products").insert(newProduct);
      res.status(201).send("Produto cadastrado com sucesso!");
  
    } catch (error) {
      if (res.statusCode === 200) {
        res.status(500);
      }
      if (error instanceof Error) {
        res.send(error.message);
      } else {
        res.send("Erro inesperado.");
      }
    }
  });
  


  //Deletando um user
  app.delete("/users/:id", async (req: Request, res: Response) => {
    try {
      const userToDelete: string = req.params.id;
  
      const [user] = await db("users")
      
      if (!user) {
        res.status(404);
        throw new Error("Produto não encontrado, digite um id válido!");
      }
  
      await db("users").del().where({id: userToDelete}); 
      res.status(200).send("Usuário apagado com sucesso!");
      
    } catch (error) {
      if (res.statusCode === 200) {
        res.status(500);
      }
      if (error instanceof Error) {
        res.send(error.message);
      } else {
        res.send("Erro inesperado.");
      }
    }
  });


  //Deletando um product
  app.delete("/products/:id", async (req: Request, res: Response) => {
    try {
      const productToDelete: string = req.params.id;
  
      const [product] = await db.raw(`SELECT * from products;`)

      if (!product) {
        res.status(404);
        throw new Error("Produto não encontrado, digite um id válido!");
      }
  
      await db.raw(`
      DELETE FROM products
      WHERE
      id = '${productToDelete}'
      `);   
      res.status(200).send("Produto apagado com sucesso!");
  
    } catch (error) {
      if (res.statusCode === 200) {
        res.status(500);
      }
      if (error instanceof Error) {
        res.send(error.message);
      } else {
        res.send("Erro inesperado.");
      }
    }
  });
  


// //Edit Products
app.put("/products/:id", async (req: Request, res: Response) => {
    try {
      const productToEdit = req.params.id;
  
      const {id, name, price, description, imageUrl} = req.body;
      
      const [product] = await db.raw(`SELECT * FROM products WHERE id ='${productToEdit}'`)
  
      if (product === undefined) {
        res.status(404);
        throw new Error("Não foi possível editar o produto, ID não encontrado");
      } 
  
      if(id !== undefined){
        if(typeof id !== 'string'){
          res.status(400);
          throw new Error("'id' deve ser do tipo string")
        }
      }
      if(name !== undefined){
        if(typeof name !== 'string'){
          res.status(400);
          throw new Error("'name' deve ser do tipo string")
        }
      }
      if(price !== undefined){
        if(typeof price !== 'number'){
          res.status(400);
          throw new Error("'price' deve ser do tipo number")
        }
      }
      if(description !== undefined){
        if(typeof description !== 'string'){
          res.status(400);
          throw new Error("'description' deve ser do tipo string")
        }
      }
      if(imageUrl !== undefined){
        if(typeof imageUrl !== 'string'){
          res.status(400);
          throw new Error("'imageUrl' deve ser do tipo string")
        }
      }  
      
        const updatedProduct: TProduct = {
        id : id || product.id,
        name : name || product.name,
        description : description || product.description,
        imageUrl : imageUrl || product.imageUrl,
        price : price || product.price}
  
      await db.update(updatedProduct).from("products").where({ id: productToEdit });
      res.status(200).send("Atualização dos dados realizada com sucesso!");
  
    } catch (error) {
      if (res.statusCode === 200) {
        res.status(500);
      }
      if (error instanceof Error) {
        res.send(error.message);
      } else {
        res.send("Erro inesperado.");
      }
    }
  });




/////////////////////////Purchases//////////////////////////////////



//Get all purchases
app.get("/purchases", async (req: Request, res: Response) => {
    try {
      const [users_products]: TPurchase[] = await db("purchases");
      res.status(200).send(users_products);
    } catch (error) {
      if (res.statusCode === 200) {
        res.status(500);
      }
      if (error instanceof Error) {
        res.send(error.message);
      } else {
        res.send("Erro inesperado.");
      }
    }
  });




  //Get purchases por id
  app.get("/purchases/:id", async (req: Request, res: Response) => {
    try {
      const idToSearch: string = req.params.id;
      const [purchase] = await db
        .select(
          "purchases.id AS purchaseId",
          "purchases.buyer AS buyerId",
          "users.name AS buyerName",
          "users.email AS buyerEmail",
          "purchases.total_price AS totalPrice",
          "purchases.created_at AS createdAt"
        )
        .from("purchases")
        .join("users", "purchases.buyer", "=", "users.id")
        .where({ "purchases.id": idToSearch });
  
      const listPurchasesProducts = await db
        .select("*")
        .from("purchases_products")
        .join("products", "purchases_products.product_id", "=", "products.id");
  
      const listPurchase = {
        purchaseId: purchase.purchaseId,
        buyerId: purchase.buyerId,
        buyerName: purchase.buyerName,
        buyerEmail: purchase.buyerEmail,
        totalPrice: purchase.totalPrice,
        createdAt: purchase.createdAt,
        products: listPurchasesProducts,
      };
  
      res.status(200).send(listPurchase);
    } catch (error) {
      if (res.statusCode === 200) {
        res.status(500);
      }
      if (error instanceof Error) {
        res.send(error.message);
      } else {
        res.send("Erro inesperado.");
      }
    }
  });



  //Post purchases
  app.post("/purchases", async (req: Request, res: Response) => {
    try{
      const { id, buyer, products } = req.body;
  
      if(!id || !buyer ){
        res.statusCode = 400;
        throw new Error("'id' - 'buyer' - 'total_price' são obrigatorios, não podem ser omitidos");
      }
      if(typeof id !== "string"){
        res.statusCode = 400;
        throw new Error("'id' - deve ser enviado no formato string");
      }
      if(typeof buyer !== "string"){
        res.statusCode = 400;
        throw new Error("'buyer' - deve ser enviado no formato string");
      }
      if(!products){
        res.statusCode = 400;
        throw new Error("'products', não pode ser omitido");
      }
      if(!Array.isArray(products)){
        res.statusCode = 400;
        throw new Error("'products', deve ser enviado no formato de array products: [ ],");
      }
  
      const [idCompra] = await db.select("*").from("purchases").where({id: id})
  
      if(idCompra){
        res.statusCode = 400;
        throw new Error("'id' - ja existe, favor conferir os dados");
      }
  
      const idProducts = products.map(async (item) => {
        return await db.select("*").from("products").where({id: item.id});
      });
      const prod = await Promise.all(idProducts);   
  
      const flatProducts = prod.flat(); //estabiliza em um unico array de objetos
  
      const totalPrice = flatProducts.reduce((acc, atual)=> acc + atual.price, 0);
  
      const insertData = flatProducts.map((prd: TProduct)=>({
        purchases_id: id,
        product_id: prd.id,
        quantity: products.find((item) => item.id === prd.id)?.quantity || 1
      }));
  
      await db.insert({
        id,
        buyer,
        total_price: totalPrice
      }).from("purchases");    
  
      await db.transaction(async (tr) => {
        for (const item of insertData) {
          await tr.insert({
            purchase_id: item.purchases_id,
            product_id: item.product_id,
            quantity: item.quantity
          }).into("purchases_products");
        }
      });
  
      res.status(200).send("Pedido realizado com sucesso");
    }catch (err) {
      if (res.statusCode === 200) {
        res.statusCode = 500;
      }
      if (err instanceof Error) {
        res.send(err.message);
      } else {
        res.send("Erro inesperado");
      }
    }
  });
  

  //Delete purchases
  app.delete("/purchases/:id", async (req: Request, res: Response) =>{
    try{
      const idToDelete:string = req.params.id;
      if(!idToDelete){
        res.statusCode = 404;
        throw new Error("'id' - não pode ser omitido");
      }
  
      const [compra] = await db.select("*").from("purchases").where({id: idToDelete});
  
      if(!compra){
        res.statusCode = 404;
        throw new Error("'id' - compra não existente, verificar 'id'");
      }
  
      await db.delete().from("purchases").where({id: idToDelete});
  
      res.status(200).send("Pedido cancelado com sucesso");
    }catch (err) {
      if (res.statusCode === 200) {
        res.statusCode = 500;
      }
      if (err instanceof Error) {
        res.send(err.message);
      } else {
        res.send("Erro inesperado");
      }
    }
  });