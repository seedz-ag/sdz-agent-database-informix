SELECT fil.cgccpf   AS cnpjOrigemDados,
       CURRENT      AS dataCadastro,
       CURRENT      AS dataAtualizacao,
       a.id_grupos  AS id,
       a.descrgrupo AS descricao
FROM   cmgrupos a,
       cofilial fil
WHERE  fil.filial IN (SELECT Min(filial)
                      FROM   cofilial)
ORDER  BY a.descrgrupo 