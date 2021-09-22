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
      " where year(n.dtnota) = year(current) "