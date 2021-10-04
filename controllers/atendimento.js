const atendimento = require('../models/atendimentos');
module.exports = app => {
    app.get('/atendimento', (req, res) => {
        atendimento.listar(res)
    })
    app.get('/atendimento/:id', (req, res) => {
        const id = parseInt(req.params.id)
        atendimento.listarId(id, res)
    })
    app.post('/atendimento', (req, res) => {
        const request = req.body
        atendimento.adicionar(request, res)
    })
    app.patch('/atendimento/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const request = req.body
        atendimento.editar(id, request, res)
    })
    app.delete('/atendimento/:id', (req, res) => {
        const id = parseInt(req.params.id)
        atendimento.deletar(id, res)
    })
}
