const Sequelezie = require('sequelize');

const connection = new Sequelezie('guiaprojetos','root','123',{
    host:'localhost',
    dialect:'mysql',
    timezone:"-03:00"
})

module.exports = connection