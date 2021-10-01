const conexao = require('../connect/conexao');

class Atendimento {
    adicionar(atendimento) {
        const sql = 'INSERT INTO atendimentos SET ?'
        conexao.query(sql, atendimento, (erro, resultado) => {
            if (!erro) {
                console.log(resultado)
                return '';
            }
            console.log(erro)
        })
    }
}

module.exports = new Atendimento;