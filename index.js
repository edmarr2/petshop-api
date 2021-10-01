const customExpress = require('./config/customExpress')
const conexao = require('./connect/conexao')
const tabelas = require('./connect/tabelas')
const Tabelas = require('./connect/tabelas')
conexao.connect(erro => {
    if(!erro) {
        tabelas.init(conexao)
        
        const app = customExpress()
        app.listen(3000, () => console.log('Servidor rodando'))
        return ''
    }
    console.log(erro)
})

