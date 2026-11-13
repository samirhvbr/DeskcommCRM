# Versões do Deskcomm e deste fork

```json
{
  "forkVersion": "0.2.0",
  "upstreamVersion": "1.109.0",
  "forkRepository": "samirhvbr/DeskcommCRM",
  "upstreamRepository": "melgarafael/DeskcommCRM",
  "upstreamCommit": "f7c5bae00ae48badffc7c9149f39fa383fd0501a",
  "upstreamReleaseCommit": "0cead2817e2e29e6239393ba68d16d5755d8a9d3",
  "syncedAt": "2026-11-13"
}
```

O primeiro SemVer deste arquivo é a **nossa versão**. O bloco JSON acima é a
fonte única dos números e das referências; o identificador combinado é derivado
por `node scripts/fork-version.mjs`.

- **`upstreamVersion`** identifica a última release do Deskcomm na base importada.
- **`upstreamCommit`** fixa o código importado da `main`, incluindo alterações
  posteriores à release. Esta base está 59 commits depois da tag `v1.109.0`.
- **`forkVersion`** identifica a entrega das nossas modificações sobre essa base.
  A atualização da base também é uma entrega do fork.
- Arquivos locais ainda não commitados são trabalho em andamento e não integram
  a versão publicada. O comando também mostra o commit do checkout e se há
  alterações locais.

As regras e o procedimento de atualização estão em
[docs/fork/README.md](docs/fork/README.md). O conteúdo de cada entrega está no
[changelog do fork](docs/fork/CHANGELOG.md).
