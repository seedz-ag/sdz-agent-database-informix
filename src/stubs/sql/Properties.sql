SELECT fil.cgccpf            AS cnpjOrigemDados,
       f.cgccpf
       || f.seqproprieagr    AS id,
       Cast(CURRENT AS DATE) AS dataCadastro,
       Cast(CURRENT AS DATE) AS dataAtualizacao,
       f.cgccpf              AS idCliente,
       f.nompropr            AS razaoSocial,
       0                     AS cnpj,
       ''                    AS celular,
       ''                    AS telefone,
       ''                    AS inscestadual,
       ''                    AS atividade,
       f.vlrareapropr        AS tamanho,
       'ha'                  AS unidadeMedidaTamanho
FROM   ciproagr f,
       cofilial fil
WHERE  fil.filial IN (SELECT Min(filial)
                      FROM   cofilial) 