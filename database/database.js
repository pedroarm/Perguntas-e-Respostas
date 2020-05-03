const Sequelize = require('sequelize')

const connection = new Sequelize('guiaperguntas', 'pedro0735', 'p5kseasus', {
    host: 'mysql669.umbler.com',
    port: '41890',
    dialect: 'mysql'
})

module.exports = connection;