# Calculadora BMF Brokerage

Calculadora HTML pública para simular a receita de comissão gerada em vendas originadas pela BMF Brokerage para especialistas/vendedores, consultores/assessores e plataforma.

## Como abrir localmente

Abra o arquivo `index.html` diretamente no navegador. O projeto usa apenas HTML, CSS e JavaScript puro, sem backend e sem dependências externas.

## O que a calculadora simula

- GMV atual e GMV incremental originado pela BMF.
- Comissão bruta do especialista sobre as vendas atuais e incrementais.
- Repasse BMF calculado como take rate sobre a comissão do especialista.
- Comissão líquida retida pelo especialista depois do repasse BMF.
- Receita nova para o consultor como participação no repasse BMF.
- Receita da plataforma como participação no repasse BMF.
- Detalhes operacionais da plataforma, incluindo impostos, custos e resultado.
- Resultados por categoria e consolidado total.

## Premissas iniciais

As premissas vieram do plano de criação da calculadora BMF Brokerage:

| Categoria | Comissão do especialista sobre GMV |
| --- | ---: |
| Carro de luxo | 5% |
| Barco | 3% |
| Aeronave | 1% |

O take rate padrão da BMF é 15% sobre a comissão bruta do especialista.
O split inicial do repasse BMF é 50% para a plataforma e 50% para o consultor.
O imposto estimado padrão é 9,65% sobre a receita da plataforma e pode ser editado por categoria.
A comissão do especialista incide apenas sobre vendas originadas pela BMF para o cálculo incremental.

## Modelo de cálculo

```text
GMV atual = ticket médio * vendas atuais
GMV incremental = ticket médio * novas vendas BMF

Comissão atual do especialista = GMV atual * comissão do especialista
Comissão bruta incremental = GMV incremental * comissão do especialista
Repasse BMF = comissão bruta incremental * take rate sobre a comissão

Receita da plataforma = repasse BMF * split da plataforma
Receita do consultor = repasse BMF * split do consultor
Comissão líquida retida pelo especialista = comissão bruta incremental - repasse BMF

Resultado líquido da plataforma =
  receita da plataforma - impostos - custos variáveis - custos fixos
```

## Publicação no GitHub Pages

1. Crie um repositório chamado `bmf-brokerage-calculadora`.
2. Envie estes arquivos para a branch `main`.
3. No GitHub, acesse `Settings > Pages`.
4. Configure `Deploy from a branch`, branch `main`, pasta `/root`.
5. A URL esperada segue o formato:

```text
https://SEU_USUARIO.github.io/bmf-brokerage-calculadora/
```

## Aviso

Os cálculos são aproximados e servem para simulação comercial inicial. A ferramenta não substitui contrato comercial, análise fiscal, análise jurídica ou modelo financeiro completo.
