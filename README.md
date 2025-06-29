# Kostýměrská aplikace

Tento repositář obsahuje prototyp jednoduché webové aplikace pro správu kostýmů na filmovém natáčení.  Frontend je napsaný v Reactu (soubory v adresáři `src`) a přeložený JavaScript je uložen v `main.js`.  Nahřávání fotografií zajišťuje skript `upload.php`.

## Závislosti

- **Node.js** – pro spuštění lokálního serveru nebo případné sestavení React kódu
- **PHP** (8+) – kvůli skriptu `upload.php`, který ukládá nahrané snímky

Instalace Node.js i PHP je možná prostřednictvím oficiálních balíčků (např. `apt`, `brew` nebo instalátor z [nodejs.org](https://nodejs.org/) a [php.net](https://www.php.net/)).  Po instalaci
spusťte `./setup.sh`. Skript ověří dostupnost Node.js a npm, případně nainstaluje závislosti a připraví adresáře `data/` a `fotky/`.

## Spuštění aplikace

1. Naklonujte tento repositář a přejděte do jeho kořenového adresáře.
2. Spusťte `./setup.sh` pro instalaci nebo aktualizaci závislostí.
3. Spusťte lokální PHP server (obslouží statické soubory i `upload.php`):

   ```bash
   php -S localhost:8000
   ```

   Tím bude web dostupný na [http://localhost:8000](http://localhost:8000).

4. (Volitelně) Pro vývoj React části spusťte:

   ```bash
   npm start
   ```

   a otevřete `http://localhost:5173` (výchozí port Vite). Produkční balíček
   vytvoříte příkazem `npm run build` a výstup najdete v adresáři `dist/`.

## Kam se ukládají fotografie?

Skriptem `upload.php` jsou snímky ukládány do adresáře `fotky/<tým>/`.  Tým je
odesílán z frontendu spolu s fotkou.  Pokud není uveden, použije se `Zdena`.

Základní správu týmů zajišťuje skript `team.php`, který ukládá informace do
`data/teams.json`.  Akce se provádějí pomocí POST parametrů:

```
action=create  team=<name> leader=<licence>
action=add     team=<name> member=<licence> license=<leaderLicence>
action=remove  team=<name> member=<licence> license=<leaderLicence>
```

## Použití

Po spuštění serveru otevřete v prohlížeči `index.html` (nebo `public/index.html` u React verze).  Aplikace umožní zadat licenční klíč a nahrávat fotografie, které se ukládají do výše uvedené složky.  Při práci s React kódem lze využít libovolný bundler (např. Vite) – ten vyžaduje nainstalovaný Node.js.

V přehledu scén lze označit jednotlivé záběry pro offline režim. Obrázky se
poté uloží do `localStorage` a budou dostupné i bez připojení k síti.

