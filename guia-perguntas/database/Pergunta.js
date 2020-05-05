Sequelezie = require('sequelize')
connection = require('./database')

const Pergunta = connection.define('perguntas', {
    titulo: {
        type: Sequelezie.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelezie.TEXT,
        allowNull: false
    }
});

Pergunta.sync({ force: false }).then(() => {
})

module.exports = Pergunta;
