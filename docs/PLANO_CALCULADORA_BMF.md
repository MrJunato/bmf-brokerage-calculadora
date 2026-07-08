# Plano da Calculadora BMF Brokerage

## Objetivo

Criar uma calculadora HTML pública para simular o resultado econômico aproximado de vendas intermediadas pela BMF Brokerage.

A comissão simulada é a receita bruta do especialista/vendedor sobre o GMV. A BMF captura um take rate dessa comissão e divide esse repasse entre plataforma e consultor.

## Premissas financeiras iniciais

| Categoria | Comissão do especialista sobre GMV | Observação |
| --- | ---: | --- |
| Carro de luxo | 5% | Melhor potencial comercial e ciclo potencialmente mais curto. |
| Barco | 3% | Boa chance de tração inicial. |
| Aeronave | 1% | Maior ticket, ciclo mais longo e operação mais complexa. |

| Parâmetro | Default |
| --- | ---: |
| Take rate BMF sobre a comissão do especialista | 15% |
| Split da plataforma sobre o repasse BMF | 50% |
| Split do consultor sobre o repasse BMF | 50% |
| Imposto estimado sobre receita da plataforma | 9,65% |

## Fórmulas base

```text
GMV atual = ticket médio * vendas atuais
GMV incremental = ticket médio * novas vendas BMF

Comissão atual do especialista = GMV atual * percentual de comissão do especialista
Comissão bruta incremental = GMV incremental * percentual de comissão do especialista
Repasse BMF = comissão bruta incremental * take rate BMF sobre a comissão

Receita da plataforma = repasse BMF * split da plataforma
Receita do consultor = repasse BMF * split do consultor
Comissão líquida retida pelo especialista = comissão bruta incremental - repasse BMF
Comissão total estimada do especialista = comissão atual + comissão líquida incremental

Take rate BMF sobre a comissão = repasse BMF / comissão bruta incremental
Take rate da plataforma sobre GMV = receita da plataforma / GMV incremental
Take rate do consultor sobre GMV = receita do consultor / GMV incremental

Resultado líquido da plataforma = receita da plataforma - impostos - custos variáveis - custos fixos
```

## Entradas e saídas

A calculadora deve permitir editar ticket médio, vendas atuais, novas vendas via BMF, comissão do especialista, take rate sobre a comissão, split do repasse BMF, imposto estimado e custos operacionais.

A tela deve mostrar GMV atual, GMV incremental, comissão atual do especialista, comissão bruta incremental, repasse BMF, comissão líquida retida pelo especialista, receita da plataforma, receita do consultor, take rates e resultado líquido da plataforma.

## Interface esperada

A primeira tela deve ser a calculadora, sem landing page.

Componentes mínimos:

- abas para editar carro de luxo, barco e aeronave;
- campo de ticket médio;
- campo de vendas atuais;
- campo de novas vendas via BMF;
- campo de comissão do especialista;
- campo de take rate sobre a comissão;
- campo de split da plataforma;
- campo de split do consultor;
- campos opcionais de impostos, custos variáveis e custos fixos;
- blocos de resultado para especialista, consultor e plataforma;
- visão consolidada;
- alerta para percentual inválido;
- botão para restaurar premissas padrão.

## Regras de cálculo

```text
gmvAtual = ticketMedio * vendasAtuais
gmvIncremental = ticketMedio * novasVendasBmf
comissaoAtualEspecialista = gmvAtual * (comissaoEspecialista / 100)
comissaoBrutaIncremental = gmvIncremental * (comissaoEspecialista / 100)
repasseBmf = comissaoBrutaIncremental * (takeRateComissao / 100)
receitaPlataforma = repasseBmf * (splitPlataforma / 100)
receitaConsultor = repasseBmf * (splitConsultor / 100)
comissaoLiquidaIncremental = comissaoBrutaIncremental - repasseBmf
comissaoTotalEspecialistaComBmf = comissaoAtualEspecialista + comissaoLiquidaIncremental
impostos = receitaPlataforma * (impostoPlataforma / 100)
resultadoLiquidoPlataforma = receitaPlataforma - impostos - custosVariaveis - custosFixos
```

## Testes manuais

| Cenário | Entrada | Esperado |
| --- | --- | --- |
| Carro de luxo padrão | R$ 1.000.000, comissão 5%, take rate 15%, split 50/50 | Comissão bruta de R$ 50.000; repasse BMF de R$ 7.500; plataforma R$ 3.750; consultor R$ 3.750; especialista retém R$ 42.500. |
| Barco padrão | R$ 2.000.000, comissão 3%, take rate 15%, split 50/50 | Comissão bruta de R$ 60.000; repasse BMF de R$ 9.000; plataforma R$ 4.500; consultor R$ 4.500; especialista retém R$ 51.000. |
| Aeronave padrão | R$ 10.000.000, comissão 1%, take rate 15%, split 50/50 | Comissão bruta de R$ 100.000; repasse BMF de R$ 15.000; plataforma R$ 7.500; consultor R$ 7.500; especialista retém R$ 85.000. |
| Take rate alterado | Take rate sobre a comissão diferente de 15% | Repasse BMF, receita da plataforma, receita do consultor e retenção do especialista mudam proporcionalmente. |
| Consolidado | Três categorias preenchidas | Somar GMV, comissão bruta, repasse BMF, receita do consultor, receita da plataforma e comissão líquida retida. |

## Publicação

O projeto é estático e pode ser publicado no GitHub Pages a partir da branch `main`, pasta `/root`.
