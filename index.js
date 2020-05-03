const express = require('express')
const app = express()
const bodyParser = require('body-parser')

// Tabela db
const Pergunta = require('./database/Question')
const Resposta = require('./database/Answer')

// Database
const connection = require('./database/database')

connection.authenticate().then(() => {
    console.log('conexão feita com sucesso!')
}).catch((msgErr) => {
    console.log(msgErr)
})

// Usar o EJS como view engine 
app.set('view engine', 'ejs')
app.use(express.static('public'))

// Body parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// Rotas
app.get("/", (req, res) => {

    Pergunta.findAll({ raw: true, order: [
        ['id','DESC']
    ] }).then(perguntas => {
        res.render("Home/index", {
            perguntas: perguntas
        })
    })
})

app.get("/perguntar", (req, res) => {
    res.render("Questions/index")
})

app.post("/savequestion", (req, res) => {

    var titulo = req.body.title
    var descricao = req.body.description

    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("/")
    })
})

app.get("/pergunta/:id", (req, res) => {

    var id = req.params.id

    Pergunta.findOne({
        where: {id: id}
    }).then(pergunta => {
         if(pergunta != undefined){

            Resposta.findAll({
                where: { questionId: pergunta.id },
                order: [
                    ['id','DESC']
                ] }).then(respostas => {
                res.render("Question/index", {
                    pergunta: pergunta,
                    respostas: respostas
                })
            })
         }else{
             res.redirect("/")
         }
    })
})

app.post("/responder", (req, res) => {

    var body = req.body.answer
    var questionId = req.body.pergunta

    Resposta.create({
        body: body,
        questionId: questionId
    }).then(() => {
        console.log("sucesso!")
        res.redirect("/pergunta/"+ questionId)
    }).catch((err) => {
        console.log('FALHA: '+ err)
    })
})

var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('Umbler listening on port %s', port);
});