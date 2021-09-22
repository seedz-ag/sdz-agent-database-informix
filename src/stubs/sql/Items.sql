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
      " order by p.descrprodut "