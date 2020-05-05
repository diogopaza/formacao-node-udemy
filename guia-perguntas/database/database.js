const Sequelezie = require('sequelize');

const connection = new Sequelezie('guiaperguntas','root','123',{
    host:'localhost',
    dialect:'mysql'
})

module.exports = connection