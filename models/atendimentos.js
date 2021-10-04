const conexao = require('../connect/conexao');
const moment = require('moment');

class Atendimento {
    adicionar(atendimento, res) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss')
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')
        
        const dataValida = moment(data).isSameOrAfter(dataCriacao)
        const clienteValido = atendimento.cliente.length >= 5;


        const validacoes = [
            { 
                nome: 'data',
                valido: dataValida,
                mensagem: 'Data deve ser maior ou igual a data atual'
            },
            { 
                nome: 'cliente',
                valido: clienteValido,
                mensagem: 'O cliente deve ter pelo menos 5 caracteres'
            },
        ]

        const erros = validacoes.filter(campo => !campo.valido)
        const existemErros = erros.length

        if (!existemErros) {
            const atendimentoDatado = {...atendimento, dataCriacao, data}
            const sql = 'INSERT INTO atendimentos SET ?'

            conexao.query(sql, atendimentoDatado, (erro, resultado) => {
                if (!erro) {
                    return res.status(201).json(resultado);
                }
                res.status(400).json(erro)
            })
            return;
        }

        return res.status(400).json(erros)
    }

    listar(res) {
        const sql = 'SELECT * FROM atendimentos'
        conexao.query(sql, (erro, resultado) => {
            if (!erro) {
                return res.status(201).json(resultado);
            }
            res.status(400).json(erro)
        })
    }

    listarId(id, res) {
        const sql = `SELECT * FROM atendimentos WHERE id =${id}`
        conexao.query(sql, (erro, resultado) => {
            if (!erro) {
                const atendimento = resultado[0] 

                return res.status(201).json(atendimento);
            }
            res.status(400).json(erro)
        })
    }

    editar(id, atendimento, res) {
        if (atendimento.data) {
            atendimento.data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')
        }
        const sql = 'UPDATE atendimentos SET ? WHERE id=?'
        conexao.query(sql, [atendimento, id], (erro, resultado) => {
            if (!erro) {
                return res.status(200).json(resultado);
            }
            res.status(400).json(erro)
        })
    }

    deletar(id, res) {
        const sql = `DELETE FROM atendimentos WHERE id=${id}`
        conexao.query(sql, (erro, resultado) => {
            if (!erro) {
                return res.status(200).json(resultado);
            }
            res.status(400).json(erro)
        })
    }
}

module.exports = new Atendimento;