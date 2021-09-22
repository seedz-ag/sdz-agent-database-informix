SELECT fil.cgccpf               AS cnpjOrigemDados,
       Cast(CURRENT AS DATE)    AS dataCadastro,
       Cast(CURRENT AS DATE)    AS dataAtualizacao,
       p.cgccpf                 AS id,
       p.cgccpf                 AS documento,
       Nvl(p.razaosocial, ' ')  AS razaoSocial,
       Nvl(p.nomeguerra, ' ')   AS nomeFantasia,
       e.fone                   AS telefoneFixo1,
       ' '                      AS telefoneFixo2,
       Nvl(e.celular, ' ')      AS celular,
       Nvl(e.endeletronic, ' ') AS email,
       e.endereco               AS logradouro,
       0                        AS numero,
       e.bairro,
       e.cep,
       c.nomecidade             AS municipio,
       d.codigoibge             AS codibge,
       c.ufederacao             AS uf,
       Nvl(p.inscestadual, ' ') AS inscricaoEstadual
FROM   cffornec f
       INNER JOIN cipessoa p
               ON p.tppessoa = f.tppessoa
                  AND p.cgccpf = f.cgccpf
       INNER JOIN ciendere e
               ON e.tppessoa = p.tppessoa
                  AND e.cgccpf = p.cgccpf
                  AND e.ativo = 'S'
                  AND e.principal = 'S'
       INNER JOIN cicidade c
               ON c.cidade = e.cidade
       INNER JOIN cicidect d
               ON d.cidade = c.cidade
       INNER JOIN cofilial fil
               ON fil.filial IN (SELECT Min(filial)
                                 FROM   cofilial)
WHERE  f.tppessoa IN ( 1, 2 ) 