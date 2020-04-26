express = require('express')

app = express()

app.listen(3000, (error) => {
    if (error) {
        console.log(error)
    }
    console.log("servidor rodando")
})

app.get('/', (req, res) => {
    res.send("servidor esta no /**")
})
app.get('/ola/:nome/:idade', (req, res) => {
    nome = req.params.nome
    idade = req.params.idade
    res.send("<h1>oi " +nome+" voce tem "+idade+" anos")
})
/*parametro nao obrigatorio*/
app.get('/blog/:artigo?', (req, res) => {
    artigo = req.params.artigo
    console.log(artigo)
    if(artigo != undefined){
        res.send("<h1> nome do artigo é "+artigo+"</h1>")
        return
    }
    res.send("estou no blog ")    
})
