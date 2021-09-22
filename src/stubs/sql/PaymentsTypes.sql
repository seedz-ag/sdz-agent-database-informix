"Select fil.cgccpf as cnpjOrigemDados, cast(current as date) as dataCadastro, cast(current as date) as dataAtualizacao, f.formapgto as id, f.descrforma as descricao " +
      " from crforpgt f, cofilial fil " +
      " where fil.filial in (select min(filial) from cofilial) "