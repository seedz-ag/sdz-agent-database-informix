"select fil.cgccpf as cnpjOrigemDados, cast(current as date) as dataCadastro, cast(current as date) as dataAtualizacao, p.cgccpf as id, " +
      "      p.cgccpf as documento, nvl(p.razaoSocial, ' ') as razaoSocial, nvl(p.nomeguerra, ' ') as nomeFantasia, e.fone as telefoneFixo1, ' ' as telefoneFixo2, nvl(e.celular, ' ') as celular, " +
      "      nvl(e.endeletronic, ' ') as email, e.endereco as logradouro, 0 as numero, e.bairro, e.cep, c.nomecidade as municipio, d.codigoibge as codibge, " +
      "      c.ufederacao as uf, nvl(p.inscestadual, ' ') as inscricaoEstadual  " +
      " from cffornec f " +
      " inner join cipessoa p " +
      "   on p.tppessoa = f.tppessoa " +
      "  and p.cgccpf   = f.cgccpf " +
      " inner join ciendere e " +
      "   on e.tppessoa = p.tppessoa " +
      "  and e.cgccpf = p.cgccpf " +
      "  and e.ativo = 'S' " +
      "  and e.principal = 'S' " +
      " inner join cicidade c " +
      "   on c.cidade = e.cidade " +
      " inner join cicidect d " +
      "   on d.cidade = c.cidade " +
      " inner join cofilial fil " +
      "   on fil.filial in (select min(filial) from cofilial) " +
      " where f.tppessoa in (1,2) "