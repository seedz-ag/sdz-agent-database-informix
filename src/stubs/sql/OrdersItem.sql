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
      " 	  order by o.id_orccap desc "