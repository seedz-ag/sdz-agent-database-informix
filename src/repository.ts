import {
  Connector,
  DatabaseRow,
  PaginationInterface,
  RepositoryInterface,
} from "sdz-agent-types";

let query: string = "";

export default class Repository implements RepositoryInterface {
  private connector: Connector;
  constructor(connector: Connector) {
    this.connector = connector;
  }

  async getAddress(
    pagination: PaginationInterface,
    type: string
  ): Promise<DatabaseRow[]> {
    try {
      const page = pagination.page - 1;
      const limit = pagination.limit;
      const skip = page * limit;
      let query;
      switch (type) {
        case "T":
          query =
            "Select fil.cgccpf as cnpjOrigemDados,  e.nro_endere as id, cast(current as date) as dataCadastro, cast(current as date) as dataAtualizacao, " +
            "   e.cgccpf as idCliente, 0 as idPropriedade, e.cgccpf as documentoCliente, e.tipoendereco as tipo, e.cep, c.ufederacao as uf, c.nomecidade as municipio,  " +
            "   e.bairro, e.endereco as logradouro, 0 as numero, nvl(e.complemento, ' ') as complemento, d.codigoibge as codibge " +
            "      from  ciendere e " +
            "      inner join  clclient cli " +
            "        on cli.cgccpf = e.cgccpf " +
            "       and cli.tppessoa = e.tppessoa " +
            "      inner join cicidade c " +
            "        on  e.cidade =  c.cidade   " +
            "      inner join cicidect d " +
            "        on d.cidade 	=   e.cidade  " +
            "      inner join cofilial fil " +
            "        on fil.filial in (select min(filial) from cofilial) " +
            "      where e.tppessoa in (1,2) " +
            ` SKIP ${skip} LIMIT ${limit}`;
          break;
        default:
          query =
            "Select fil.cgccpf as cnpjOrigemDados,  e.nro_endere as id, cast(current as date) as dataCadastro, cast(current as date) as dataAtualizacao, " +
            "   e.cgccpf as idCliente, 0 as idPropriedade, e.cgccpf as documentoCliente, e.tipoendereco as tipo, e.cep, c.ufederacao as uf, c.nomecidade as municipio,  " +
            "   e.bairro, e.endereco as logradouro, 0 as numero, nvl(e.complemento, ' ') as complemento, d.codigoibge as codibge " +
            "      from  ciendere e " +
            "      inner join  clclient cli " +
            "        on cli.cgccpf = e.cgccpf " +
            "       and cli.tppessoa = e.tppessoa " +
            "      inner join cicidade c " +
            "        on  e.cidade =  c.cidade   " +
            "      inner join cicidect d " +
            "        on d.cidade 	=   e.cidade  " +
            "      inner join cofilial fil " +
            "        on fil.filial in (select min(filial) from cofilial) " +
            "      where e.tppessoa in (1,2) " +
            ` SKIP ${skip} LIMIT ${limit}`;
      }
      return this.connector.execute(query);
    } catch (e) {}
  }
  async getProperty(
    pagination: PaginationInterface,
    type: string
  ): Promise<DatabaseRow[]> {
    try {
      const page = pagination.page - 1;
      const limit = pagination.limit;
      const skip = page * limit;

      let query;
      switch (type) {
        case "T":
          query =
            "Select fil.cgccpf as cnpjOrigemDados, f.cgccpf || f.seqproprieagr as id, cast(current as date) as dataCadastro, cast(current as date) as dataAtualizacao, " +
            " f.cgccpf as idCliente, f.nompropr as razaoSocial, 0 as cnpj, '' as celular, '' as telefone, '' as inscestadual, '' as atividade, " +
            " f.vlrareapropr as tamanho, 'ha' as unidadeMedidaTamanho " +
            "  from ciproagr f, cofilial fil " +
            " where fil.filial in (select min(filial) from cofilial) " +
            ` SKIP ${skip} LIMIT ${limit}`;
          break;
        default:
          query =
            "Select fil.cgccpf as cnpjOrigemDados, f.cgccpf || f.seqproprieagr as id, cast(current as date) as dataCadastro, cast(current as date) as dataAtualizacao, " +
            " f.cgccpf as idCliente, f.nompropr as razaoSocial, 0 as cnpj, '' as celular, '' as telefone, '' as inscestadual, '' as atividade, " +
            " f.vlrareapropr as tamanho, 'ha' as unidadeMedidaTamanho " +
            "  from ciproagr f, cofilial fil " +
            " where fil.filial in (select min(filial) from cofilial) " +
            "      where e.tppessoa in (1,2) " +
            ` SKIP ${skip} LIMIT ${limit}`;
      }

      return this.connector.execute(query);
    } catch (e) {}
  }
  async getItem(
    pagination: PaginationInterface,
    type: string
  ): Promise<DatabaseRow[]> {
    try {
      const page = pagination.page - 1;
      const limit = pagination.limit;
      const skip = page * limit;

      let query;
      switch (type) {
        case "T":
          query =
            "Select fil.cgccpf as cnpjOrigemDados,p.produto as id, cast(current as date) as dataCadastro, cast(current as date) as dataAtualizacao," +
            "	 '' as SKU, p.descrprodut as descricao, nvl(m.marcaf, ' ') as branding, p.unidvenda as um, 'Produto' as tipo, p.listaforn as IdFornecedor," +
            "	 case nvl(e.dtdesativacao, 0) " +
            "			 when 0 then 1" +
            "			 else 0 " +
            "	 end as status, " +
            "		'ICMS' as tributacao, 0 as qtdDesconto, nvl(p.reffabrica, ' ') as codigoFabricante, l.descrlinha as segmento, " +
            "	 g.descrgrupo as grupo, 'Novo' as estado, ' ' as modelo, ' ' as detalhes, nvl(b.cean, ' ') as barras, 'Normal' as situacao, p.classe, " +
            "	 ' ' as cartela, 'Mobilidade' as nomeCaracteristica1, " +
            "	 case " +
            "			when t.tipogiro = 'A' then 'Alto Giro'" +
            "			when t.tipogiro = 'B' then 'Baixo Giro' " +
            "			when t.tipogiro = 'I' then 'Intermitente' " +
            "			when t.tipogiro = 'S' then 'Sem Giro' " +
            "			when t.tipogiro = 'V' then 'Veiculo'" +
            "		end as valorCaracteristica1," +
            "		 '' as NomeCaracteristica2, '' as valorCaracteristica2, '' as NomeCaracteristica3, '' as valorCaracteristica3," +
            "		 '' as NomeCaracteristica4, '' as valorCaracteristica4, '' as NomeCaracteristica5, '' as valorCaracteristica5," +
            "		 '' as NomeCaracteristica6, '' as valorCaracteristica6, '' as NomeCaracteristica7, '' as valorCaracteristica7 " +
            " from cmprodut p " +
            " inner join cmestoqu e	" +
            "	on p.produto = e.produto" +
            " and e.saldocontabil > 0 " +
            " inner join cofilial fil " +
            "	on fil.filial = e.filial" +
            " inner join cmgrupos g " +
            "	on p.id_grupos = g.id_grupos" +
            " inner join cmlinhas l " +
            "	on l.linha = g.linha" +
            " left outer join cffornec m" +
            "	on g.tppessoa = m.tppessoa" +
            "	 and g.cgccpf = m.cgccpf 		" +
            " left outer join cmclagir t " +
            "	on t.classeabc = e.classeabc" +
            "	and t.subclasse = e.subclasse " +
            "	and t.filial = e.filial " +
            " left outer join cmproean b " +
            "	on b.produto = p.produto " +
            " order by p.descrprodut		" +
            ` SKIP ${skip} LIMIT ${limit}`;
          break;
        default:
          query =
            "Select fil.cgccpf as cnpjOrigemDados,p.produto as id, cast(current as date) as dataCadastro, cast(current as date) as dataAtualizacao," +
            "	 '' as SKU, p.descrprodut as descricao, nvl(m.marcaf, ' ') as branding, p.unidvenda as um, 'Produto' as tipo, p.listaforn as IdFornecedor," +
            "	 case nvl(e.dtdesativacao, 0) " +
            "			 when 0 then 1" +
            "			 else 0 " +
            "	 end as status, " +
            "		'ICMS' as tributacao, 0 as qtdDesconto, nvl(p.reffabrica, ' ') as codigoFabricante, l.descrlinha as segmento, " +
            "	 g.descrgrupo as grupo, 'Novo' as estado, ' ' as modelo, ' ' as detalhes, nvl(b.cean, ' ') as barras, 'Normal' as situacao, p.classe, " +
            "	 ' ' as cartela, 'Mobilidade' as nomeCaracteristica1, " +
            "	 case " +
            "			when t.tipogiro = 'A' then 'Alto Giro'" +
            "			when t.tipogiro = 'B' then 'Baixo Giro' " +
            "			when t.tipogiro = 'I' then 'Intermitente' " +
            "			when t.tipogiro = 'S' then 'Sem Giro' " +
            "			when t.tipogiro = 'V' then 'Veiculo'" +
            "		end as valorCaracteristica1," +
            "		 '' as NomeCaracteristica2, '' as valorCaracteristica2, '' as NomeCaracteristica3, '' as valorCaracteristica3," +
            "		 '' as NomeCaracteristica4, '' as valorCaracteristica4, '' as NomeCaracteristica5, '' as valorCaracteristica5," +
            "		 '' as NomeCaracteristica6, '' as valorCaracteristica6, '' as NomeCaracteristica7, '' as valorCaracteristica7 " +
            " from cmprodut p " +
            " inner join cmestoqu e	" +
            "	on p.produto = e.produto" +
            " and e.saldocontabil > 0 " +
            " inner join cofilial fil " +
            "	on fil.filial = e.filial" +
            " inner join cmgrupos g " +
            "	on p.id_grupos = g.id_grupos" +
            " inner join cmlinhas l " +
            "	on l.linha = g.linha" +
            " left outer join cffornec m" +
            "	on g.tppessoa = m.tppessoa" +
            "	 and g.cgccpf = m.cgccpf 		" +
            " left outer join cmclagir t " +
            "	on t.classeabc = e.classeabc" +
            "	and t.subclasse = e.subclasse " +
            "	and t.filial = e.filial " +
            " left outer join cmproean b " +
            "	on b.produto = p.produto " +
            " order by p.descrprodut		" +
            ` SKIP ${skip} LIMIT ${limit}`;
      }

      return this.connector.execute(query);
    } catch (e) {}
  }
  async getItemBranding(
    pagination: PaginationInterface,
    type: string
  ): Promise<DatabaseRow[]> {
    try {
      const page = pagination.page - 1;
      const limit = pagination.limit;
      const skip = page * limit;

      let query;
      switch (type) {
        case "T":
          query =
            " Select * from ( " +
            " Select distinct fil.cgccpf as cnpjOrigemDados, cast(current as date) as dataCadastro, cast(current as date) as dataAtualizacao, " +
            "  a.cgccpf as id, nvl(a.marcaf, ' ') as descricao  " +
            "  from cffornec a, cmgrupos b, cofilial fil  " +
            " where a.tppessoa = b.tppessoa " +
            " and a.cgccpf= b.cgccpf  " +
            " and fil.filial in (select min(filial) from cofilial)  " +
            " and nvl(a.marcaf, ' ') <> ' ' " +
            "  union all	" +
            " select distinct fil.cgccpf as cnpjOrigemDados, cast(current as date) as dataCadastro, cast(current as date) as dataAtualizacao, " +
            "  a.cgccpf as id, nvl(a.marcaf, ' ') as descricao  " +
            "  from cffornec a, cxmodelo b, cofilial fil  " +
            " where a.tppessoa = b.tppessoa" +
            "  and a.cgccpf= b.cgccpf  " +
            "  and fil.filial in (select min(filial) from cofilial)  " +
            "  and nvl(a.marcaf, ' ') <> ' ' )" +
            ` SKIP ${skip} LIMIT ${limit}`;
          break;
        default:
          query =
            " Select * from ( " +
            " Select distinct fil.cgccpf as cnpjOrigemDados, cast(current as date) as dataCadastro, cast(current as date) as dataAtualizacao, " +
            "  a.cgccpf as id, nvl(a.marcaf, ' ') as descricao  " +
            "  from cffornec a, cmgrupos b, cofilial fil  " +
            " where a.tppessoa = b.tppessoa " +
            " and a.cgccpf= b.cgccpf  " +
            " and fil.filial in (select min(filial) from cofilial)  " +
            " and nvl(a.marcaf, ' ') <> ' ' " +
            "  union all	" +
            " select distinct fil.cgccpf as cnpjOrigemDados, cast(current as date) as dataCadastro, cast(current as date) as dataAtualizacao, " +
            "  a.cgccpf as id, nvl(a.marcaf, ' ') as descricao  " +
            "  from cffornec a, cxmodelo b, cofilial fil  " +
            " where a.tppessoa = b.tppessoa" +
            "  and a.cgccpf= b.cgccpf  " +
            "  and fil.filial in (select min(filial) from cofilial)  " +
            "  and nvl(a.marcaf, ' ') <> ' ' )" +
            ` SKIP ${skip} LIMIT ${limit}`;
      }

      return this.connector.execute(query);
    } catch (e) {}
  }
  async getItemGroup(
    pagination: PaginationInterface,
    type: string
  ): Promise<DatabaseRow[]> {
    try {
      const page = pagination.page - 1;
      const limit = pagination.limit;
      const skip = page * limit;

      let query;
      switch (type) {
        case "T":
          query =
            "Select  fil.cgccpf as cnpjOrigemDados,  current as dataCadastro, current as dataAtualizacao,  " +
            " a.id_grupos AS id, a.descrgrupo as descricao " +
            " from cmgrupos a, cofilial fil " +
            " where fil.filial in (select min(filial) from cofilial) " +
            " order by a.descrgrupo " +
            ` SKIP ${skip} LIMIT ${limit}`;
          break;
        default:
          query =
            "Select  fil.cgccpf as cnpjOrigemDados,  current as dataCadastro, current as dataAtualizacao,  " +
            " a.id_grupos AS id, a.descrgrupo as descricao " +
            " from cmgrupos a, cofilial fil " +
            " where fil.filial in (select min(filial) from cofilial) " +
            " order by a.descrgrupo " +
            ` SKIP ${skip} LIMIT ${limit}`;
      }

      return this.connector.execute(query);
    } catch (e) {}
  }
  async getRequest(
    pagination: PaginationInterface,
    type: string
  ): Promise<DatabaseRow[]> {
    try {
      const page = pagination.page - 1;
      const limit = pagination.limit;
      const skip = page * limit;

      let query;
      switch (type) {
        case "T":
          query =
            " select f.cgccpf as cnpjOrigemDadospedido, ' ' as regraNegocio, o.id_orccap as id,  current as dataCadastro, current as dataAtualizacao,  " +
            "          o.nroorcament as IdPedidoQion, o.dtorcament as dataEmissao, 0 as status, p.cgccpf as idCliente, p.cgccpf as documentocliente, " +
            " 	   f.cgccpf as documentoEmpresa, o.dtprevista as dataEntrega, 'Normal' as tipo, o.id_agente as vendedor1, 0 as vendedor2, " +
            " 	   0 as vendedor3,  o.descmerc as vlrDesconto, o.condpgto as condPagamento, 0 as VlrParcela1, ' ' as vencParcela1,  0 as VlrParcela2, " +
            " 	   ' ' as vencParcela2,  0 as VlrParcela3, ' ' as vencParcela3, 0 as VlrParcela4, ' ' as vencParcela4, 0 as VlrParcela5, ' ' as vencParcela5, " +
            " 	    0 as VlrParcela6, ' ' as vencParcela6, 0 as VlrParcela7, ' ' as vencParcela7, 0 as VlrParcela8, ' ' as vencParcela8, " +
            " 	   0 as VlrParcela9, ' ' as vencParcela9, o.valorfrete as vlrFrete " +
            "   from cnorccap o " +
            "  inner join ciendere e " +
            "     on e.nro_endere = o.nro_endere " +
            "     inner join cipessoa p " +
            "     on p.tppessoa = e.tppessoa " +
            "    and p.cgccpf   = e.cgccpf " +
            "  inner join cofilial f " +
            "     on f.filial = o.filial " +
            " where year(o.dtorcament) = year(current)" +
            ` SKIP ${skip} LIMIT ${limit}`;
          break;
        default:
          query =
            " select f.cgccpf as cnpjOrigemDadospedido, ' ' as regraNegocio, o.id_orccap as id,  current as dataCadastro, current as dataAtualizacao,  " +
            "          o.nroorcament as IdPedidoQion, o.dtorcament as dataEmissao, 0 as status, p.cgccpf as idCliente, p.cgccpf as documentocliente, " +
            " 	   f.cgccpf as documentoEmpresa, o.dtprevista as dataEntrega, 'Normal' as tipo, o.id_agente as vendedor1, 0 as vendedor2, " +
            " 	   0 as vendedor3,  o.descmerc as vlrDesconto, o.condpgto as condPagamento, 0 as VlrParcela1, ' ' as vencParcela1,  0 as VlrParcela2, " +
            " 	   ' ' as vencParcela2,  0 as VlrParcela3, ' ' as vencParcela3, 0 as VlrParcela4, ' ' as vencParcela4, 0 as VlrParcela5, ' ' as vencParcela5, " +
            " 	    0 as VlrParcela6, ' ' as vencParcela6, 0 as VlrParcela7, ' ' as vencParcela7, 0 as VlrParcela8, ' ' as vencParcela8, " +
            " 	   0 as VlrParcela9, ' ' as vencParcela9, o.valorfrete as vlrFrete " +
            "   from cnorccap o " +
            "  inner join ciendere e " +
            "     on e.nro_endere = o.nro_endere " +
            "     inner join cipessoa p " +
            "     on p.tppessoa = e.tppessoa " +
            "    and p.cgccpf   = e.cgccpf " +
            "  inner join cofilial f " +
            "     on f.filial = o.filial " +
            " where o.dtorcament = cast(current as date) " +
            ` SKIP ${skip} LIMIT ${limit}`;
      }

      return this.connector.execute(query);
    } catch (e) {}
  }
  async getRequestItem(
    pagination: PaginationInterface,
    type: string
  ): Promise<DatabaseRow[]> {
    try {
      const page = pagination.page - 1;
      const limit = pagination.limit;
      const skip = page * limit;

      let query;
      switch (type) {
        case "T":
          query =
            " Select f.cgccpf as cnpjOrigemDados, ' ' as regraNegocio, o.id_orccap || nrolinha as idPedidoItem,  cast(current as date) as dataCadastro, cast(current as date) as dataAtualizacao, " +
            " 	      i.id_orccap as idPedido, o.nroorcament as idPedidoQion, o.dtorcament as dataEmissao, 0 as status, 0 as barter, x.cgccpf as documentocliente,                              " +
            " 	      f.cgccpf as documentoEmpresa, i.produto as idItem, 0 as skuItem, p.descrprodut as descricaoitem, p.unidvenda as unidMedidaItem, i.quantidade as qtd,                          " +
            " 		   0 as qtdCanc, i.unitario as valorUnitLiq, i.unitario as valorUnitBru,                                                                                                    " +
            " 		   case                                                                                                                                                                     " +
            " 		     when i.unitario > 0 then  (i.descunit/i.unitario * 100)                                                                                                                " +
            " 		     else 0                                                                                                                                                                 " +
            " 		    end  as percDesconto,                                                                                                                                                   " +
            " 		   i.descitem as valorDesc, (i.unitario * i.quantidade) as valorTotal, ' ' as idexcitem, i.mvtofisico as tipoMovimentacaoProdFat,                                           " +
            " 		   i.quantidade as qtdFaturada                                                                                                                                              " +
            "       from cnorcite i " +
            "      inner join cnorccap o	   " +
            " 	    on o.id_orccap = i.id_orccap " +
            " 	 inner join ciendere e " +
            " 	    on e.nro_endere = o.nro_endere " +
            "      inner join cipessoa x " +
            " 	    on x.tppessoa = e.tppessoa " +
            " 	   and x.cgccpf   = e.cgccpf " +
            "      inner join cmprodut p " +
            "         on p.produto = i.produto	 " +
            " 	 inner join cofilial f " +
            " 	    on f.filial = o.filial " +
            "     where year(o.dtorcament) = year(current) " +
            " 	  order by o.id_orccap desc " +
            ` SKIP ${skip} LIMIT ${limit}`;
          break;
        default:
          query =
            " Select f.cgccpf as cnpjOrigemDados, ' ' as regraNegocio, o.id_orccap || nrolinha as idPedidoItem,  cast(current as date) as dataCadastro, cast(current as date) as dataAtualizacao, " +
            " 	      i.id_orccap as idPedido, o.nroorcament as idPedidoQion, o.dtorcament as dataEmissao, 0 as status, 0 as barter, x.cgccpf as documentocliente,                              " +
            " 	      f.cgccpf as documentoEmpresa, i.produto as idItem, 0 as SKU, p.descrprodut as descricaoitem, p.unidvenda as unidMedidaItem, i.quantidade as qtd,                          " +
            " 		   0 as qtdCanc, i.unitario as valorUnitLiq, i.unitario as valorUnitBru,                                                                                                    " +
            " 		   case                                                                                                                                                                     " +
            " 		     when i.unitario > 0 then  (i.descunit/i.unitario * 100)                                                                                                                " +
            " 		     else 0                                                                                                                                                                 " +
            " 		    end  as percDesconto,                                                                                                                                                   " +
            " 		   i.descitem as valorDesc, (i.unitario * i.quantidade) as valorTotal, ' ' as idexcitem, i.mvtofisico as tipoMovimentacaoProdFat,                                           " +
            " 		   i.quantidade as qtdFaturada                                                                                                                                              " +
            "       from cnorcite i " +
            "      inner join cnorccap o	   " +
            " 	    on o.id_orccap = i.id_orccap " +
            " 	 inner join ciendere e " +
            " 	    on e.nro_endere = o.nro_endere " +
            "      inner join cipessoa x " +
            " 	    on x.tppessoa = e.tppessoa " +
            " 	   and x.cgccpf   = e.cgccpf " +
            "      inner join cmprodut p " +
            "         on p.produto = i.produto	 " +
            " 	 inner join cofilial f " +
            " 	    on f.filial = o.filial " +
            "     where o.dtorcament = cast(current as date) " +
            " 	  order by o.id_orccap desc " +
            ` SKIP ${skip} LIMIT ${limit}`;
      }

      return this.connector.execute(query);
    } catch (e) {}
  }
  async getInvoices(
    pagination: PaginationInterface,
    type: string
  ): Promise<DatabaseRow[]> {
    try {
      const page = pagination.page - 1;
      const limit = pagination.limit;
      const skip = page * limit;

      let query;
      switch (type) {
        case "T":
          query =
            " select f.cgccpf as cnpjOrigemDadosFaturamento, n.id_nfcapa as id,  n.dttransacao as dataCadastroFaturamento, n.dtnota as dataAtualizacaoFaturamento,  " +
            "             n.cgccpf as idCliente, n.cgccpf as documentoCliente, n.nronota as numeroNfFaturamento, n.serienf as serieNFFaturamento, n.codfiscal as cfopFaturamento, " +
            "             n.dtnota as dtEmissaoFaturamento, n.dttransacao as dtSaidaFaturamento, " +
            "             case n.cancelada " +
            "                     when 'N' then 'Concluida'  " +
            "                     when 'S' then 'Cancelada'  " +
            "                     when 'D' then 'Denegada'  " +
            "                     when 'I' then 'Inutilizada' " +
            "                     else 'Pendente'  " +
            "             end as statusNfFaturamento,  " +
            "             c.nomecidade as municipioEntregaFaturamento, c.ufederacao as ufEntregaFaturamento, " +
            "             n.valoritem as vlrTotalProdutosFaturamento, n.totnfiscal as vlrTotalNfFaturamento,  " +
            "             case  " +
            "                 when v.devolucao = 'S' then 'D' " +
            "                 when v.complemento = 'S' then 'C' " +
            "                 else 'S' " +
            "             end  as tipoFaturamento " +
            "     from cnnfcapa n " +
            "     inner join cofilial f " +
            "       on n.filial = f.filial " +
            "     inner join ciendere e " +
            "       on e.nro_endere = n.nro_endere " +
            "     inner join cicidade c " +
            "       on  c.cidade         =   e.cidade   " +
            "     inner join cttransa t " +
            "        on t.transacao = n.transacao " +
            "      and  t.mvtotransacao = 'S' " +
            "     inner join cttptran v " +
            "        on v.tipotransacao = t.tipotransacao    " +
            "    where year(n.dtnota) = year(current) " +
            "    order by n.nronota desc " +
            ` SKIP ${skip} LIMIT ${limit}`;
          break;
        default:
          query =
            " select f.cgccpf as cnpjOrigemDadosFaturamento, n.id_nfcapa as id,  n.dttransacao as dataCadastroFaturamento, n.dtnota as dataAtualizacaoFaturamento,  " +
            "             n.cgccpf as idCliente, n.cgccpf as documentoCliente, n.nronota as numeroNfFaturamento, n.serienf as serieNFFaturamento, n.codfiscal as cfopFaturamento, " +
            "             n.dtnota as dtEmissaoFaturamento, n.dttransacao as dtSaidaFaturamento, " +
            "             case n.cancelada " +
            "                     when 'N' then 'Concluida'  " +
            "                     when 'S' then 'Cancelada'  " +
            "                     when 'D' then 'Denegada'  " +
            "                     when 'I' then 'Inutilizada' " +
            "                     else 'Pendente'  " +
            "             end as statusNfFaturamento,  " +
            "             c.nomecidade as municipioEntregaFaturamento, c.ufederacao as ufEntregaFaturamento, " +
            "             n.valoritem as vlrTotalProdutosFaturamento, n.totnfiscal as vlrTotalNfFaturamento,  " +
            "             case  " +
            "                 when v.devolucao = 'S' then 'D' " +
            "                 when v.complemento = 'S' then 'C' " +
            "                 else 'S' " +
            "             end  as tipoFaturamento " +
            "     from cnnfcapa n " +
            "     inner join cofilial f " +
            "       on n.filial = f.filial " +
            "     inner join ciendere e " +
            "       on e.nro_endere = n.nro_endere " +
            "     inner join cicidade c " +
            "       on  c.cidade         =   e.cidade   " +
            "     inner join cttransa t " +
            "        on t.transacao = n.transacao " +
            "      and  t.mvtotransacao = 'S' " +
            "     inner join cttptran v " +
            "        on v.tipotransacao = t.tipotransacao    " +
            "    where n.dtnota = cast(current as date) " +
            "    order by n.nronota desc " +
            ` SKIP ${skip} LIMIT ${limit}`;
      }

      return this.connector.execute(query);
    } catch (e) {}
  }
  async getInvoicesItem(
    pagination: PaginationInterface,
    type: string
  ): Promise<DatabaseRow[]> {
    try {
      const page = pagination.page - 1;
      const limit = pagination.limit;
      const skip = page * limit;

      let query;
      switch (type) {
        case "T":
          query =
            " select f.cgccpf as cnpjOrigemDados, '' as regraNegocio, id_nfitem as id,  nvl(n.dttransacao, n.dtnota) as dataCadastro, n.dtnota as dataAtualizacao,  " +
            "     n.nronota as numero, n.serienf as serie, n.dtnota as dataEmissao, '0' as AceiteDuplicata, 0 as ControleCpr, 0 as idPedido, 0 as idPedidoQion,  " +
            "     '' as dtPedido, 1 as tipo, f.cgccpf as documentoEmpresa, e.cgccpf as documentoCliente, e.cgccpf as idCliente, 0 as idNotaFiscalOrigem,  " +
            "     0 as notaFiscalOrigem, i.mercadoria as iditem, i.descritem as descricaoItem, '' as brandingItem, '0' as skuItem, i.unidade as unidadeMedidaItem, " +
            "     ' ' as loteitem, i.quantidade as quantidadeItem, i.valoritem as valorUnitarioItem, (i.quantidade * i.valoritem) as valorTotalItem, 0 as percentualDescItem, " +
            "     i.valordesc as valorDescProd, i.valoritem as valorVendaItem, n.codfiscal as cfopitem " +
            "  from cnnfitem i " +
            "  inner join cnnfcapa n " +
            "    on n.id_nfcapa = i.id_nfcapa " +
            "  inner join ciendere e  " +
            "    on e.nro_endere = n.nro_endere " +
            "  inner join cofilial f " +
            "    on f.filial = n.filial " +
            " where year(n.dtnota) = year(current) " +
            ` SKIP ${skip} LIMIT ${limit}`;
          break;
        default:
          query =
            " select f.cgccpf as cnpjOrigemDados, '' as regraNegocio, id_nfitem as id,  nvl(n.dttransacao, n.dtnota) as dataCadastro, n.dtnota as dataAtualizacao,  " +
            "     n.nronota as numero, n.serienf as serie, n.dtnota as dataEmissao, '0' as AceiteDuplicata, 0 as ControleCpr, 0 as idPedido, 0 as idPedidoQion,  " +
            "     '' as dtPedido, 1 as tipo, f.cgccpf as documentoEmpresa, e.cgccpf as documentoCliente, e.cgccpf as idCliente, 0 as idNotaFiscalOrigem,  " +
            "     0 as notaFiscalOrigem, i.mercadoria as iditem, i.descritem as descricaoItem, '' as brandingItem, '0' as skuItem, i.unidade as unidadeMedidaItem, " +
            "     ' ' as loteitem, i.quantidade as quantidadeItem, i.valoritem as valorUnitarioItem, (i.quantidade * i.valoritem) as valorTotalItem, 0 as percentualDescItem, " +
            "     i.valordesc as valorDescProd, i.valoritem as valorVendaItem, n.codfiscal as cfopitem " +
            "  from cnnfitem i " +
            "  inner join cnnfcapa n " +
            "    on n.id_nfcapa = i.id_nfcapa " +
            "  inner join ciendere e  " +
            "    on e.nro_endere = n.nro_endere " +
            "  inner join cofilial f " +
            "    on f.filial = n.filial " +
            " where n.dtnota = cast(current as date) " +
            ` SKIP ${skip} LIMIT ${limit}`;
      }

      return this.connector.execute(query);
    } catch (e) {}
  }
  async getPaymentType(
    pagination: PaginationInterface,
    type: string
  ): Promise<DatabaseRow[]> {
    try {
      const page = pagination.page - 1;
      const limit = pagination.limit;
      const skip = page * limit;

      let query;
      switch (type) {
        case "T":
          query =
            "Select fil.cgccpf as cnpjOrigemDados, cast(current as date) as dataCadastro, cast(current as date) as dataAtualizacao, f.formapgto as id, f.descrforma as descricao " +
            " from crforpgt f, cofilial fil " +
            " where fil.filial in (select min(filial) from cofilial) " +
            ` SKIP ${skip} LIMIT ${limit}`;
          break;
        default:
          query =
            "Select fil.cgccpf as cnpjOrigemDados, cast(current as date) as dataCadastro, cast(current as date) as dataAtualizacao, f.formapgto as id, f.descrforma as descricao " +
            " from crforpgt f, cofilial fil " +
            " where fil.filial in (select min(filial) from cofilial) " +
            ` SKIP ${skip} LIMIT ${limit}`;
      }

      return this.connector.execute(query);
    } catch (e) {}
  }
  async getProvider(
    pagination: PaginationInterface,
    type: string
  ): Promise<DatabaseRow[]> {
    try {
      const page = pagination.page - 1;
      const limit = pagination.limit;
      const skip = page * limit;

      let query;
      switch (type) {
        case "T":
          query =
            "select fil.cgccpf as cnpjOrigemDados, cast(current as date) as dataCadastro, cast(current as date) as dataAtualizacao, p.cgccpf as id, " +
            "      p.cgccpf as documento, nvl(p.razaoSocial, ' ') as razaoSocial, nvl(p.nomeguerra, ' ') as nomeFantasia, e.fone as telefoneFixo1, ' ' as telefoneFixo2, nvl(e.celular, ' ') as celular, " +
            "      nvl(e.endeletronic, ' ') as email, e.endereco as logradouro, 0 as numero, e.bairro, e.cep, c.nomecidade as municipio, d.codigoibge as codibge, " +
            "      c.ufederacao as uf, nvl(p.inscestadual, ' ') as inscricaoEstadual  " +
            " from cffornec f " +
            " inner join cipessoa p " +
            "   on p.tppessoa = f.tppessoa " +
            "  and p.cgccpf   = f.cgccpf " +
            " inner join ciendere e " +
            "   on e.tppessoa = p.tppessoa " +
            "  and e.cgccpf = p.cgccpf " +
            "  and e.ativo = 'S' " +
            "  and e.principal = 'S' " +
            " inner join cicidade c " +
            "   on c.cidade = e.cidade " +
            " inner join cicidect d " +
            "   on d.cidade = c.cidade " +
            " inner join cofilial fil " +
            "   on fil.filial in (select min(filial) from cofilial) " +
            " where f.tppessoa in (1,2) " +
            ` SKIP ${skip} LIMIT ${limit}`;
          break;
        default:
          query =
            "select fil.cgccpf as cnpjOrigemDados, cast(current as date) as dataCadastro, cast(current as date) as dataAtualizacao, p.cgccpf as id, " +
            "      p.cgccpf as documento, nvl(p.razaoSocial, ' ') as razaoSocial, nvl(p.nomeguerra, ' ') as nomeFantasia, e.fone as telefoneFixo1, ' ' as telefoneFixo2, nvl(e.celular, ' ') as celular, " +
            "      nvl(e.endeletronic, ' ') as email, e.endereco as logradouro, 0 as numero, e.bairro, e.cep, c.nomecidade as municipio, d.codigoibge as codibge, " +
            "      c.ufederacao as uf, nvl(p.inscestadual, ' ') as inscricaoEstadual  " +
            " from cffornec f " +
            " inner join cipessoa p " +
            "   on p.tppessoa = f.tppessoa " +
            "  and p.cgccpf   = f.cgccpf " +
            " inner join ciendere e " +
            "   on e.tppessoa = p.tppessoa " +
            "  and e.cgccpf = p.cgccpf " +
            "  and e.ativo = 'S' " +
            "  and e.principal = 'S' " +
            " inner join cicidade c " +
            "   on c.cidade = e.cidade " +
            " inner join cicidect d " +
            "   on d.cidade = c.cidade " +
            " inner join cofilial fil " +
            "   on fil.filial in (select min(filial) from cofilial) " +
            " where f.tppessoa in (1,2) " +
            ` SKIP ${skip} LIMIT ${limit}`;
      }

      return this.connector.execute(query);
    } catch (e) {}
  }
  async getAccountPay(
    pagination: PaginationInterface,
    type: string
  ): Promise<DatabaseRow[]> {
    try {
      const page = pagination.page - 1;
      const limit = pagination.limit;
      const skip = page * limit;

      let query;
      switch (type) {
        case "T":
          query =
            " select f.cgccpf as cnpjOrigemDados, o.dtdocto as dataCadastro,  cast(current as date) as dataAtualizacao, " +
            "        o.id_ordpag as titulo, p.cgccpf as idFornecedor, nvl(p.nomepessoa, ' ') as nomeFornecedor, o.dtdocto as dtEmissao, " +
            "        o.nrodocto  as documento, o.serieop as serie, o.dtvenctoor as dtVencimentoOriginal, o.dtvencto as dtVencimentoProrrogado, " +
            "        ' ' as competencia,  o.valor as vlrBruto, 0 as vlrAcrescimos, 0 as vlrDescontos, o.valor as vlrLiquido, o.seqdocto as parcela, " +
            "         case o.liquidado " +
            "              when 'S' then  'Liquidado' " +
            "              when 'N' then  'Aberto' " +
            "         end as situacao, nvl(q.dtpagto, ' ') as dtbaixa " +
            "   from cpordpag o " +
            "   inner join ciendere e " +
            "     on e.nro_endere = o.nro_endere " +
            "   inner join cipessoa p " +
            "     on p.tppessoa = e.tppessoa " +
            "    and p.cgccpf = e.cgccpf " +
            "   inner join cofilial f " +
            "     on f.filial = o.filial " +
            "    left outer join cppagtos q " +
            "     on  q.id_ordpag = o.id_ordpag " +
            "    where year(dtdocto) = year(current) " +
            ` SKIP ${skip} LIMIT ${limit}`;
          break;
        default:
          query =
            " select f.cgccpf as cnpjOrigemDados, o.dtdocto as dataCadastro,  cast(current as date) as dataAtualizacao, " +
            "        o.id_ordpag as titulo, p.cgccpf as idFornecedor, nvl(p.nomepessoa, ' ') as nomeFornecedor, o.dtdocto as dtEmissao, " +
            "        o.nrodocto  as documento, o.serieop as serie, o.dtvenctoor as dtVencimentoOriginal, o.dtvencto as dtVencimentoProrrogado, " +
            "        ' ' as competencia,  o.valor as vlrBruto, 0 as vlrAcrescimos, 0 as vlrDescontos, o.valor as vlrLiquido, o.seqdocto as parcela, " +
            "         case o.liquidado " +
            "              when 'S' then  'Liquidado' " +
            "              when 'N' then  'Aberto' " +
            "         end as situacao, nvl(q.dtpagto, ' ') as dtbaixa " +
            "   from cpordpag o " +
            "   inner join ciendere e " +
            "     on e.nro_endere = o.nro_endere " +
            "   inner join cipessoa p " +
            "     on p.tppessoa = e.tppessoa " +
            "    and p.cgccpf = e.cgccpf " +
            "   inner join cofilial f " +
            "     on f.filial = o.filial " +
            "    left outer join cppagtos q " +
            "     on  q.id_ordpag = o.id_ordpag " +
            "   where o.liquidado = 'N' " +
            "      and o.dtdocto = cast(current as date) " +
            ` SKIP ${skip} LIMIT ${limit}`;
      }

      return this.connector.execute(query);
    } catch (e) {}
  }
  async getAccountReceivable(
    pagination: PaginationInterface,
    type: string
  ): Promise<DatabaseRow[]> {
    try {
      const page = pagination.page - 1;
      const limit = pagination.limit;
      const skip = page * limit;

      let query;
      switch (type) {
        case "T":
          query =
            " select f.cgccpf as cnpjOrigemDados, a.id_fatura as id, d.dtemisgrav as dataCadastro, cast(current as date) as dataAtualizacao, " +
            "        d.id_duplic as titulo,  p.cgccpf as idCliente, p.nomepessoa as nomeCliente, a.dtemissao as dtEmissao,  " +
            "        nvl(n.nronota, 0) as documento, nvl(n.serienf, ' ')  as serie, d.dtvenctoori as dtVencimentoOriginal,  " +
            "        d.dtvencto as dtVencimentoProrrogado, ' ' as competencia, d.valor as vlrBruto, " +
            "        0 as vlrAcrescimos, 0 as vlrDescontos, nvl(q.valor, d.valor) as vlrLiquido, d.nroduplic as parcela,  " +
            "        case d.liquidado " +
            "           when 'S' then 'Liquidado' " +
            "           when 'N' then 'Aberto' " +
            "        end as situacao, nvl(q.dtrecbto, ' ')  as dtBaixa, nvl(n.id_agente, ' ') as idVendedor1, 0 as idVendedor2, 0 as idVendedor3, 0 as idVendedor4    " +
            "  from  crfatura a " +
            "   inner join ciendere e " +
            "       on  e.nro_endere =  a.nro_endere  " +
            "   inner join crduplic d " +
            "     on  d.id_fatura =  a.id_fatura       " +
            "   inner join cibancos b " +
            "     on b.id_bancos =  d.id_bcoportador " +
            "   inner join cipessoa p " +
            "     on p.cgccpf   =  e.cgccpf  " +
            "    and p.tppessoa =  e.tppessoa " +
            "   inner join crtpfatu t " +
            "     on a.tpdocto    = t.tpfatura " +
            "   inner join cofilial f " +
            "     on a.filial = f.filial	   " +
            "   left outer join cnnffatu x " +
            "     on x.id_fatura = a.id_fatura " +
            "   left outer join cnnfcapa n " +
            "     on n.id_nfcapa = x.id_nfcapa " +
            "   left outer join crrecbto q " +
            "     on q.id_duplic = d.id_duplic   " +
            "    where d.liquidado = 'N'  " +
            "     or (d.liquidado = 'S' and year(d.dtemisgrav) = year(current)) " +
            "   order by  p.nomepessoa " +
            ` SKIP ${skip} LIMIT ${limit}`;
          break;
        default:
          query =
            " select f.cgccpf as cnpjOrigemDados, a.id_fatura as id, d.dtemisgrav as dataCadastro, cast(current as date) as dataAtualizacao, " +
            "        d.id_duplic as titulo,  p.cgccpf as idCliente, p.nomepessoa as nomeCliente, a.dtemissao as dtEmissao,  " +
            "        nvl(n.nronota, 0) as documento, nvl(n.serienf, ' ')  as serie, d.dtvenctoori as dtVencimentoOriginal,  " +
            "        d.dtvencto as dtVencimentoProrrogado, ' ' as competencia, d.valor as vlrBruto, " +
            "        0 as vlrAcrescimos, 0 as vlrDescontos, nvl(q.valor, d.valor) as vlrLiquido, d.nroduplic as parcela,  " +
            "        case d.liquidado " +
            "           when 'S' then 'Liquidado' " +
            "           when 'N' then 'Aberto' " +
            "        end as situacao, nvl(q.dtrecbto, ' ')  as dtBaixa, nvl(n.id_agente, ' ') as idVendedor1, 0 as idVendedor2, 0 as idVendedor3, 0 as idVendedor4    " +
            "  from  crfatura a " +
            "   inner join ciendere e " +
            "       on  e.nro_endere =  a.nro_endere  " +
            "   inner join crduplic d " +
            "     on  d.id_fatura =  a.id_fatura       " +
            "   inner join cibancos b " +
            "     on b.id_bancos =  d.id_bcoportador " +
            "   inner join cipessoa p " +
            "     on p.cgccpf   =  e.cgccpf  " +
            "    and p.tppessoa =  e.tppessoa " +
            "   inner join crtpfatu t " +
            "     on a.tpdocto    = t.tpfatura " +
            "   inner join cofilial f " +
            "     on a.filial = f.filial	   " +
            "   left outer join cnnffatu x " +
            "     on x.id_fatura = a.id_fatura " +
            "   left outer join cnnfcapa n " +
            "     on n.id_nfcapa = x.id_nfcapa " +
            "   left outer join crrecbto q " +
            "     on q.id_duplic = d.id_duplic   " +
            "   where d.liquidado = 'N'  " +
            "     and d.dtemisgrav = cast(current as date) " +
            "  order by  p.nomepessoa " +
            ` SKIP ${skip} LIMIT ${limit}`;
      }

      return this.connector.execute(query);
    } catch (e) {}
  }
  async getVendor(
    pagination: PaginationInterface,
    type: string
  ): Promise<DatabaseRow[]> {
    try {
      const page = pagination.page - 1;
      const limit = pagination.limit;
      const skip = page * limit;

      let query;
      switch (type) {
        case "T":
          query =
            " Select f.cgccpf as cnpjOrigemDados, cast(current as date) as dataCadastro, cast(current as date) as dataAtualizacao,  " +
            "  a.id_agente as id, p.cgccpf as documento, p.nomepessoa as razaoSocial, e.fone as telefoneFixo1, nvl(e.fax, ' ') as telefoneFixo2, " +
            "   e.celular, nvl(e.endeletronic, ' ') as email, e.endereco as logradouro, 0 as numero, e.bairro, e.cep, c.nomecidade, t.codigoibge as codibge, c.ufederacao, " +
            "   ' ' as regiao " +
            "   from coagente a " +
            "   inner join cosetor s " +
            "      on s.id_setor = a.id_setor " +
            "     and s.tpsetor in ('N', 'U', 'B') " +
            "      inner join codeptos d " +
            "      on d.id_deptos = s.id_deptos " +
            "      inner join codivisa v " +
            "      on v.id_divisao = d.id_divisao " +
            "      inner join cofilial f " +
            "      on f.filial = v.filial " +
            "      inner join cipessoa p " +
            "     on p.tppessoa = a.tppessoa " +
            "    and p.cgccpf = a.cgccpf " +
            "      inner join cicadfis x " +
            "             on x.cgccpf = p.cgccpf " +
            "            and x.tppessoa = p.tppessoa " +
            "      inner join ciendere e " +
            "           on e.cgccpf = p.cgccpf " +
            "         and  e.tppessoa = p.tppessoa " +
            "         and e.ativo = 'S' " +
            "         and e.principal = 'S'	" +
            "      inner join cicidade c " +
            "         on e.cidade = c.cidade " +
            "      inner join cicidect t " +
            "         on t.cidade = c.cidade " +
            "    where a.ativo = 'S' " +
            ` SKIP ${skip} LIMIT ${limit}`;
          break;
        default:
          query =
            " Select f.cgccpf as cnpjOrigemDados, cast(current as date) as dataCadastro, cast(current as date) as dataAtualizacao,  " +
            "  a.id_agente as id, p.cgccpf as documento, p.nomepessoa as razaoSocial, e.fone as telefoneFixo1, nvl(e.fax, ' ') as telefoneFixo2, " +
            "   e.celular, nvl(e.endeletronic, ' ') as email, e.endereco as logradouro, 0 as numero, e.bairro, e.cep, c.nomecidade, t.codigoibge as codibge, c.ufederacao, " +
            "   ' ' as regiao " +
            "   from coagente a " +
            "   inner join cosetor s " +
            "      on s.id_setor = a.id_setor " +
            "     and s.tpsetor in ('N', 'U', 'B') " +
            "      inner join codeptos d " +
            "      on d.id_deptos = s.id_deptos " +
            "      inner join codivisa v " +
            "      on v.id_divisao = d.id_divisao " +
            "      inner join cofilial f " +
            "      on f.filial = v.filial " +
            "      inner join cipessoa p " +
            "     on p.tppessoa = a.tppessoa " +
            "    and p.cgccpf = a.cgccpf " +
            "      inner join cicadfis x " +
            "             on x.cgccpf = p.cgccpf " +
            "            and x.tppessoa = p.tppessoa " +
            "      inner join ciendere e " +
            "           on e.cgccpf = p.cgccpf " +
            "         and  e.tppessoa = p.tppessoa " +
            "         and e.ativo = 'S' " +
            "         and e.principal = 'S'	" +
            "      inner join cicidade c " +
            "         on e.cidade = c.cidade " +
            "      inner join cicidect t " +
            "         on t.cidade = c.cidade " +
            "    where a.ativo = 'S' " +
            ` SKIP ${skip} LIMIT ${limit}`;
      }

      return this.connector.execute(query);
    } catch (e) {}
  }
  async getEmployee(
    pagination: PaginationInterface,
    type: string
  ): Promise<DatabaseRow[]> {
    try {
      const page = pagination.page - 1;
      const limit = pagination.limit;
      const skip = page * limit;

      let query;
      switch (type) {
        case "T":
          query =
            " Select f.cgccpf as cnpjOrigemDados, cast(current as date) as dataCadastro, cast(current as date) as dataAtualizacao,  " +
            "  a.id_agente as idFuncionario, p.cgccpf as documento, p.nomepessoa as nome, e.celular, nvl(e.endeletronic, ' ') as email,  " +
            "         x.sexo, p.dtfundacao as dtnascimento, 0 as cnpjVinculado	  " +
            "   from coagente a " +
            "   inner join cosetor s " +
            "      on s.id_setor = a.id_setor " +
            "     inner join codeptos d " +
            "      on d.id_deptos = s.id_deptos " +
            "     inner join codivisa v " +
            "      on v.id_divisao = d.id_divisao " +
            "     inner join cofilial f " +
            "      on f.filial = v.filial " +
            "     inner join cipessoa p " +
            "     on p.tppessoa = a.tppessoa " +
            "    and p.cgccpf = a.cgccpf " +
            "     inner join cicadfis x " +
            "            on x.cgccpf = p.cgccpf " +
            "           and x.tppessoa = p.tppessoa " +
            "     inner join ciendere e " +
            "          on e.cgccpf = p.cgccpf " +
            "        and  e.tppessoa = p.tppessoa " +
            "        and e.ativo = 'S' " +
            "        and e.principal = 'S' " +
            "     inner join cicidade c " +
            "        on e.cidade = c.cidade " +
            "     inner join cicidect t " +
            "        on t.cidade = c.cidade " +
            "   where a.ativo = 'S' " +
            ` SKIP ${skip} LIMIT ${limit}`;
          break;
        default:
          query =
            " Select f.cgccpf as cnpjOrigemDados, cast(current as date) as dataCadastro, cast(current as date) as dataAtualizacao,  " +
            "  a.id_agente as idFuncionario, p.cgccpf as documento, p.nomepessoa as nome, e.celular, nvl(e.endeletronic, ' ') as email,  " +
            "         x.sexo, p.dtfundacao as dtnascimento, 0 as cnpjVinculado	  " +
            "   from coagente a " +
            "   inner join cosetor s " +
            "      on s.id_setor = a.id_setor " +
            "     inner join codeptos d " +
            "      on d.id_deptos = s.id_deptos " +
            "     inner join codivisa v " +
            "      on v.id_divisao = d.id_divisao " +
            "     inner join cofilial f " +
            "      on f.filial = v.filial " +
            "     inner join cipessoa p " +
            "     on p.tppessoa = a.tppessoa " +
            "    and p.cgccpf = a.cgccpf " +
            "     inner join cicadfis x " +
            "            on x.cgccpf = p.cgccpf " +
            "           and x.tppessoa = p.tppessoa " +
            "     inner join ciendere e " +
            "          on e.cgccpf = p.cgccpf " +
            "        and  e.tppessoa = p.tppessoa " +
            "        and e.ativo = 'S' " +
            "        and e.principal = 'S' " +
            "     inner join cicidade c " +
            "        on e.cidade = c.cidade " +
            "     inner join cicidect t " +
            "        on t.cidade = c.cidade " +
            "   where a.ativo = 'S' " +
            ` SKIP ${skip} LIMIT ${limit}`;
      }

      return this.connector.execute(query);
    } catch (e) {}
  }
  async getInventory(
    pagination: PaginationInterface,
    type: string
  ): Promise<DatabaseRow[]> {
    try {
      const page = pagination.page - 1;
      const limit = pagination.limit;
      const skip = page * limit;

      let query;
      switch (type) {
        case "T":
          query =
            " select fil.filial as cnpjOrigemDados, current as dataAtualizacao, e.produto as iditem,  p.descrprodut as descricaoItem, " +
            "		    nvl(v.precopublico, 0) as vlrUnitario, e.rua || '-' ||  e.prateleira || '-' ||  e.gaveta as armazem, " +
            "		    e.saldocontabil as QtdTotal, e.valorcontabil as vlrTotal, 0 as qtdPedidaVenda, 0 as QtdReservada, " +
            "		0 as QtdPrevisaoEntrada, e.dtultsaid as dtUltimaVenda, e.dtultentr as dtUltimaCompra " +
            "      from cmestoqu e " +
            "      inner join cmprodut p " +
            "        on e.produto = p.produto " +
            "      inner join cofilial fil " +
            "        on e.filial = fil.filial " +
            "      left outer join cmpreest v " +
            "        on v.filial = e.filial " +
            "       and v.produto = e.produto " +
            "       and dtinicio <= cast(current as date) " +
            "       and (dtfim is null or dtfim >= cast(current as date)) " +
            "     where  e.saldocontabil > 0 " +
            ` SKIP ${skip} LIMIT ${limit}`;
          break;
        default:
          query =
            " select fil.filial as cnpjOrigemDados, current as dataAtualizacao, e.produto as iditem,  p.descrprodut as descricaoItem, " +
            "		    nvl(v.precopublico, 0) as vlrUnitario, e.rua || '-' ||  e.prateleira || '-' ||  e.gaveta as armazem, " +
            "		    e.saldocontabil as QtdTotal, e.valorcontabil as vlrTotal, 0 as qtdPedidaVenda, 0 as QtdReservada, " +
            "		0 as QtdPrevisaoEntrada, e.dtultsaid as dtUltimaVenda, e.dtultentr as dtUltimaCompra " +
            "      from cmestoqu e " +
            "      inner join cmprodut p " +
            "        on e.produto = p.produto " +
            "      inner join cofilial fil " +
            "        on e.filial = fil.filial " +
            "      left outer join cmpreest v " +
            "        on v.filial = e.filial " +
            "       and v.produto = e.produto " +
            "       and dtinicio <= cast(current as date) " +
            "       and (dtfim is null or dtfim >= cast(current as date)) " +
            "     where  e.saldocontabil > 0 " +
            ` SKIP ${skip} LIMIT ${limit}`;
      }

      return this.connector.execute(query);
    } catch (e) {}
  }

  async getTest(
    pagination: PaginationInterface,
    type?: string
  ): Promise<DatabaseRow[]> {
    try {
      const page = pagination.page - 1;
      const limit = pagination.limit;
      const skip = page * limit;

      query = await this.getTestQueryTotal();

      return this.connector.execute(query + ` SKIP ${skip} LIMIT ${limit}`);
    } catch (e) {}
  }
  async getTestQueryTotal(): Promise<string> {
    return (query = "SELECT * FROM informix.clientes ");
  }
  async countTest(type: string): Promise<DatabaseRow[]> {
    try {
      query = await this.getTestQueryTotal();
      let count = `Selet count * from (${query})`;
      return this.connector.execute(count);
    } catch (e) {}
  }
  async getClients(
    pagination: PaginationInterface,
    type: string
  ): Promise<DatabaseRow[]> {
    try {
      const page = pagination.page - 1;
      const limit = pagination.limit;
      const skip = page * limit;

      switch (type) {
        case "T":
          query = await this.getClientsQueryTotal();
          break;
        default:
          query = await this.getClientsQueryPartial();
      }

      return this.connector.execute(query + ` SKIP ${skip} LIMIT ${limit}`);
    } catch (e) {}
  }
  async getClientsQueryTotal(): Promise<string> {
    return (query =
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
      " order by p.nomepessoa ");
  }
  async getClientsQueryPartial(): Promise<string> {
    return (query =
      "Select  fil.cgccpf as cnpjOrigemDados, cast(current as date) as dataCadastro, cast(current as date) as dataAtualizacao, " +
      " p.cgccpf as id, p.nomepessoa as razaoSocial, nvl(p.nomeguerra) as nomeFantasia, p.cgccpf as documento,  1 as situacaoFinanceira, e.celular, " +
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
      "   and (cli.dtcadastro = cast(current as date) or cli.dtatualiza = cast(current as date)) " +
      " order by p.nomepessoa ");
  }
  async countClients(type: string): Promise<DatabaseRow[]> {
    try {
      switch (type) {
        case "T":
          query = await this.getClientsQueryTotal();
          break;
        default:
          query = await this.getClientsQueryPartial();
      }
      let count = `Selet count * from (${query})`;
      return this.connector.execute(count);
    } catch (e) {}
  }
}
