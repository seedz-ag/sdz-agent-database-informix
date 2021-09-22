SELECT f.cgccpf               AS cnpjOrigemDados,
       o.dtdocto              AS dataCadastro,
       Cast(CURRENT AS DATE)  AS dataAtualizacao,
       o.id_ordpag            AS titulo,
       p.cgccpf               AS idFornecedor,
       Nvl(p.nomepessoa, ' ') AS nomeFornecedor,
       o.dtdocto              AS dtEmissao,
       o.nrodocto             AS documento,
       o.serieop              AS serie,
       o.dtvenctoor           AS dtVencimentoOriginal,
       o.dtvencto             AS dtVencimentoProrrogado,
       ' '                    AS competencia,
       o.valor                AS vlrBruto,
       0                      AS vlrAcrescimos,
       0                      AS vlrDescontos,
       o.valor                AS vlrLiquido,
       o.seqdocto             AS parcela,
       CASE o.liquidado
         WHEN 'S' THEN 'Liquidado'
         WHEN 'N' THEN 'Aberto'
       END                    AS situacao,
       Nvl(q.dtpagto, ' ')    AS dtbaixa
FROM   cpordpag o
       INNER JOIN ciendere e
               ON e.nro_endere = o.nro_endere
       INNER JOIN cipessoa p
               ON p.tppessoa = e.tppessoa
                  AND p.cgccpf = e.cgccpf
       INNER JOIN cofilial f
               ON f.filial = o.filial
       LEFT OUTER JOIN cppagtos q
                    ON q.id_ordpag = o.id_ordpag
WHERE  o.liquidado = 'N'
       AND o.dtdocto = Cast(CURRENT AS DATE)