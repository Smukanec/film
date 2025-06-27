# Kostýměrská aplikace

Tento repositář obsahuje prototyp jednoduché webové aplikace pro správu kostýmů na filmovém natáčení.  Frontend je napsaný v Reactu (soubory v adresáři `src`) a přeložený JavaScript je uložen v `main.js`.  Nahřávání fotografií zajišťuje skript `upload.php`.

## Závislosti

- **Node.js** – pro spuštění lokálního serveru nebo případné sestavení React kódu
- **PHP** (8+) – kvůli skriptu `upload.php`, který ukládá nahrané snímky

Instalace Node.js i PHP je možná prostřednictvím oficiálních balíčků (např. `apt`, `brew` nebo instalátor z [nodejs.org](https://nodejs.org/) a [php.net](https://www.php.net/)).

## Spuštění aplikace

1. Naklonujte tento repositář a přejděte do jeho kořenového adresáře.
2. Spusťte lokální PHP server (obslouží statické soubory i `upload.php`):

   ```bash
   php -S localhost:8000
   ```

   Tím bude web dostupný na [http://localhost:8000](http://localhost:8000).

3. (Volitelně) Pokud chcete spustit pouze statický frontend pomocí Node, lze použít např.:

   ```bash
   npx http-server
   ```

   nebo jakýkoli jiný statický Node server.

## Kam se ukládají fotografie?

Skriptem `upload.php` jsou snímky ukládány do adresáře `fotky/<tým>/`.  Výchozí tým je `Zdena`, tedy složka `fotky/Zdena`.

## Použití

Po spuštění serveru otevřete v prohlížeči `index.html` (nebo `public/index.html` u React verze).  Aplikace umožní zadat licenční klíč a nahrávat fotografie, které se ukládají do výše uvedené složky.  Při práci s React kódem lze využít libovolný bundler (např. Vite) – ten vyžaduje nainstalovaný Node.js.

