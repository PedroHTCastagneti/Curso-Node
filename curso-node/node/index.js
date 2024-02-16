const express = require('express');
const app = express();
app.use(express.json());

app.get('/projetos', (req,res) => {
    return res.json({
        name:"Projeto 1",
        owner:"Pedro"
    });
});

app.post('/projetos', (req,res) => {

    console.log(req.body)
    return res.json({
        mensagem:"ola",
        name: req.body.name ,
        owner: req.body.owner
    });

});

app.put('/projetos/:id', (req,res) => {
    console.log(req.body);
    return res.json({
        mensagem:"isnira uma rota",
    });
});

app.delete('/projetos/:id', (req,res) => {
    console.log(req.params);
    return res.json({
        mensagem:"delete",
    });
});

app.listen(3000, () => {
    console.log("Servidor esta funcionando");
});