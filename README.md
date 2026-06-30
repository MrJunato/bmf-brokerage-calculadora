# Calculadora BMF Brokerage

Calculadora HTML pública para simular a receita incremental gerada pela BMF Brokerage para especialistas/vendedores e consultores/assessores.

## Como abrir localmente

Abra o arquivo `index.html` diretamente no navegador. O projeto usa apenas HTML, CSS e JavaScript puro, sem backend e sem dependências externas.

## O que a calculadora simula

- Receita atual do especialista.
- Vendas incrementais originadas pela BMF.
- Venda incremental líquida para o especialista após comissão.
- Receita total estimada do especialista com BMF.
- Receita nova para o consultor como cross-sell.
- Comissão como custo de aquisição da venda incremental.
- Detalhes operacionais da plataforma, incluindo impostos, custos e resultado.
- Resultados por categoria e consolidado total.

## Premissas iniciais

As premissas vieram do plano de criação da calculadora BMF Brokerage:

| Categoria | Comissão total padrão |
| --- | ---: |
| Carro de luxo | 5% |
| Barco | 3% |
| Aeronave | 1% |

O split inicial da comissão é 50% para a plataforma e 50% para o consultor.
O imposto estimado padrão é 9,65% sobre a receita da plataforma e pode ser editado por categoria.
A comissão incide apenas sobre vendas originadas pela BMF, não sobre as vendas atuais do especialista.

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
