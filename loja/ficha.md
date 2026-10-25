# Youtubris — ficha para addons.mozilla.org

**Atenção (marca):** o nome brinca com "YouTube". A política de marcas da Mozilla aceita uso descritivo, mas um revisor pode pedir outro nome. Reservas: "Tubris", "Lustra-Tube". Decida só se pedirem.

- Nome: **Youtubris** (livre na AMO)
- Resumo (≤ 250): Limpa o YouTube e guarda quais vídeos você já viu. Tira os Shorts de todo lugar, os patrocinados e os jogos da página inicial, desliga as prévias ao passar o mouse e mostra 3 miniaturas por linha. Sem configuração.
- Categorias: Fotos, músicas e vídeos · Aparência
- Tags: youtube, shorts, limpar, miniaturas
- Licença: GNU Affero General Public License v3.0 (a mesma do ImprovedTube, de onde vêm partes do código)
- Site: (repositório, se criar) · Suporte: (seu e-mail)
- Ícone: `icone-128.png`
- Capturas: 1) página inicial do YouTube com 3 miniaturas por linha e sem Shorts · 2) página de opções com a contagem de vídeos vistos (você tira)

## Descrição

Extensão para Firefox que limpa o YouTube e guarda quais vídeos você já viu.

Versão enxuta do ImprovedTube, só com as funções que uso, sempre ligadas:

- Remove os Shorts de todo lugar: as prateleiras na página inicial, nas inscrições, nos vídeos em alta e na busca; os Shorts avulsos em listas; o item Shorts do menu lateral e a aba Shorts dos canais. O histórico continua mostrando.
- Remove da página inicial os vídeos patrocinados, os Playables e os jogos ao vivo.
- Não reproduz vídeos ao passar o mouse nas miniaturas; as prévias que ainda tocarem ficam sem som.
- Mostra 3 miniaturas por linha.
- Esconde a barra de rolagem, o rodapé da barra lateral e os banners de promoção.
- Registra cada vídeo assistido, para o histórico importado do ImprovedTube continuar crescendo.

Uso: funciona sozinha no youtube.com. Para trazer o histórico de vídeos vistos do ImprovedTube, exporte as configurações dele e importe o .json em about:addons → Youtubris → Opções.

Os vídeos vistos ficam só no seu navegador. Nenhum dado sai dele.

## Notas ao revisor (English)

Content script + stylesheet on www.youtube.com only. `styles.css` hides Shorts, sponsored/gaming shelves, hover previews; `content.js` tags the "Shorts" filter chip (text-only, no attribute), blocks hover playback, mutes previews, and records watched video IDs/titles in `storage.local` (same shape as ImprovedTube's export, which the options page can import). No network requests, no remote code. Not affiliated with YouTube; the name is a play on words, the listing says so. No build step.
