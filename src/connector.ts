import {
  Client,
  ConnectorInterface,
  Invoice,
  ConfigDatabaseInterface,
  PaginationInterface,
} from "sdz-agent-types";
const informix = require("informixdb");

let informixConnect: any;
export default class Connector implements ConnectorInterface {
  private dsn: any;
  constructor(config: ConfigDatabaseInterface) {
    this.dsn = `SERVER=${config.server};DATABASE=${config.collation};HOST=${config.host};SERVICE=${config.port};UID=${config.username};PWD=${config.password};`;
  }
  connect() {
    if (!informixConnect) {
      try {
        informixConnect = informix.openSync(this.dsn);
      } catch (e) {
        console.log(e);
      }
    }
  }

  execute(
    type: string,
    pagination: PaginationInterface
  ): Promise<Client[] | Invoice[]> {
    let resultSet;
    if (!informixConnect) {
      this.connect();
    }
    const page = pagination.page - 1;
    const limit = pagination.limit;
    const skip = page * limit;

    switch (type) {
      case "invoices":
        resultSet = informixConnect.querySync(
          "SELECT * FROM informix.flags_text " + `skip ${skip}, limit ${limit}`
        );
        break;
      case "clients":
        resultSet = informixConnect.querySync(
          "Select  fil.cgccpf as cnpjOrigemDados, cast(current as date) as dataCadastro, cast(current as date) as dataAtualizacao, " +
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
            `skip ${skip}, limit ${limit}`
        );
        break;
    }

    informixConnect.closeSync();

    return resultSet;
  }
}
