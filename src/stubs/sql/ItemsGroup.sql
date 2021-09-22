"Select  fil.cgccpf as cnpjOrigemDados,  current as dataCadastro, current as dataAtualizacao,  " +
      " a.id_grupos AS id, a.descrgrupo as descricao " +
      " from cmgrupos a, cofilial fil " +
      " where fil.filial in (select min(filial) from cofilial) " +
      " order by a.descrgrupo "