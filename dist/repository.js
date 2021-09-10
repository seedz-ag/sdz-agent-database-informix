"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Repository {
    constructor(connector) {
        this.connector = connector;
    }
    async getClients(pagination) {
        try {
            const page = pagination.page - 1;
            const limit = pagination.limit;
            const skip = page * limit;
            const query = "Select  fil.cgccpf as cnpjOrigemDados, cast(current as date) as dataCadastro, cast(current as date) as dataAtualizacao, " +
                " p.cgccpf as id, p.nomepessoa as razaoSocial, nvl(p.nomeguerra, '') as nomeFantasia, p.cgccpf as documento,  1 as situacaoFinanceira, e.celular, " +
                " e.fone as telefoneFixo, nvl(f.fone, '') as telefoneFixo2, nvl(e.endeletronic, '') as email, nvl(f.sexo, 'O') as sexo,  nvl(p.dtfundacao, ' ') as dataNascimento, " +
                " nvl(p.inscestadual, '') as inscEstadual, y.nomepais as pais, '' as nomeContato, nvl(p.nrocarteira, ' ') as rg, nvl(p.inscmunicip, ' ') as inscMunicipal, 0 as vendedor1, 0 as vendedor2, " +
                " '' as tipo, '' as grupo, cli.conceito as classe,  '' as site,  '' as grupoempresarial, nvl(e.inscprodutor, '') as car, nvl(i.simplesnacional, ' ') as simples, " +
                " nvl(i.icms, ' ') as conticms, 1 as recir, '' as origem, '' as regiao " +
                " from cipessoa p " +
                " inner join clclient cli " +
                " 	on cli.cgccpf = p.cgccpf " +
                " inner join cofilial fil " +
                " 	on fil.filial in (select min(filial) from cofilial) " +
                " inner join ciendere e " +
                " 	on e.tppessoa = p.tppessoa " +
                " and e.cgccpf = p.cgccpf " +
                " and e.ativo = 'S' " +
                " and e.principal = 'S' " +
                " inner join cicidect x " +
                " 	on x.cidade = e.cidade " +
                " inner join cipais y " +
                " 	on y.codpais = x.codpais " +
                " left outer join cicadfis f " +
                " 	on f.tppessoa = p.tppessoa " +
                " 	and f.cgccpf = p.cgccpf " +
                " left outer join ciisento i " +
                " 	on i.tppessoa = p.tppessoa " +
                " 	and i.cgccpf = p.cgccpf " +
                " where p.tppessoa in (1, 2) " +
                " order by p.nomepessoa " +
                ` SKIP ${skip} LIMIT ${limit}`;
            return this.connector.execute(query);
        }
        catch (e) { }
    }
    async getInvoices(pagination) {
        try {
            const page = pagination.page - 1;
            const limit = pagination.limit;
            const skip = page * limit;
            const query = `SELECT * FROM informix.clientes SKIP ${skip} LIMIT ${limit}`;
            return this.connector.execute(query);
        }
        catch (e) { }
    }
}
exports.default = Repository;
