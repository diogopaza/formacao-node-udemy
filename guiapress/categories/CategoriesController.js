const express = require('express');
const Category = require('./Category')
const slugfiy = require('slugify')
const router = express.Router();

router.get('/admin/categories/new',(req,res)=>{
    res.render('admin/categories/new')
})

router.post('/categories/save', (req, res) => {
    title = req.body.title;
    if (title != undefined) {
        Category.create({
            title: title,
            slug: slugfiy(title)
        }).then(() => {
            res.redirect("/")
        })
    } else {
        res.redirect('/admin/categories/new')
    }
})
router.get('/admin/categories',(req,res)=>{
    Category.findAll().then(categories=>{
        res.render('admin/categories/index',{categories: categories})
    })    
})

module.exports = router