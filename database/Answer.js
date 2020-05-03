const Sequelize = require('sequelize')
const connection = require('./database') 

const Answer = connection.define('resposta', {
    body: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    questionId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

Answer.sync({foce: false}).then(() => {
    console.log('Tabela de respostas criada com sucesso! ')
})

module.exports = Answer