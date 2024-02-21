const express = require('express');
const app = express();
app.use(express.json());
const server=  [];
const { Prisma, PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

 

app.get('/projetos', async (req,res) => {

    const posts = await prisma.post.findMany({include:{author:true}});

    return res.json(posts)
});

app.post('/usuario', async(req,res) =>{
    const result = await prisma.user.create({data: req.body});
    return res.json(result);
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

app.put('/projetos/:id', (req,res) => {
    for (let index = 0; index < server.length; index++) {
        if (server[index]?.id===Number(req.params?.id)){
        server[index] = {...server[index],... req?.body}
        return res.json(server[index]);
    }
        
    }

    return res.status(404).json()
});

app.delete('/projetos/:id', (req,res) => {
    for (let index = 0; index < server.length; index++) {
        if (server[index]?.id===Number(req.params?.id)){
        server.pop(index)
        return res.status(204).json()
    }
        
    }

    return res.status(404).json()
});

app.listen(3000, () => {
    console.log("Servidor esta funcionando");
});