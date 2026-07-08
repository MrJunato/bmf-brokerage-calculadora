# Plano da Calculadora BMF Brokerage

## Objetivo

Criar uma calculadora HTML pública para simular o resultado econômico aproximado de vendas intermediadas pela BMF Brokerage.

O arquivo serve como material de transferência para o projeto `bmf-brokerage-calculadora`, publicado como site estático via GitHub Pages.

## Contexto do negócio

A BMF Brokerage é uma plataforma B2B2C para venda de ativos high-ticket voltados a clientes de alta renda. O modelo conecta:

- compradores de alta renda;
- consultores de confiança, como assessores de investimento, family offices, consultores patrimoniais e outros profissionais de relacionamento;
- especialistas, lojas ou brokers que conduzem a venda técnica;
- plataforma BMF, responsável por organizar a oportunidade, registrar origem do lead e acompanhar a negociação.

A comissão simulada é a receita bruta do especialista/vendedor sobre a venda. A BMF captura um take rate dessa comissão e divide esse repasse entre plataforma e consultor.

## Premissas financeiras iniciais

Premissas padrão por categoria:

| Categoria | Comissão do especialista sobre GMV | Observação |
| --- | ---: | --- |
| Carro de luxo | 5% | Melhor potencial comercial e ciclo potencialmente mais curto. |
| Barco | 3% | Boa chance de tração inicial. |
| Aeronave | 1% | Maior ticket, ciclo mais longo e operação mais complexa. |

Premissas padrão adicionais:

| Parâmetro | Default |
| --- | ---: |
| Take rate BMF sobre a comissão do especialista | 15% |
| Split da plataforma sobre o repasse BMF | 50% |
| Split do consultor sobre o repasse BMF | 50% |
| Imposto estimado sobre receita da plataforma | 9,65% |

Categorias futuras possíveis:

- imóveis;
- relógios;
- obras de arte;
- seguros;
- crédito;
- consórcios;
- outros ativos de alto valor.

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

## Entradas da calculadora

A calculadora deve permitir simular por categoria:

- ticket médio;
- vendas atuais;
- novas vendas via BMF;
- percentual de comissão do especialista sobre GMV;
- take rate BMF sobre a comissão do especialista;
- split do repasse BMF destinado à plataforma;
- split do repasse BMF destinado ao consultor;
- imposto estimado sobre a receita da plataforma;
- custos variáveis opcionais da plataforma;
- custos fixos opcionais.

## Saídas esperadas

A tela deve mostrar:

- GMV atual;
- GMV incremental;
- comissão atual do especialista;
- comissão bruta incremental;
- repasse BMF;
- comissão líquida retida pelo especialista;
- receita da plataforma;
- receita do consultor;
- take rate BMF sobre a comissão;
- take rate da plataforma sobre GMV;
- take rate do consultor sobre GMV;
- resultado líquido da plataforma após impostos e custos;
- resultados por categoria e consolidado.

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

Direção visual:

- visual claro, sóbrio e financeiro;
- tipografia limpa;
- bons espaçamentos;
- destaque para números;
- cores discretas para plataforma, consultor e especialista;
- layout responsivo para celular e desktop.

## Regras de cálculo

Defaults por categoria:

```text
carro_luxo.comissaoEspecialista = 5
barco.comissaoEspecialista = 3
aeronave.comissaoEspecialista = 1
```

Defaults gerais por categoria:

```text
takeRateComissao = 15
splitPlataforma = 50
splitConsultor = 50
impostoPlataforma = 9,65
```

Implementação sugerida:

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

## Validações

- Ticket médio não pode ser negativo.
- Vendas atuais e novas vendas via BMF não podem ser negativas.
- Percentuais não podem ser negativos.
- Comissão do especialista, take rate, split e imposto devem ficar entre 0% e 100%.
- Custos não podem ser negativos.
- Valores monetários devem ser exibidos em Real brasileiro.
- Percentuais devem ser exibidos com até duas casas decimais.

## Testes manuais

Cenários mínimos:

| Cenário | Entrada | Esperado |
| --- | --- | --- |
| Carro de luxo padrão | R$ 1.000.000, comissão 5%, take rate 15%, split 50/50 | Comissão bruta de R$ 50.000; repasse BMF de R$ 7.500; plataforma R$ 3.750; consultor R$ 3.750; especialista retém R$ 42.500. |
| Barco padrão | R$ 2.000.000, comissão 3%, take rate 15%, split 50/50 | Comissão bruta de R$ 60.000; repasse BMF de R$ 9.000; plataforma R$ 4.500; consultor R$ 4.500; especialista retém R$ 51.000. |
| Aeronave padrão | R$ 10.000.000, comissão 1%, take rate 15%, split 50/50 | Comissão bruta de R$ 100.000; repasse BMF de R$ 15.000; plataforma R$ 7.500; consultor R$ 7.500; especialista retém R$ 85.000. |
| Split 70/30 | Qualquer categoria, plataforma 70%, consultor 30% | O repasse BMF é distribuído integralmente entre plataforma e consultor. |
| Take rate alterado | Take rate sobre a comissão diferente de 15% | Repasse BMF, receita da plataforma, receita do consultor e retenção do especialista mudam proporcionalmente. |
| Custos informados | Custos variáveis e fixos preenchidos | Exibir resultado líquido da plataforma após impostos e custos. |
| Consolidado | Três categorias preenchidas | Somar GMV, comissão bruta, repasse BMF, receita do consultor, receita da plataforma e comissão líquida retida. |

## README do projeto

O `README.md` deve explicar:

- objetivo da calculadora;
- como abrir localmente;
- como publicar no GitHub Pages;
- aviso de que os cálculos são aproximados;
- origem das premissas iniciais;
- observação de que a ferramenta não substitui contrato comercial, análise fiscal ou modelo financeiro completo.

## Publicação no GitHub Pages

Configuração recomendada:

- repositório: `bmf-brokerage-calculadora`;
- branch: `main`;
- source: GitHub Pages from branch;
- pasta: `/root`;
- projeto sem backend;
- arquivos estáticos na raiz.

URL esperada:

```text
https://SEU_USUARIO.github.io/bmf-brokerage-calculadora/
```
