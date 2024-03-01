const express = require('express');
const app = express();
app.use(express.json());
const server=  [];
const { Prisma, PrismaClient } = require('@prisma/client');
const { PrismaClientKnownRequestError } = require('@prisma/client/runtime/library');
const prisma = new PrismaClient();

 

app.get('/projetos', async (req,res) => {

    const posts = await prisma.post.findMany({include:{author:true}});

    return res.json(posts)
});

app.get('/projetosu/:id', async (req,res) => {
    
    const {id} = req.params
    const user = await prisma.user.findUnique({
        where: {id: Number(id)}
    });

    return res.json(user)
});

app.get('/projetosp/:id', async (req,res) => {

    const {id} = req.params
    const pst = await prisma.post.findUnique({
        where: {id: Number(id)}
    });

    return res.json(pst)
});





app.post('/usuario', async(req,res) =>{
    try {
        const result = await prisma.user.create({data: req.body});
        return res.json(result);
    }catch(error){
        if(error instanceof PrismaClientKnownRequestError){
            if(error.code==="P2002"){
                console.log("Erro de chave unica");
            }
        }
        console.log("Erro tratado");
        return res.status(400).json()
    }
});

app.post('/post', async (req, res) => {
    const { title, content,authorEmail} = req.body;
    const result = await prisma.post.create({
      data: {
        title,
        content,
        published: false,
        author: { connect: { email: authorEmail } },
      },
    })
    res.json(result)
  })




app.put('/projetop/:id', async (req,res) => {
    const {id} = req.params;
    const post = await prisma.post.update ({
        where: {id: Number(id)},
        data: {
            id: id= Number(id),
            title: req.body,
            content: req.body,
            published: req.body,
            author: { connect: { email: authorEmail } },
        },
    })

    return res.json(post)
});



app.delete('/projetodp/:id', async (req,res) => {

    const {id} = req.params
    const post = await prisma.post.delete({
        where: {
            id: Number(id)
        }
    })
    
    return res.json(post)
});

app.delete('/projetodu/:id', async (req,res) => {

    const {id} = req.params
    const post = await prisma.user.delete({
        where: {
            id: Number(id)
        }
    })
    
    return res.json(post)
});

app.listen(3000, () => {
    console.log("Servidor esta funcionando");
});