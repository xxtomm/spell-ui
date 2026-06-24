# 🗺️ WARSZAWA NICHE GUIDE — by Bilu

Zweryfikowana, interaktywna mapa **niszowej Warszawy** w jednym samodzielnym pliku HTML.
Odtworzenie struktury *TOKYO Niche Guide : by Bilu* dla Warszawy — 18 stałych modułów
(architektura, winyle, kawa specialty, urbex, panoramy, hazard/adrenalina i in.),
z twardą weryfikacją istnienia obiektów i audytem źródeł.

> Wygenerowane topologią agentów **A0–A19 + S1–S7** (orchestrator → roj badawczy 18 modułów →
> subagenci weryfikacyjni geo/fakty/transit → normalizacja → front liquid glass → audyt).

## ▶️ Jak uruchomić
Otwórz **`warszawa-niche-guide-by-bilu.html`** w przeglądarce. Brak builda, brak kluczy API,
brak zależności poza CDN (Leaflet 1.9.4 + ciemne kafle CartoDB/OSM).

## ✨ Funkcje
- **Liquid glass UI** — frosted-glass panele, SVG-owe pinezki teardrop z gradientem koloru modułu.
- **Hover panel** — miniatura (zdjęcie / kafel satelitarny), ocena, godziny, stacja + kolorowe kropki linii.
- **Tydzień / Weekend** — przełącznik różnicujący **godziny otwarcia** (i etykietę oceny) dla dni
  roboczych i weekendu; domyślnie ustawiany wg aktualnego dnia w przeglądarce.
- **Zdjęcia z Google Grafiki** — przycisk „📸 Zdjęcia" otwiera Google Images dla danego miejsca;
  miniatury preferują realne zdjęcie (Wikimedia Commons), z gwarantowanym fallbackiem na kafel
  satelitarny ESRI liczony z `la/lo`.
- **Izolacja modułów** — klik w chip filtruje mapę i listę do jednej kategorii; „Wszystkie" resetuje.
- **Szukajka** po nazwie / stacji / opisie / dzielnicy, licznik `n / total`.
- **Responsywność** — desktop: sidebar 344 px; mobile: dolny panel z uchwytem.

## 🧩 Moduły (18, stały slot/kolor/ikona)
`restaurant` `workshop` `hazard` `street` `architecture` `niche` `adult` `parks` `coffee`
`knives` `cycling` `vinyl` `watches` `cameras` `urbex` `audio` `arcade` `panorama`

Moduły bez realnego desygnatu w Warszawie są jawnie oznaczane (`NO_LOCAL_EQUIVALENT` /
`UNDERFILLED`) — nie są sztucznie wypełniane.

## 📁 Pliki
```
warszawa-niche-guide-by-bilu.html   # samodzielna aplikacja (dane wstrzyknięte inline)
data/places.json                    # zweryfikowane obiekty (kontrakt §5)
data/lines_table.json               # tabela linii + kolory (S3)
data/city_profile.json              # profil miasta (A1/S3)
AUDIT_REPORT.md                     # raport QA: liczby, źródła, KILL-e, flagi (S7)
audit_trail.jsonl                   # ślad audytowy faz (A0)
```

## 🔎 Metodyka i uczciwość danych
- **Istnienie** każdego obiektu jest potwierdzane (web search / oficjalne strony); obiekty bez
  potwierdzenia są odrzucane (**KILL**), nie zmyślane. Współrzędne poza ramką miasta → KILL.
- **Oceny / liczby opinii** pochodzą z research-u; gdy nieznane → `null` + flaga `MISSING`
  (zero pseudo-precyzji). Oceny **nie** są natywnie dzielone na dzień tygodnia w Google —
  przełącznik Tydzień/Weekend różnicuje przede wszystkim **godziny** (realne), a wartość gwiazdek
  pokazuje rzeczywistą agregację; szczegóły w `AUDIT_REPORT.md`.
- **Anchor kuratorski** — kilka ikon miasta (parki, zabytki) dodano z wiedzy kuratorskiej dla
  pewności pokrycia; oznaczone flagą `ANCHOR_KURATORSKI` i własnymi źródłami.
- Pełne rozliczenie flag, % obiektów ze źródłami i lista KILL-i: **`AUDIT_REPORT.md`**.

---
*Generator promptu „NICHE CITY GUIDE — by Bilu". Kolory linii metra zweryfikowane jako
M1 czerwona / M2 zielona; dokładny hex wg standardowych wartości operatora.*
