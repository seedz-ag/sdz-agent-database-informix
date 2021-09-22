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
      "     where  e.saldocontabil > 0 "