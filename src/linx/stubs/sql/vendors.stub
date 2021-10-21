SELECT f.cgccpf                 AS cnpjOrigemDados,
       Cast(CURRENT AS DATE)    AS dataCadastro,
       Cast(CURRENT AS DATE)    AS dataAtualizacao,
       a.id_agente              AS id,
       p.cgccpf                 AS documento,
       p.nomepessoa             AS razaoSocial,
       e.fone                   AS telefoneFixo1,
       Nvl(e.fax, ' ')          AS telefoneFixo2,
       e.celular,
       Nvl(e.endeletronic, ' ') AS email,
       e.endereco               AS logradouro,
       0                        AS numero,
       e.bairro,
       e.cep,
       c.nomecidade,
       t.codigoibge             AS codibge,
       c.ufederacao,
       ' '                      AS regiao
FROM   coagente a
       INNER JOIN cosetor s
               ON s.id_setor = a.id_setor
                  AND s.tpsetor IN ( 'N', 'U', 'B' )
       INNER JOIN codeptos d
               ON d.id_deptos = s.id_deptos
       INNER JOIN codivisa v
               ON v.id_divisao = d.id_divisao
       INNER JOIN cofilial f
               ON f.filial = v.filial
       INNER JOIN cipessoa p
               ON p.tppessoa = a.tppessoa
                  AND p.cgccpf = a.cgccpf
       INNER JOIN cicadfis x
               ON x.cgccpf = p.cgccpf
                  AND x.tppessoa = p.tppessoa
       INNER JOIN ciendere e
               ON e.cgccpf = p.cgccpf
                  AND e.tppessoa = p.tppessoa
                  AND e.ativo = 'S'
                  AND e.principal = 'S'
       INNER JOIN cicidade c
               ON e.cidade = c.cidade
       INNER JOIN cicidect t
               ON t.cidade = c.cidade
WHERE  a.ativo = 'S' 