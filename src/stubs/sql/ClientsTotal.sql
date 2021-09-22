SELECT fil.cgccpf                  AS cnpjOrigemDados,
       Cast(CURRENT AS DATE)       AS dataCadastro,
       Cast(CURRENT AS DATE)       AS dataAtualizacao,
       p.cgccpf                    AS id,
       p.nomepessoa                AS razaoSocial,
       Nvl(p.nomeguerra, '')       AS nomeFantasia,
       p.cgccpf                    AS documento,
       1                           AS situacaoFinanceira,
       e.celular,
       e.fone                      AS telefoneFixo,
       Nvl(f.fone, '')             AS telefoneFixo2,
       Nvl(e.endeletronic, '')     AS email,
       Nvl(f.sexo, 'O')            AS sexo,
       Nvl(p.dtfundacao, ' ')      AS dataNascimento,
       Nvl(p.inscestadual, '')     AS inscEstadual,
       y.nomepais                  AS pais,
       ''                          AS nomeContato,
       Nvl(p.nrocarteira, ' ')     AS rg,
       Nvl(p.inscmunicip, ' ')     AS inscMunicipal,
       0                           AS vendedor1,
       0                           AS vendedor2,
       ''                          AS tipo,
       ''                          AS grupo,
       cli.conceito                AS classe,
       ''                          AS site,
       ''                          AS grupoempresarial,
       Nvl(e.inscprodutor, '')     AS car,
       Nvl(i.simplesnacional, ' ') AS simples,
       Nvl(i.icms, ' ')            AS conticms,
       1                           AS recir,
       ''                          AS origem,
       ''                          AS regiao
FROM   cipessoa p
       INNER JOIN clclient cli
               ON cli.cgccpf = p.cgccpf
       INNER JOIN cofilial fil
               ON fil.filial IN (SELECT Min(filial)
                                 FROM   cofilial)
       INNER JOIN ciendere e
               ON e.tppessoa = p.tppessoa
                  AND e.cgccpf = p.cgccpf
                  AND e.ativo = 'S'
                  AND e.principal = 'S'
       INNER JOIN cicidect x
               ON x.cidade = e.cidade
       INNER JOIN cipais y
               ON y.codpais = x.codpais
       LEFT OUTER JOIN cicadfis f
                    ON f.tppessoa = p.tppessoa
                       AND f.cgccpf = p.cgccpf
       LEFT OUTER JOIN ciisento i
                    ON i.tppessoa = p.tppessoa
                       AND i.cgccpf = p.cgccpf
WHERE  p.tppessoa IN ( 1, 2 )
ORDER  BY p.nomepessoa 