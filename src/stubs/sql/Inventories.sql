SELECT fil.filial             AS cnpjOrigemDados,
       CURRENT                AS dataAtualizacao,
       e.produto              AS iditem,
       p.descrprodut          AS descricaoItem,
       Nvl(v.precopublico, 0) AS vlrUnitario,
       e.rua
       || '-'
       || e.prateleira
       || '-'
       || e.gaveta            AS armazem,
       e.saldocontabil        AS QtdTotal,
       e.valorcontabil        AS vlrTotal,
       0                      AS qtdPedidaVenda,
       0                      AS QtdReservada,
       0                      AS QtdPrevisaoEntrada,
       e.dtultsaid            AS dtUltimaVenda,
       e.dtultentr            AS dtUltimaCompra
FROM   cmestoqu e
       INNER JOIN cmprodut p
               ON e.produto = p.produto
       INNER JOIN cofilial fil
               ON e.filial = fil.filial
       LEFT OUTER JOIN cmpreest v
                    ON v.filial = e.filial
                       AND v.produto = e.produto
                       AND dtinicio <= Cast(CURRENT AS DATE)
                       AND ( dtfim IS NULL
                              OR dtfim >= Cast(CURRENT AS DATE) )
WHERE  e.saldocontabil > 0 