"Select fil.cgccpf as cnpjOrigemDados, f.cgccpf || f.seqproprieagr as id, cast(current as date) as dataCadastro, cast(current as date) as dataAtualizacao, " +
      " f.cgccpf as idCliente, f.nompropr as razaoSocial, 0 as cnpj, '' as celular, '' as telefone, '' as inscestadual, '' as atividade, " +
      " f.vlrareapropr as tamanho, 'ha' as unidadeMedidaTamanho " +
      "  from ciproagr f, cofilial fil " +
      " where fil.filial in (select min(filial) from cofilial) "