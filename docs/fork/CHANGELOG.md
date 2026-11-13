# Histórico das modificações do fork

Este registro descreve nossas entregas. O changelog do Deskcomm original
continua em [`../../CHANGELOG.md`](../../CHANGELOG.md).

## 0.2.0 — 2026-11-13

### Base importada

- Deskcomm `1.109.0`, com a `main` fixada em
  [`f7c5bae00ae48badffc7c9149f39fa383fd0501a`](https://github.com/melgarafael/DeskcommCRM/commit/f7c5bae00ae48badffc7c9149f39fa383fd0501a),
  59 commits após a release. O fork estava em `6aee65649892238d4138f6baab0e506f01326ae1`.
- As correções dos PRs [#4561](https://github.com/melgarafael/DeskcommCRM/pull/4561),
  [#4564](https://github.com/melgarafael/DeskcommCRM/pull/4564) e
  [#4566](https://github.com/melgarafael/DeskcommCRM/pull/4566) já integram essa base.

### Correções próprias incluídas

Os seis PRs abaixo tinham os cinco gates obrigatórios verdes e ainda aguardavam
merge no upstream quando foram integrados nesta entrega. As referências fixam
os heads importados, sem copiar ou reescrever os commits.

| PR | Benefício | Head importado |
|---|---|---|
| [#4483](https://github.com/melgarafael/DeskcommCRM/pull/4483) | Exportação da auditoria preserva os eventos durante novas entradas | `d47154b44d0bb2b26a5c1621e02c673cd26ede2e` |
| [#4485](https://github.com/melgarafael/DeskcommCRM/pull/4485) | Paginação de contatos alcança também quem não tem atividade | `b7f0c9b75b09f47fd6e18ce4e7996d6dbe174408` |
| [#4486](https://github.com/melgarafael/DeskcommCRM/pull/4486) | PDF inclui o atendimento recente após importação de histórico | `30b9f8bec6dee0ee7cb91c7efa003d7a5adb5e1e` |
| [#4496](https://github.com/melgarafael/DeskcommCRM/pull/4496) | Preparo de campanha recusa falha na gravação da conclusão | `5b2bb36da645fa3418f396d512692542ea2c0709` |
| [#4501](https://github.com/melgarafael/DeskcommCRM/pull/4501) | Cadências contam dias úteis no fuso configurado | `4ca6e0fd2c9e43002c0a9966a448bfbbe6e75c45` |
| [#4506](https://github.com/melgarafael/DeskcommCRM/pull/4506) | Importar helpers do curso não carrega o Playwright antecipadamente | `43cfc52e18610dd7313bc80212f9469dacfc208a` |

### Identificação do fork

- Primeiro registro publicado das duas versões, com referências Git verificáveis.
- Comando `node scripts/fork-version.mjs`, também disponível com `--json`.
- Alterações locais ainda não commitadas de provedores e documentação foram
  preservadas como trabalho em andamento e não fazem parte desta entrega.
- O rascunho local de versão `0.1.0` não havia sido publicado.

### Validação

- Com as seis correções sobre a base `1c4e8eeb3`, a suíte unitária completa
  passou: 38.924 testes, um caso de falha esperada e um ignorado, exit 0.
- Depois da entrada incremental do Meta Ads em `f7c5bae00`, foram repetidos os
  testes afetados e de documentação: 119 testes em 14 arquivos passaram. A
  suíte completa não foi repetida após essa entrada.
- Typecheck, lint (sem erros), canais, hierarquia de papéis, fragmentos de
  release e build de produção passaram no conjunto final.
- O comando de identificação passou em cinco controles com Git real: checkout
  limpo, trabalho local, SemVer inválido, versão do upstream divergente e base
  fora da história do checkout.
- Não houve teste local com PostgreSQL real nem validação manual pela tela.
