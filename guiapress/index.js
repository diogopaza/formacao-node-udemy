const express = require('express');
const bodyParser = require('body-parser')
const connection = require('./database/database')

const categoriesController = require('./categories/CategoriesController')
const articlesController = require('./articles/ArticlesController')

const Article = require('./articles/Article')
const Category = require('./categories/Category')

const app = express();
app.set('view engine','ejs')

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(express.static('public'))

connection
    .authenticate()
    .then(()=>{
        console.log("Conexao efetuada com sucesso")
    }).catch((error)=>{
        console.log(error)
    })
/*o primeiro campo é o prefixo, ele vai somar com a outra rota*/
app.use("/", categoriesController)
app.use("/", articlesController)

app.get('/',(req,res)=>{
    res.render("index")
})

app.listen(3000, ()=>{
    console.log("servidor está rodando")
})
