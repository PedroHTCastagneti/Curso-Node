const express = require('express');
const app = express();
app.use(express.json());
const server=  [];

app.get('/projetos', (req,res) => {
    return res.json(
        server
    );
});

app.post('/projetos', (req,res) => {
    server.push(req.body);

    console.log(req.body)
    return res.json({
        mensagem:"ola",
        name: req.body.name ,
        owner: req.body.owner
    });

});

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