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
      "  and nvl(a.marcaf, ' ') <> ' ' ) "