SELECT f.cgccpf                       AS cnpjOrigemDados,
       ''                             AS regraNegocio,
       id_nfitem                      AS id,
       Nvl(n.dttransacao, n.dtnota)   AS dataCadastro,
       n.dtnota                       AS dataAtualizacao,
       n.nronota                      AS numero,
       n.serienf                      AS serie,
       n.dtnota                       AS dataEmissao,
       '0'                            AS AceiteDuplicata,
       0                              AS ControleCpr,
       0                              AS idPedido,
       0                              AS idPedidoQion,
       ''                             AS dtPedido,
       1                              AS tipo,
       f.cgccpf                       AS documentoEmpresa,
       e.cgccpf                       AS documentoCliente,
       e.cgccpf                       AS idCliente,
       0                              AS idNotaFiscalOrigem,
       0                              AS notaFiscalOrigem,
       i.mercadoria                   AS iditem,
       i.descritem                    AS descricaoItem,
       ''                             AS brandingItem,
       '0'                            AS skuItem,
       i.unidade                      AS unidadeMedidaItem,
       ' '                            AS loteitem,
       i.quantidade                   AS quantidadeItem,
       i.valoritem                    AS valorUnitarioItem,
       ( i.quantidade * i.valoritem ) AS valorTotalItem,
       0                              AS percentualDescItem,
       i.valordesc                    AS valorDescProd,
       i.valoritem                    AS valorVendaItem,
       n.codfiscal                    AS cfopitem
FROM   cnnfitem i
       INNER JOIN cnnfcapa n
               ON n.id_nfcapa = i.id_nfcapa
       INNER JOIN ciendere e
               ON e.nro_endere = n.nro_endere
       INNER JOIN cofilial f
               ON f.filial = n.filial
WHERE  Year(n.dtnota) = Year(CURRENT) 