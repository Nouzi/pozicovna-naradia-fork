# Požičovňa náradia

**Vzorový projekt na skúšanie lekcií kurzu [Od modelu k agentovi](https://nouzi.github.io/ai-dielna/) z AI Dielne.**

Malá webová aplikácia pre komunitnú dielňu. Eviduje náradie, členov a výpožičky: kto má čo požičané a dokedy to má vrátiť. Je dosť malá, aby ste sa v nej rýchlo zorientovali, a dosť veľká, aby mal agent čo skúmať: frontend, API, databázu s migráciami aj testy.

Projekt nie je dokonalý a je to zámer. Pri skúšaní lekcií v ňom nájdete veci, ktoré sa oplatí doplniť, opraviť alebo upratať. Čo presne, zistíte sami alebo s agentom.

## Obsah

- [Vlastná kópia projektu](#vlastná-kópia-projektu)
- [Spustenie](#spustenie)
- [Každá zmena na vlastnej vetve](#každá-zmena-na-vlastnej-vetve)
- [Sada skills od Matta Pococka](#sada-skills-od-matta-pococka)
- [Čo si na projekte vyskúšate](#čo-si-na-projekte-vyskúšate)
- [Technické informácie](#technické-informácie)

## Vlastná kópia projektu

Na projekte pracujte vo vlastnej kópii. Do tohto repozitára zmeny neposielajte, ani ako pull request. Patria do vašej verzie.

### Možnosť A: šablóna (odporúčaná)

1. Hore na stránke repozitára kliknite na **Use this template** a zvoľte **Create a new repository**.
2. Vyberte svoj účet, názov (napríklad `pozicovna-naradia`) a či má byť repozitár verejný alebo súkromný.
3. Svoju kópiu si naklonujte. `VAS-UCET` nahraďte svojím menom na GitHube:

```bash
git clone https://github.com/VAS-UCET/pozicovna-naradia.git
```

```bash
cd pozicovna-naradia
```

Kópia zo šablóny je úplne samostatný repozitár. Má zapnuté issues, ktoré budete potrebovať v lekcii 15, a pull requesty z nej idú iba do vášho repozitára.

### Možnosť B: fork

Kliknite na **Fork** alebo použite GitHub CLI:

```bash
gh repo fork Nouzi/pozicovna-naradia --clone
```

Fork je vždy verejný a má dve nastavenia, ktoré treba zmeniť:

- Issues sú vo forku vypnuté. Zapnete ich v **Settings → General → Features → Issues**.
- GitHub CLI vo forku predvolene posiela issues a pull requesty do pôvodného repozitára. Prepnite ho na svoj fork:

```bash
gh repo set-default VAS-UCET/pozicovna-naradia
```

### Možnosť C: iba lokálna kópia

Na lekcie 1 až 14 stačí kópia vo vašom počítači, GitHub účet netreba:

```bash
git clone https://github.com/Nouzi/pozicovna-naradia.git
```

```bash
cd pozicovna-naradia && git remote remove origin
```

Odpojením `origin` sa vaše zmeny nikdy nepokúsia odísť sem. Keď budete neskôr potrebovať vlastný repozitár na GitHube, vytvoríte ho z priečinka projektu:

```bash
gh repo create pozicovna-naradia --private --source=. --push
```

## Spustenie

Budete potrebovať:

- Node.js 22.13 alebo novší, odporúčaný je 24 (pozri `.nvmrc`)
- Git
- [Claude Code](https://claude.com/claude-code) s plánom Pro alebo vyšším

```bash
npm install
```

```bash
npm run dev
```

Aplikácia beží na http://localhost:5173. Pri prvom spustení sa vytvorí lokálna databáza a naplní sa testovacími dátami. Ak npm pri inštalácii upozorní na zablokované inštalačné skripty (esbuild, fsevents), aplikácii to neprekáža.

## Každá zmena na vlastnej vetve

Každé cvičenie robte na samostatnej vetve. Vetva `main` tak zostane v pôvodnom stave a k pokusom sa môžete vrátiť, porovnať ich alebo ich zahodiť. V niektorých lekciách porovnávate dva prístupy k tej istej úlohe a bez vetiev by to nešlo.

Pred cvičením:

```bash
git switch main
```

```bash
git switch -c lekcia-10-vypocuvanie
```

Po cvičení prácu uložte a vráťte sa na `main`:

```bash
git add -A && git commit -m "Lekcia 10: vypočúvanie"
```

```bash
git switch main
```

Nevydarený pokus zahodíte zmazaním vetvy:

```bash
git branch -D lekcia-10-vypocuvanie
```

Ak máte vlastný repozitár na GitHube, vetvu tam pošlete cez `git push -u origin lekcia-10-vypocuvanie`.

Kód a databáza nie sú to isté. Po prepnutí vetvy môže byť databáza v inom stave, než kód čaká. Vtedy spustite `npm run db:reset`.

## Sada skills od Matta Pococka

V druhej polovici kurzu pracujete s otvorenou sadou [mattpocock/skills](https://github.com/mattpocock/skills) od Matta Pococka (licencia MIT). Skill je zabalený postup, ktorý agent použije na požiadanie, napríklad vypočúvanie, napísanie špecifikácie alebo review. Kurz zodpovedá verzii 1.3.2. Ak sa niečo líši, platí `SKILL.md` konkrétneho skillu.

### Inštalácia a nastavenie

- Nainštalujte Claude Code a prihláste sa.
- V termináli nainštalujte plugin. Ďalej sa aktualizuje sám:

  ```bash
  claude plugin install mattpocock-skills@claude-plugins-official
  ```

- V priečinku projektu spustite `claude`, napíšte `/` a v ponuke nájdite skills s predponou `mattpocock-skills:`.
- Skills spúšťate krátkym názvom, napríklad `/teach`. Výnimkou je `/mattpocock-skills:code-review`, lebo Claude Code má vlastný príkaz `/code-review`.
- V lekcii 15 spustite raz v projekte `/setup-matt-pocock-skills`. Opýta sa na issue tracker (zvoľte GitHub), na štítky na triedenie issues a na to, kam ukladať dokumenty. Potrebujete na to vlastnú kópiu projektu na GitHube.
- Iní agenti, napríklad Cursor alebo OpenCode, používajú `npx skills@latest add mattpocock/skills`. Pre jedného agenta zvoľte iba jednu cestu, inak budete mať každý skill dvakrát.

### Skills, ktoré spúšťate vy

| Skill | Na čo slúži |
| --- | --- |
| `/grill-me` | Vypočúvanie: agent sa pýta, kým nemáte spoločnú predstavu. Hodí sa aj mimo kódu. |
| `/grill-with-docs` | Vypočúvanie nad projektom. Spoločný jazyk zapíše do `GLOSSARY.md` a dôležité rozhodnutia do dokumentov. |
| `/wait-what` | Keď agentovi prestanete rozumieť. Vysvetlí, čo práve robí a prečo. |
| `/to-questionnaire` | Pripraví dotazník pre človeka, ktorý pozná odpovede, napríklad zadávateľa alebo vedúceho práce. |
| `/handoff` | Prenesie rozrobenú prácu do novej relácie alebo k inému agentovi. |
| `/teach` | Naučí vás technológiu po lekciách, s kvízom. |
| `/retro` | Po ťažkej relácii zhrnie, čo sa pokazilo, a navrhne zlepšenia pravidiel. |
| `/setup-matt-pocock-skills` | Jednorazové nastavenie projektu: issue tracker, štítky a dokumenty. |
| `/to-spec` | Z dohody z vypočúvania napíše špecifikáciu. |
| `/to-tickets` | Rozdelí špecifikáciu na tickety vo forme vertikálnych rezov. |
| `/implement` | Implementuje jeden ticket aj s testami a review. |
| `/implement-spec` | Implementuje celú špecifikáciu, nezávislé tickety aj paralelne. |
| `/triage` | Triedi prichádzajúce issues pomocou štítkov. |
| `/improve-codebase-architecture` | Hľadá miesta, kde z plytkých modulov urobiť hlboké: malé rozhranie, za ktorým je veľa správania. |
| `/wayfinder` | Keď je cieľ v hmle: zmapuje rozhodnutia a neznáme na ceste k nemu. |
| `/ask-matt` | Keď neviete, ktorý skill použiť ďalej. |

### Skills, ktoré môže použiť aj agent

Tieto skills agent použije aj sám, keď sa hodia. Ich popis má preto v kontexte stále.

| Skill | Na čo slúži |
| --- | --- |
| `grilling` | Spôsob vypočúvania, na ktorom stoja `/grill-me` a `/grill-with-docs`. |
| `domain-modeling` | Spoločný jazyk projektu a zápis rozhodnutí. |
| `codebase-design` | Návrh hlbokých modulov a ich rozhraní. |
| `tdd` | Vývoj riadený testami: najprv test, ktorý zlyhá, potom kód, s ktorým prejde. |
| `/mattpocock-skills:code-review` | Review v dvoch osiach: dodržanie štandardov projektu a súlad so špecifikáciou. |
| `diagnosing-bugs` | Ťažké chyby, chyby, ktoré sa objavujú iba občas, a spomalenia. |
| `prototype` | Kód na jedno použitie, ktorý odpovie na jednu otázku. |
| `research` | Overenie faktov zvonku, napríklad ako sa správa cudzie API. |
| `pr` | Popis pull requestu: zhrnutie, dôkaz pred a po a riziko zlúčenia. |
| `wizard` | Sprievodca v termináli pre kroky, ktoré musí urobiť človek, napríklad nastavenie účtov. |
| `writing-for-agents` | Písanie textov pre agenta: `CLAUDE.md`, dokumenty s odkazom a skills. |

## Čo si na projekte vyskúšate

Ku každej lekcii patrí cvičenie. Zadanie nájdete na konci lekcie na [webe kurzu](https://nouzi.github.io/ai-dielna/), tu je prehľad, čo si pri ňom prakticky vyskúšate.

### Časť 1: Príprava

- **Lekcia 1.** Projekt spustíte, nastavíte si Git ako záchrannú sieť a nainštalujete Claude Code aj sadu skills. Cez `/model` a `/effort status` overíte, s akým modelom pracujete.

### Časť 2: Pojmy

- **Lekcia 2.** Rovnaké zadanie o projekte zadáte trikrát, zakaždým po `/clear`, a porovnáte, čo sa v odpovediach mení a čo zostáva.
- **Lekcia 3.** Cez `/context` uvidíte, koľko kontextu zaberie systémový prompt, nástroje a `CLAUDE.md` tohto projektu ešte pred vašou prvou správou.
- **Lekcia 4.** Po pár správach o projekte porovnáte `/usage` a `/context` a uvidíte, koľko stojí história konverzácie.
- **Lekcia 5.** Rovnakú prieskumnú otázku položíte s `/effort low` aj `/effort high` a porovnáte čas, kontext a hĺbku odpovede.

### Časť 3: Spoznajte Claude Code (voliteľná)

- **Lekcia 6.** Napíšete presné zadania so súbormi cez `@` aj so snímkou obrazovky. Pripojíte editor cez `/ide` a zmeny agenta si prezriete skôr, než ich prijmete.
- **Lekcia 7.** Vrátite nevydarený pokus (dvojité Esc, `/rewind`), obnovíte reláciu cez `claude --continue` a necháte agenta overovať prácu testami. Nastavíte si povolenia a pozriete sa, čo pribudlo v `.claude/settings.local.json`.

### Časť 4: Základy práce s kontextom

- **Lekcia 8.** Zistíte, čo nafukuje kontext pred prvou správou, a cez `/statusline` budete mať obsadenie kontextu stále na očiach.
- **Lekcia 9.** Necháte agenta preskúmať neznámy projekt: na čo slúži a ako prejde požičanie od tlačidla až do databázy. Technológiu, ktorú v ňom nepoznáte, sa naučíte s `/teach`.
- **Lekcia 10.** Prvú funkciu postavíte dvakrát: raz jedným promptom, raz cez `/grill-with-docs`. Porovnáte výsledky a pozriete sa do `GLOSSARY.md`. Keď sa stratíte, pomôže `/wait-what`.
- **Lekcia 11.** Na hranici fázy sa rozhodnete medzi pokračovaním, `/clear` a zhrnutím. Keď narazíte na nesúvisiaci problém, neodbočíte, ale prácu odložíte cez `/handoff`.

### Časť 5: Riadenie agenta

- **Lekcia 12.** V `CLAUDE.md` nájdete, čo patrí do každej relácie a čo iba do niektorých. To druhé presuniete do `docs/` a nahradíte odkazom s podmienkou.
- **Lekcia 13.** Z dokumentu urobíte vlastný skill v `.claude/skills` a overíte, či ho agent použije sám. Pri písaní pomôže `writing-for-agents`.
- **Lekcia 14.** Pravidlá v `CLAUDE.md` prejdete troma testami a porovnáte `/context` pred a po. Pozriete sa na automatickú pamäť a po ťažkej relácii spustíte `/retro`.

### Časť 6: Dodanie veľkých úloh (pripravuje sa)

- **Lekcia 15.** Vlastnú kópiu na GitHube nastavíte ako issue tracker cez `/setup-matt-pocock-skills` a necháte agenta vytvoriť testovacie issue.
- **Lekcia 16.** Funkciu, ktorá sa nezmestí do jednej relácie, prevediete cez `/grill-with-docs`, `/to-spec` a `/to-tickets` a skontrolujete, či sú tickety vertikálne rezy.
- **Lekcia 17.** Tickety implementujete jeden po druhom cez `/implement`, s testami na dohodnutých miestach a s `/mattpocock-skills:code-review`. Založíte si `CODING_STANDARDS.md` a necháte napísať popis pull requestu.
- **Lekcia 18.** V polovici práce sa zmení zadanie. Zavriete neimplementované tickety, upravíte špecifikáciu a necháte vytvoriť nové tickety.
- **Lekcia 19.** Celú špecifikáciu prevediete cez `/implement-spec`. Vyskúšate `/ask-matt`, `/wayfinder` a `prototype` a celým postupom prejdete záverečný projekt.

## Technické informácie

Frontend je React s Vite, API je [Hono](https://hono.dev) na Node.js, databáza je SQLite cez modul `node:sqlite` vstavaný v Node.js a testy bežia vo [Vitest](https://vitest.dev). Doménové pojmy (náradie, člen, výpožička) sú v kóde po slovensky, technické po anglicky.

### Príkazy

| Príkaz | Čo robí |
| --- | --- |
| `npm run dev` | Spustí API aj web. Po zmene súboru sa oba obnovia. |
| `npm test` | Spustí testy. |
| `npm run test:watch` | Spúšťa testy pri každej zmene. |
| `npm run typecheck` | Skontroluje typy v celom projekte. |
| `npm run lint` | Skontroluje kód cez ESLint (pravidlá pre TypeScript a React hooks). Zlyhá aj pri varovaní. |
| `npm run build` | Skontroluje typy a zostaví frontend do `dist/`. |
| `npm run db:migrate` | Spustí nové migrácie databázy. |
| `npm run db:reset` | Zmaže lokálnu databázu, spustí migrácie a naplní ju testovacími dátami. |

Typy kontroluje TypeScript 7 z balíka `typescript7`. Pod názvom `typescript` je nainštalovaný TypeScript 6, lebo typescript-eslint s TypeScriptom 7 zatiaľ nefunguje. Príkaz `npx tsc` preto môže spustiť TypeScript 6, typy kontrolujte cez `npm run typecheck`.

### Štruktúra

```
src/
  client/        frontend v Reacte
    components/  komponenty stránok
    api.ts       volania API
  shared/        typy a doménová logika, ktoré používa frontend aj server
server/
  index.ts       spustenie servera
  app.ts         zostavenie API v Hono
  routes/        endpointy /api/naradie, /api/clenovia, /api/vypozicky
  repo/          SQL dotazy
  db/            pripojenie, migrácie a testovacie dáta
```

### Databáza

Databáza je v súbore `data/dielna.db`, ktorý nie je v Gite. Migrácie sú v `server/db/migrations` a server ich spustí pri štarte. Testovacie výpožičky sa počítajú od dnešného dňa, takže dáta sú vždy aktuálne. Port API a cestu k databáze zmeníte v súbore `.env` podľa `.env.example`.

### API

| Metóda a adresa | Čo robí |
| --- | --- |
| `GET /api/naradie` | Všetko náradie a jeho aktuálna výpožička |
| `GET /api/naradie/:id` | Jedno náradie |
| `POST /api/naradie` | Pridá náradie: `{ nazov, kategoria, popis }` |
| `GET /api/clenovia` | Členovia dielne |
| `GET /api/vypozicky` | Nevrátené výpožičky |
| `POST /api/vypozicky` | Požičia náradie: `{ naradieId, clenId }` |
| `POST /api/vypozicky/:id/vratenie` | Označí náradie ako vrátené |

Chyby vracia API ako `{ "chyba": "text pre používateľa" }`.

---

Kurz [Od modelu k agentovi](https://nouzi.github.io/ai-dielna/) je bezplatný a nesmie byť súčasťou žiadneho plateného kurzu.
