SELECT fil.cgccpf            AS cnpjOrigemDados,
       Cast(CURRENT AS DATE) AS dataCadastro,
       Cast(CURRENT AS DATE) AS dataAtualizacao,
       f.formapgto           AS id,
       f.descrforma          AS descricao
FROM   crforpgt f,
       cofilial fil
WHERE  fil.filial IN (SELECT Min(filial)
                      FROM   cofilial) 