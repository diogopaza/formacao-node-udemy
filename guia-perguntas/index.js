express = require('express');
bodyparser = require('body-parser');
connection = require('./database/database')
perguntaModel = require('./database/Pergunta')
respostaModel = require('./database/Resposta')
//Database
connection
    .authenticate()
    .then(() => {
        console.log("Conexao ao banco de dados realizada com sucesso")
    })
    .catch((msgErro) => {
        console.log(msgErro)
    })

app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.get('/', (req, res) => {
    perguntaModel.findAll({
        raw: true, order: [
            [
                'id', 'desc'
            ]
        ]
    }).then((perguntas) => {
        res.render("index", {
            perguntas: perguntas
        });
    })

})
app.get('/perguntar', (req, res) => {
    res.render('perguntar')
})
/*
app.get('/:nome/:lang', (req, res) => {
    var nome = req.params.nome;
    var lang = req.params.lang;
    res.render("index", {
        nome: nome,
        lang: lang,
        empresa: "Guia do Programador",
        inscritos: 8000
    });
})*/
app.post('/salvarpergunta', (req, res) => {
    titulo = req.body.titulo
    descricao = req.body.descricao
    console.log("dados" + titulo + "  " + descricao)
    perguntaModel.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("/")
    })
})
app.get('/pergunta/:id', (req, res) => {
    console.log("entrei pergunta")
    id = req.params.id
    perguntaModel.findOne({
        where: { id: id }
    }).then((pergunta) => {
        if (pergunta != undefined) {
            respostaModel.findAll({
                raw: true,
                where: { perguntaId: pergunta.id },
                order: [
                    ['id', 'desc']
                ]
            }).then((respostas) => {

                res.render("pergunta", {
                    pergunta: pergunta,
                    respostas: respostas
                });
            })
        } else {
            res.redirect("/")
        }
    })

})
app.post('/responder', (req, res) => {
    corpo = req.body.corpo
    perguntaId = req.body.pergunta
    respostaModel.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect('/pergunta/' + perguntaId)
    })

})


app.listen('3000', () => {
    console.log("servidor rodando");
})