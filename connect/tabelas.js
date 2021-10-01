class Tabelas {
    init(conexao) {
        console.log('Tabelas chamadas')
        this.conexao = conexao;
        this.criarAtendimentos()
    }    
    criarAtendimentos(){
        const sql = 'CREATE TABLE IF NOT EXISTS atendimentos (id int NOT NULL AUTO_INCREMENT, ' 
            + 'cliente VARCHAR(255) NOT NULL, ' 
            + 'pet VARCHAR(255), ' 
            + 'servico VARCHAR(255), '
            + 'status VARCHAR(255) NOT NULL, ' 
            + 'observacoes text, PRIMARY KEY(id))'
        this.conexao.query(sql, (erro) => {
            if (!erro) {
                console.log('tabela atendimentos criada com sucesso')
                return '';
            }
            console.log(erro)
        })
    }
}

module.exports = new Tabelas;
