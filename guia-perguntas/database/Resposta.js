Sequelezie = require('sequelize')
connection = require('./database')

const Resposta = connection.define('respostas', {
    corpo: {
        type: Sequelezie.TEXT,
        allowNull: false
    },
    perguntaId: {
        type: Sequelezie.INTEGER,
        allowNull: false
    }
});
Resposta.sync({ force: false }).then(() => {
})
module.exports = Resposta;