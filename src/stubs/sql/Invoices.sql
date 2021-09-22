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
      "    order by n.nronota desc "