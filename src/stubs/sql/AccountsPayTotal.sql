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
      "    where year(dtdocto) = year(current) "