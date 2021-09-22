"Select fil.cgccpf as cnpjOrigemDados,  e.nro_endere as id, cast(current as date) as dataCadastro, cast(current as date) as dataAtualizacao, " +
      "   e.cgccpf as idCliente, 0 as idPropriedade, e.cgccpf as documentoCliente, e.tipoendereco as tipo, e.cep, c.ufederacao as uf, c.nomecidade as municipio,  " +
      "   e.bairro, e.endereco as logradouro, 0 as numero, nvl(e.complemento, ' ') as complemento, d.codigoibge as codibge " +
      "      from  ciendere e " +
      "      inner join  clclient cli " +
      "        on cli.cgccpf = e.cgccpf " +
      "       and cli.tppessoa = e.tppessoa " +
      "      inner join cicidade c " +
      "        on  e.cidade =  c.cidade   " +
      "      inner join cicidect d " +
      "        on d.cidade 	=   e.cidade  " +
      "      inner join cofilial fil " +
      "        on fil.filial in (select min(filial) from cofilial) " +
      "      where e.tppessoa in (1,2) ")