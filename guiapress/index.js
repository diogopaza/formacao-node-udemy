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
    Article.findAll({
        order:[
            ['id','desc']
        ]
    }).then(articles=>{
        Category.findAll().then(categories=>{
            res.render("index", {articles: articles, categories: categories})
        })        
    })    
})
app.get('/:slug',(req,res)=>{
    slug = req.params.slug
    Article.findOne({
        where:{
            slug:slug
        }
    }).then(article=>{
        if(article != undefined){
            Category.findAll().then(categories=>{
                res.render("article", {article: article, categories: categories})
            })        
            
        }else{
            res.redirect("/")
        }
    }).catch( err =>{
        res.redirect("/")
    })
})
app.get('/category/:slug',(req,res)=>{
    slug = req.params.slug
    Category.findOne({
        where:{
            slug:slug
        },
        include:[{model:Article}]
    }).then(category =>{
        if(category != undefined){
              Category.findAll().then(categories=>{
                  res.render("index",{ articles: category.articles, categories:categories} )
              })          
        }else{
            res.redirect("/")
        }
    }).catch(err=>{
        res.redirect("/")
    })
})

app.listen(4000, ()=>{
    console.log("servidor está rodando")
})
