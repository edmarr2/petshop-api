const atendimento = require('../models/atendimentos');
module.exports = app => {
    app.get('/atendimento', (req, res) => res.send('atendimento'))
    app.post('/atendimento', (req, res) => {
        const request = req.body
        atendimento.adicionar(request)
        res.send(`atendimento`)})
}
