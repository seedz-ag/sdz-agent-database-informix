SELECT f.cgccpf      AS cnpjOrigemDadosFaturamento,
       n.id_nfcapa   AS id,
       n.dttransacao AS dataCadastroFaturamento,
       n.dtnota      AS dataAtualizacaoFaturamento,
       n.cgccpf      AS idCliente,
       n.cgccpf      AS documentoCliente,
       n.nronota     AS numeroNfFaturamento,
       n.serienf     AS serieNFFaturamento,
       n.codfiscal   AS cfopFaturamento,
       n.dtnota      AS dtEmissaoFaturamento,
       n.dttransacao AS dtSaidaFaturamento,
       CASE n.cancelada
         WHEN 'N' THEN 'Concluida'
         WHEN 'S' THEN 'Cancelada'
         WHEN 'D' THEN 'Denegada'
         WHEN 'I' THEN 'Inutilizada'
         ELSE 'Pendente'
       END           AS statusNfFaturamento,
       c.nomecidade  AS municipioEntregaFaturamento,
       c.ufederacao  AS ufEntregaFaturamento,
       n.valoritem   AS vlrTotalProdutosFaturamento,
       n.totnfiscal  AS vlrTotalNfFaturamento,
       CASE
         WHEN v.devolucao = 'S' THEN 'D'
         WHEN v.complemento = 'S' THEN 'C'
         ELSE 'S'
       END           AS tipoFaturamento
FROM   cnnfcapa n
       INNER JOIN cofilial f
               ON n.filial = f.filial
       INNER JOIN ciendere e
               ON e.nro_endere = n.nro_endere
       INNER JOIN cicidade c
               ON c.cidade = e.cidade
       INNER JOIN cttransa t
               ON t.transacao = n.transacao
                  AND t.mvtotransacao = 'S'
       INNER JOIN cttptran v
               ON v.tipotransacao = t.tipotransacao
WHERE  Year(n.dtnota) = Year(CURRENT)
ORDER  BY n.nronota DESC 