# Versionamento do fork

Este fork mantém duas séries independentes: a versão do Deskcomm importado e a
versão das nossas modificações. A autoridade é o bloco JSON de
[`version.md`](../../version.md); este documento explica como mantê-lo.

## Consultar a versão

```bash
node scripts/fork-version.mjs
node scripts/fork-version.mjs --json
```

O comando mostra as duas versões, o commit exato do upstream, quantos commits
essa base contém depois da release, o commit do checkout e a presença de
alterações locais. O identificador combinado inclui a versão do fork e o hash
da base. Execute em um clone Git com histórico completo; referências ausentes
ou uma base que não pertença ao checkout são recusadas.

Esses dados identificam o **código-fonte do fork**. A versão de um aplicativo
instalado depende do artefato que foi implantado; sincronizar este repositório
não atualiza uma VPS.

## Quando mudar nossa versão

| Parte | Entrega |
|---|---|
| Patch (`Z`) | Ajustes de documentação ou do mecanismo de identificação |
| Minor (`Y`) | Sincronização com outra base ou mudança de comportamento própria |
| Major (`X`) | Reservada para uma divergência incompatível, por decisão do dono |

Uma entrega pode ter vários commits de integração. O commit que a conclui
atualiza `version.md` e o [changelog do fork](CHANGELOG.md) no mesmo conjunto de
mudanças. Não reescrevemos os commits de terceiros para inserir nossa versão.

## Sincronizar novamente

1. Busque a `main` de `melgarafael/DeskcommCRM` em uma árvore limpa e confira as
   alterações e os checks. Preserve trabalho local em andamento separadamente.
2. Integre a base sem reescrever o histórico. Confira quais correções próprias
   já entraram no upstream e quais continuam sendo diferenças do fork.
3. Atualize no bloco JSON a release, seu commit, o commit da base e a data.
   A tag da release precisa apontar para `upstreamReleaseCommit`, e esse commit
   precisa ser ancestral de `upstreamCommit`.
4. Incremente nossa versão e registre base, modificações e referências no
   changelog. Rode o comando de identificação e as verificações pertinentes à
   integração antes de publicar na `master` do fork.

Para conferir a diferença efetiva, use o `upstreamCommit` registrado:

```bash
git diff <upstreamCommit>..HEAD
git log --oneline <upstreamCommit>..HEAD
```

## Fronteira com o versionamento do produto

O `package.json` mantém o número definido pelo upstream. O `CHANGELOG.md` da
raiz, os fragmentos de `.changes/`, as tags `v*` e os workflows de release
continuam pertencendo ao ciclo do produto original. Nossa identificação usa
`version.md` e este diretório; não dispara publicação de imagens ou de releases.

Contribuições enviadas ao upstream seguem as convenções de lá. O registro desta
camada não altera `LICENSE`, copyright, contrato de atualização ou marca do
produto.
