SELECT fil.cgccpf             AS cnpjOrigemDados,
       p.produto              AS id,
       Cast(CURRENT AS DATE)  AS dataCadastro,
       Cast(CURRENT AS DATE)  AS dataAtualizacao,
       ''                     AS SKU,
       p.descrprodut          AS descricao,
       Nvl(m.marcaf, ' ')     AS branding,
       p.unidvenda            AS um,
       'Produto'              AS tipo,
       p.listaforn            AS IdFornecedor,
       CASE Nvl(e.dtdesativacao, 0)
         WHEN 0 THEN 1
         ELSE 0
       END                    AS status,
       'ICMS'                 AS tributacao,
       0                      AS qtdDesconto,
       Nvl(p.reffabrica, ' ') AS codigoFabricante,
       l.descrlinha           AS segmento,
       g.descrgrupo           AS grupo,
       'Novo'                 AS estado,
       ' '                    AS modelo,
       ' '                    AS detalhes,
       Nvl(b.cean, ' ')       AS barras,
       'Normal'               AS situacao,
       p.classe,
       ' '                    AS cartela,
       'Mobilidade'           AS nomeCaracteristica1,
       CASE
         WHEN t.tipogiro = 'A' THEN 'Alto Giro'
         WHEN t.tipogiro = 'B' THEN 'Baixo Giro'
         WHEN t.tipogiro = 'I' THEN 'Intermitente'
         WHEN t.tipogiro = 'S' THEN 'Sem Giro'
         WHEN t.tipogiro = 'V' THEN 'Veiculo'
       END                    AS valorCaracteristica1,
       ''                     AS NomeCaracteristica2,
       ''                     AS valorCaracteristica2,
       ''                     AS NomeCaracteristica3,
       ''                     AS valorCaracteristica3,
       ''                     AS NomeCaracteristica4,
       ''                     AS valorCaracteristica4,
       ''                     AS NomeCaracteristica5,
       ''                     AS valorCaracteristica5,
       ''                     AS NomeCaracteristica6,
       ''                     AS valorCaracteristica6,
       ''                     AS NomeCaracteristica7,
       ''                     AS valorCaracteristica7
FROM   cmprodut p
       INNER JOIN cmestoqu e
               ON p.produto = e.produto
                  AND e.saldocontabil > 0
       INNER JOIN cofilial fil
               ON fil.filial = e.filial
       INNER JOIN cmgrupos g
               ON p.id_grupos = g.id_grupos
       INNER JOIN cmlinhas l
               ON l.linha = g.linha
       LEFT OUTER JOIN cffornec m
                    ON g.tppessoa = m.tppessoa
                       AND g.cgccpf = m.cgccpf
       LEFT OUTER JOIN cmclagir t
                    ON t.classeabc = e.classeabc
                       AND t.subclasse = e.subclasse
                       AND t.filial = e.filial
       LEFT OUTER JOIN cmproean b
                    ON b.produto = p.produto
ORDER  BY p.descrprodut 