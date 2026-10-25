# Youtubris

Extensão para Firefox que limpa o YouTube e guarda quais vídeos você já viu.

Versão enxuta do [ImprovedTube](https://github.com/code-charity/youtube), só com as funções que eu uso, sempre ligadas:

- Remove os Shorts de todo lugar: as prateleiras na página inicial, nas inscrições, nos vídeos em alta e na busca; os Shorts avulsos em listas (relacionados, canais, busca); o item Shorts do menu lateral e a aba Shorts dos canais. O histórico continua mostrando. Também tira os botões de contexto dos Shorts.
- Remove da página inicial os vídeos patrocinados, os Playables e os jogos ao vivo.
- Não reproduz vídeos ao passar o mouse nas miniaturas; as prévias que ainda tocarem ficam sem som, e os botões e animações sobre as miniaturas somem.
- Mostra 3 miniaturas por linha.
- Esconde a barra de rolagem, o rodapé da barra lateral e os banners de promoção.
- Registra cada vídeo assistido, para o histórico importado do ImprovedTube continuar crescendo.

## Uso

Funciona sozinha no youtube.com. Para trazer o histórico de vídeos vistos do ImprovedTube, exporte as configurações dele e importe o `.json` em `about:addons` → Youtubris → Opções.

## Desenvolvimento

```sh
npx web-ext lint    # valida
npx web-ext build   # gera o .zip em web-ext-artifacts/
npx web-ext sign --channel=unlisted --api-key=… --api-secret=…   # assina e gera o .xpi
npx web-ext sign --channel=listed --api-key=… --api-secret=…     # submete à revisão da loja (addons.mozilla.org)
```

Toda alteração precisa de um novo `version` no `manifest.json` antes de assinar.

## Licença

[AGPL 3.0](LICENSE), a mesma do ImprovedTube, de onde vêm partes do código.
