# Zajícova korýtka

Moderní responzivní web pro značku Zajícova korýtka — poctivá korýtka, catering a obložené mísy.

## Spuštění

Stačí otevřít `index.html` v prohlížeči, nebo lokální server:

```bash
npx serve .
# nebo
python3 -m http.server 8080
```

## Struktura

- `index.html` — obsah a SEO
- `styles.css` — design systém a layout
- `script.js` — navigace, scroll a reveal animace
- `assets/images/` — fotografie
- `netlify.toml` — hlavičky pro Netlify preview (`noindex`)
- `robots.txt` — zatím blokuje indexaci (preview)

## Provizorní náhled na Netlify

1. Otevři [app.netlify.com/drop](https://app.netlify.com/drop) (stačí účet Netlify).
2. Přetáhni celou složku projektu (ne jen `index.html`).
3. Netlify vytvoří unikátní URL (`*.netlify.app`) — tu pošli zadavateli.
4. Web má `noindex` / `nofollow` (meta + `robots.txt` + hlavička), takže by se neměl objevit ve vyhledávání.

**Pozor:** kdo má odkaz, stránku otevře (není heslo). Heslo je na Netlify až v placeném plánu.

**Před ostrým spuštěním na produkční doméně:** smaž meta `robots` noindex v `index.html`, uprav `robots.txt` na `Allow: /` a uprav/odstraň `X-Robots-Tag` v `netlify.toml`.

## Kontakt

Objednávky telefonicky: **+420 724 621 572** nebo **+420 739 264 456**.  
Vyzvednutí: Řeka · dovoz zdarma do 10 km.
