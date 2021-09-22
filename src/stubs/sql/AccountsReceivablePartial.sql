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
      "  order by  p.nomepessoa "