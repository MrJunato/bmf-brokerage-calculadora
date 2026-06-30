# Plano da Calculadora BMF Brokerage

## Objetivo

Criar uma calculadora HTML pública para simular o resultado econômico aproximado de vendas intermediadas pela BMF Brokerage.

O arquivo serve como material de transferência para o futuro projeto `bmf-brokerage-calculadora`, que deve ser criado fora do `mrjunato_brain` e publicado via GitHub Pages.

## Contexto do negócio

A BMF Brokerage é uma plataforma B2B2C para venda de ativos high-ticket voltados a clientes de alta renda. O modelo conecta:

- compradores de alta renda;
- consultores de confiança, como assessores de investimento, family offices, consultores patrimoniais e outros profissionais de relacionamento;
- especialistas, lojas ou brokers que conduzem a venda técnica;
- plataforma BMF, responsável por organizar a oportunidade, registrar origem do lead e acompanhar a negociação.

A tese nasceu da experiência do fundador no mercado financeiro, atuando no segmento B2B de assessoria de investimentos da XP. A dor identificada foi a desconexão entre profissionais de relacionamento, que acessam oportunidades qualificadas, e especialistas de ativos de alto valor, que precisam de leads melhores para concretizar vendas.

## Premissas financeiras iniciais

A comissão é paga pela loja, broker ou especialista e distribuída entre plataforma e consultor. O especialista recebe o valor líquido da venda após a comissão acordada.

Premissas padrão por categoria:

| Categoria | Comissão total padrão | Observação |
| --- | ---: | --- |
| Carro de luxo | 5% | Melhor margem e ciclo potencialmente mais curto. |
| Barco | 3% | Boa chance de tração inicial. |
| Aeronave | 1% | Maior ticket, ciclo mais longo e operação mais complexa. |

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
GMV = valor da venda * quantidade de vendas
Comissão total = GMV * percentual de comissão total
Receita da plataforma = comissão total * percentual da plataforma
Receita do consultor = comissão total * percentual do consultor
Resultado do especialista = GMV - comissão total
Take rate total sobre GMV = comissão total / GMV
Take rate da plataforma sobre GMV = receita da plataforma / GMV
Margem de contribuição da plataforma = receita da plataforma - custos variáveis
Resultado mensal da plataforma = margem de contribuição da plataforma - custos fixos
```

## Entradas da calculadora

A calculadora deve permitir simular:

- categoria;
- valor da venda;
- quantidade de vendas;
- percentual de comissão total;
- percentual da comissão destinado à plataforma;
- percentual da comissão destinado ao consultor;
- custos variáveis opcionais da plataforma;
- custos fixos mensais opcionais;
- cenário: conservador, base ou agressivo.

## Saídas esperadas

A tela deve mostrar:

- GMV total;
- comissão total;
- receita da plataforma;
- receita do consultor;
- resultado líquido do especialista, loja ou broker;
- take rate total;
- take rate da plataforma;
- margem de contribuição da plataforma;
- resultado mensal estimado após custos fixos, quando informado;
- valor não alocado, caso o split plataforma + consultor seja menor que 100%.

## Estrutura recomendada do projeto

Criar um repositório separado do `mrjunato_brain`:

```text
C:\Users\renat\OneDrive\Projetos\bmf-brokerage-calculadora
```

Nome sugerido do repositório GitHub:

```text
bmf-brokerage-calculadora
```

Estrutura recomendada:

```text
bmf-brokerage-calculadora/
  index.html
  styles.css
  script.js
  README.md
  docs/
    contexto-bmf.md
    PLANO_CALCULADORA_BMF.md
```

Para a primeira versão, usar HTML, CSS e JavaScript puro. Não usar framework, backend ou dependências externas.

## Interface esperada

A primeira tela deve ser a calculadora, sem landing page.

Componentes mínimos:

- seletor de categoria: carro de luxo, barco, aeronave e personalizado;
- campo de valor da venda;
- campo de quantidade de vendas;
- campo de comissão total;
- campo de split da plataforma;
- campo de split do consultor;
- campos opcionais de custos variáveis e custos fixos;
- blocos de resultado para GMV, comissão total, plataforma, consultor e especialista;
- alerta para split inválido;
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
carro_luxo.comissaoTotal = 5
barco.comissaoTotal = 3
aeronave.comissaoTotal = 1
```

Default de split inicial:

```text
plataforma = 50% da comissão total
consultor = 50% da comissão total
```

Implementação sugerida:

```text
gmvTotal = valorVenda * quantidadeVendas
comissaoTotalValor = gmvTotal * (comissaoTotalPercentual / 100)
receitaPlataforma = comissaoTotalValor * (splitPlataforma / 100)
receitaConsultor = comissaoTotalValor * (splitConsultor / 100)
resultadoEspecialista = gmvTotal - comissaoTotalValor
margemContribuicaoPlataforma = receitaPlataforma - custosVariaveis
resultadoMensalPlataforma = margemContribuicaoPlataforma - custosFixos
takeRateTotal = comissaoTotalValor / gmvTotal
takeRatePlataforma = receitaPlataforma / gmvTotal
valorNaoAlocado = comissaoTotalValor * ((100 - splitPlataforma - splitConsultor) / 100)
```

## Validações

- Valor da venda não pode ser negativo.
- Quantidade de vendas deve ser pelo menos 1.
- Percentuais não podem ser negativos.
- Split da plataforma + split do consultor não pode passar de 100%.
- Se o split somar mais de 100%, exibir erro e não calcular.
- Se o split somar menos de 100%, calcular e exibir o valor não alocado.
- Campo personalizado deve permitir alterar comissão total manualmente.
- Valores monetários devem ser exibidos em Real brasileiro.
- Percentuais devem ser exibidos com até duas casas decimais.

## Testes manuais

Cenários mínimos:

| Cenário | Entrada | Esperado |
| --- | --- | --- |
| Carro de luxo padrão | R$ 1.000.000, comissão 5%, split 50/50 | Comissão total de R$ 50.000; plataforma R$ 25.000; consultor R$ 25.000; especialista R$ 950.000. |
| Barco padrão | R$ 2.000.000, comissão 3%, split 50/50 | Comissão total de R$ 60.000; plataforma R$ 30.000; consultor R$ 30.000; especialista R$ 1.940.000. |
| Aeronave padrão | R$ 10.000.000, comissão 1%, split 50/50 | Comissão total de R$ 100.000; plataforma R$ 50.000; consultor R$ 50.000; especialista R$ 9.900.000. |
| Split 70/30 | Qualquer categoria, plataforma 70%, consultor 30% | Comissão distribuída integralmente sem valor não alocado. |
| Split abaixo de 100% | Plataforma 40%, consultor 40% | Exibir 20% da comissão como valor não alocado. |
| Split inválido | Plataforma 80%, consultor 40% | Exibir erro, porque soma 120%. |
| Múltiplas vendas | Quantidade maior que 1 | GMV e resultados multiplicados pela quantidade. |
| Custos informados | Custos variáveis e fixos preenchidos | Exibir margem de contribuição e resultado mensal da plataforma. |

## README do projeto

O `README.md` do novo projeto deve explicar:

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

## Observações finais

O projeto da calculadora não deve ser criado dentro do `mrjunato_brain`, porque o brain é uma base de conhecimento privada e estratégica. A calculadora será um artefato público, com histórico Git e GitHub Pages próprios.

Este arquivo pode ser copiado para `docs/PLANO_CALCULADORA_BMF.md` no novo repositório.
