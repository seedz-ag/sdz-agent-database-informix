 " Select f.cgccpf as cnpjOrigemDados, cast(current as date) as dataCadastro, cast(current as date) as dataAtualizacao,  " +
      "  a.id_agente as idFuncionario, p.cgccpf as documento, p.nomepessoa as nome, e.celular, nvl(e.endeletronic, ' ') as email,  " +
      "         x.sexo, p.dtfundacao as dtnascimento, 0 as cnpjVinculado	  " +
      "   from coagente a " +
      "   inner join cosetor s " +
      "      on s.id_setor = a.id_setor " +
      "     inner join codeptos d " +
      "      on d.id_deptos = s.id_deptos " +
      "     inner join codivisa v " +
      "      on v.id_divisao = d.id_divisao " +
      "     inner join cofilial f " +
      "      on f.filial = v.filial " +
      "     inner join cipessoa p " +
      "     on p.tppessoa = a.tppessoa " +
      "    and p.cgccpf = a.cgccpf " +
      "     inner join cicadfis x " +
      "            on x.cgccpf = p.cgccpf " +
      "           and x.tppessoa = p.tppessoa " +
      "     inner join ciendere e " +
      "          on e.cgccpf = p.cgccpf " +
      "        and  e.tppessoa = p.tppessoa " +
      "        and e.ativo = 'S' " +
      "        and e.principal = 'S' " +
      "     inner join cicidade c " +
      "        on e.cidade = c.cidade " +
      "     inner join cicidect t " +
      "        on t.cidade = c.cidade " +
      "   where a.ativo = 'S' "