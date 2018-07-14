Készíts el egy React-os komponenst, ami alkalmas lesz arra, hogy multi-inputként üzemeljen. Kiinduló állapotban legyen egy üres input meződ (legyen fejléce, watermark, írható legyen), amibe ha a felhasználó elkezd gépelni, akkor megjelenik alatta egy újabb üres input mező. Ezt akárhányszor megteheti a felhasználó, de csak abban az esetben, ha a legutolsó input mezőt módosítja. A mezőkből a szöveg eltávolítható (backspace, delete stb. – ez nem törli el az egész sort) vagy az egész sor eltüntethető a sor mellett lévő X ikon megnyomásával. A komponens alján legyen egy Cancel és egy Save gomb, a Cancel visszaállítja a kiinduló állapotot, a Save pedig visszaadja az éppen aktuálisan tartalmazott állapotot. A komponensed legyen responsive, nézzen ki jól (tudom, tudom, ez szubjektív 😊) és legyen használható mobil vagy tablet nézet esetén is.

A target browser Chrome.

A manuális teszteléshez azt ajánlom, hogy ágyazd be a komponensedet egy „keretalkalmazásba”, ami képes neki kezdeti értéket küldeni (ez lehet egy string lista), amit a komponensed értelmez, előre betölti az egyes inputokba, valamint a keretprogram tudja fogadni a Save megnyomásával elküldött értékeket. Ezeket írasd mondjuk ki a képernyőre. A Cancel arra állítsa vissza, amit legutoljára kapott a keretalkalmazástól.

Készíts a komponensed ellen unit teszteket, erre bármelyik unit test frameworköt használhatod.

Használj PropTypes-okat.

Bónusz feladatok:

[JS] A megjelenő label-ek legyenek megszámozva attól függően, hogy hányadik input-hoz tartoznak (1. test attribute, 2. test attribute)
[JS] A komponens kaphasson egy nyelvi beállítást leíró flaget, ami meghatározza, hogy a labelek milyen nyelven jelenjenek meg. (angol, német, magyar). Ha a keretalkalmazásban változtatják a nyelvi beállítást, változzanak a szövegek is.
[CSS] A megjelenő soroknak legyen váltakozó háttérszíne
[CSS] A komponens kaphasson egy tematikát (dark, light, colorful), ami meghatározza, hogy milyen legyen a megjelenítése a komponensnek. A csatolt képen pl. a light séma látható.
[JS, CSS] A komponens ne csak string értékeket tudjon kezelni, hanem más típusokat is (pl checkbox, number, date, totó értékek…). Ez a létrehozás során megadható legyen
[JS] A sorok sorrendje legyen módosítható a user által.
