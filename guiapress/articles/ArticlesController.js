const express = require('express');
const router = express.Router();
const Category = require('../categories/Category')
const Article = require('./Article')
const slugfy = require('slugify')

router.get('/admin/articles', (req, res) => {
    Article.findAll({
        include: [{ model: Category }]
    }).then(articles => {
        res.render("admin/articles/index", { articles: articles })
    })
})

router.get('/admin/articles/new', (req, res) => {
    Category.findAll().then(categories => {
        res.render("admin/articles/new", { categories: categories })
    })
})
router.post('/articles/save', (req, res) => {
    title = req.body.title;
    body = req.body.body
    category = req.body.category
    Article.create({
        title: title,
        body: body,
        slug: slugfy(title),
        categoryId: category
    }).then(() => {
        res.redirect("/admin/articles")
    })
})
router.post('/articles/delete', (req, res) => {
    var id = req.body.id;
    if (id != undefined) {
        if (!isNaN(id)) {
            Article.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect('/admin/articles')
            })
        } else {
            res.redirect('/admin/articles')
        }
    } else {
        res.redirect('/admin/articles')
    }
})
router.get('/admin/articles/edit/:id', (req, res) => {
    id = req.params.id
    Article.findOne({
        where: {
            id: id
        },
        include: [{ model: Category }]
    }).then(article => {
        Category.findAll().then(categories => {
            if (article != undefined) {
                res.render("admin/articles/edit", { categories: categories, article: article, cont: true })
            } else {
                res.redirect("/")
            }

        }).catch(err => {
            res.redirect("/")
        })
    })
})
router.post("/articles/update", (req, res) => {
    id = req.body.id
    title = req.body.title
    body = req.body.body
    category = req.body.category
    console.log(id + " " + title + " " + body + " " + category + " ")
    Article.update({
        title: title,
        body: body,
        categoryId: category,
        slug: slugfy(title)
    },
        {
            where: {
                id: id
            }
        }).then(() => {
            console.log("entrei atualizar article")
            res.redirect("/admin/articles")
        }).catch(err => {
            console.log("erro ao atualizar article")
            res.redirect("/")
        })
})
router.get('/articles/page/:num', (req, res) => {
    page = req.params.num
    if (isNaN(page)) {
        offset = 0;
    } else {
        offset = parseInt(page) * 4;
    }
    Article.findAndCountAll({
        limit: 4,
        offset: offset
    }).then(articles => {
        var next;
        if ((offset + 4) >= articles.count) {
            next = false
        } else {
            next = true
        }
        result = {
            next: next,
            articles: articles
        }
        res.json(result)
    })
})


module.exports = router