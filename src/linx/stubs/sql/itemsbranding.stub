SELECT *
FROM   (SELECT DISTINCT fil.cgccpf            AS cnpjOrigemDados,
                        Cast(CURRENT AS DATE) AS dataCadastro,
                        Cast(CURRENT AS DATE) AS dataAtualizacao,
                        a.cgccpf              AS id,
                        Nvl(a.marcaf, ' ')    AS descricao
        FROM   cffornec a,
               cmgrupos b,
               cofilial fil
        WHERE  a.tppessoa = b.tppessoa
               AND a.cgccpf = b.cgccpf
               AND fil.filial IN (SELECT Min(filial)
                                  FROM   cofilial)
               AND Nvl(a.marcaf, ' ') <> ' '
        UNION ALL
        SELECT DISTINCT fil.cgccpf            AS cnpjOrigemDados,
                        Cast(CURRENT AS DATE) AS dataCadastro,
                        Cast(CURRENT AS DATE) AS dataAtualizacao,
                        a.cgccpf              AS id,
                        Nvl(a.marcaf, ' ')    AS descricao
        FROM   cffornec a,
               cxmodelo b,
               cofilial fil
        WHERE  a.tppessoa = b.tppessoa
               AND a.cgccpf = b.cgccpf
               AND fil.filial IN (SELECT Min(filial)
                                  FROM   cofilial)
               AND Nvl(a.marcaf, ' ') <> ' ') 