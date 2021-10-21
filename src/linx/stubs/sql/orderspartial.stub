SELECT f.cgccpf      AS cnpjOrigemDadospedido,
       ' '           AS regraNegocio,
       o.id_orccap   AS id,
       CURRENT       AS dataCadastro,
       CURRENT       AS dataAtualizacao,
       o.nroorcament AS IdPedidoQion,
       o.dtorcament  AS dataEmissao,
       0             AS status,
       p.cgccpf      AS idCliente,
       p.cgccpf      AS documentocliente,
       f.cgccpf      AS documentoEmpresa,
       o.dtprevista  AS dataEntrega,
       'Normal'      AS tipo,
       o.id_agente   AS vendedor1,
       0             AS vendedor2,
       0             AS vendedor3,
       o.descmerc    AS vlrDesconto,
       o.condpgto    AS condPagamento,
       0             AS VlrParcela1,
       ' '           AS vencParcela1,
       0             AS VlrParcela2,
       ' '           AS vencParcela2,
       0             AS VlrParcela3,
       ' '           AS vencParcela3,
       0             AS VlrParcela4,
       ' '           AS vencParcela4,
       0             AS VlrParcela5,
       ' '           AS vencParcela5,
       0             AS VlrParcela6,
       ' '           AS vencParcela6,
       0             AS VlrParcela7,
       ' '           AS vencParcela7,
       0             AS VlrParcela8,
       ' '           AS vencParcela8,
       0             AS VlrParcela9,
       ' '           AS vencParcela9,
       o.valorfrete  AS vlrFrete
FROM   cnorccap o
       INNER JOIN ciendere e
               ON e.nro_endere = o.nro_endere
       INNER JOIN cipessoa p
               ON p.tppessoa = e.tppessoa
                  AND p.cgccpf = e.cgccpf
       INNER JOIN cofilial f
               ON f.filial = o.filial
WHERE  o.dtorcament = Cast(CURRENT AS DATE) 