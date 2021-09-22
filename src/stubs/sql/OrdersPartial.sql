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
      " where o.dtorcament = cast(current as date) "