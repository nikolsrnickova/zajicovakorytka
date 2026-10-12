# Zajícova korýtka

Moderní responzivní web pro značku Zajícova korýtka - poctivá korýtka, catering a obložené mísy.

## Struktura

- `index.html` — obsah a SEO
- `styles.css` — design systém a layout
- `script.js` — navigace, scroll a reveal animace
- `aktualita.json` — aktuální zpráva o obsazenosti (upravitelná bez zásahu do HTML)
- `assets/images/` — fotografie
- `robots.txt` — povoluje indexaci
- `sitemap.xml` — mapa webu pro vyhledávače

Web je připravený pro provoz na `https://www.zajicovakorytka.cz` (GitHub Pages + vlastní doména).

## Jak změnit aktualitu / obsazenost

Text banneru pod úvodem webu se bere ze souboru `aktualita.json`.

1. Otevřete soubor `aktualita.json` na GitHubu (tlačítko tužky / Edit).
2. Upravte hodnoty:
   - `"active": true` — banner se zobrazí
   - `"active": false` — banner se skryje
   - `"title"` — krátký nadpis (např. Obsazenost)
   - `"text"` — zpráva pro zákazníky
3. Uložte změny (Commit changes) a počkejte na nasazení webu (obvykle do pár minut).

Příklad zapnuté aktuality:

```json
{
  "active": true,
  "title": "Obsazenost",
  "text": "Na tento víkend máme plno a další objednávky nepřijímáme. Děkujeme za pochopení."
}
``` 