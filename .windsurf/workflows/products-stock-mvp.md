---
description: Implementacja MVP ekranu Products (Angular + Angular Material, mock danych, dark mode) na podstawie Figmy DashStack – ekran "Dashboard 3"
---

# Cel
Zaimplementować ekran **Products** na podstawie Figmy (DashStack – ekran #Dashboard 3), w istniejącym projekcie (Angular v21+), z:
- Angular Material
- mock danych
- wywołaniami „API" wyłącznie w serwisach
- obsługą light/dark mode
- zgodnością z WCAG AA + przejściem AXE

Ekran Products zawiera:
- **PageHero** z tytułem "Products"
- **Toolbar** z polem wyszukiwania, przyciskami filtrowania/sortowania i przyciskiem "Add Product"
- **Tabelę produktów** z kolumnami: Image, Product Name, Category, Price, Piece (ilość), Available Color (kolorowe kropki), Action (edit/delete)
- **Paginację** pod tabelą
- **Status badge** – In Stock / Out of Stock

# Stan obecny
- Strona Products istnieje w `src/app/products/components/products-page/` – zawiera jedynie `PageHero` (shell).
- Routing: **eagerly-loaded** w `app.routes.ts` (`{ path: 'products', component: ProductsPage }`).
- Sidebar: link do `/products` już istnieje.
- Brak typów, serwisów i komponentów specyficznych dla Products.

# Założenia techniczne (ważne)
- Komponenty są **standalone** (Angular v21+ default; nie ustawiaj `standalone: true`).
- `ChangeDetectionStrategy.OnPush` w komponentach.
- `input()` / `output()` zamiast dekoratorów.
- Stan w komponentach przez **signals** (`signal`, `computed`), bez `mutate`.
- Szablony używają **native control flow** (`@if`, `@for`).
- Nie używać `ngClass` i `ngStyle` (stosować bindingi `class.*` / `style.*`).
- Typy/interfejsy umieszczać w `src/app/types` z sufiksami `.interface.ts` / `.type.ts`.
- Importy grupować: 1) Angular  2) lokalne (app)  3) third-party.
- Wszystkie pola/metody w komponentach mają jawne modyfikatory dostępu.
- `protected` dla pól używanych w template, `private` dla reszty.

# Outcome / Definition of Done
- Widok Products dostępny przez routing (lazy-loaded feature).
- Products renderuje:
  - `PageHero` z tytułem i opisem
  - toolbar z wyszukiwarką, filtrem i przyciskiem „Add Product"
  - tabelę produktów (Material Table) z kolumnami wg Figmy
  - paginację (Material Paginator)
  - stany: loading, empty, error
- Dane pochodzą z mock repozytorium i są konsumowane przez `ProductsService`.
- Dark mode działa poprawnie (Material + custom tokens).
- Brak błędów AXE na stronie Products.

---

# Plan implementacji (kroki)

## 1) Refaktor routingu — lazy-loading Products
1. Utwórz `src/app/products/products.routes.ts` z routem do `ProductsPage`.
2. W `app.routes.ts` zmień eager import na **lazy-loaded**:
   ```ts
   {
     path: 'products',
     loadChildren: () =>
       import('@admin-panel-web/products/products.routes').then((m) => m.productsRoutes),
   }
   ```
3. Usuń bezpośredni import `ProductsPage` z `app.routes.ts`.

**Kryteria akceptacji**
- Products ładuje się lazy (widać oddzielny chunk w `ng build`).
- Nawigacja z sidebara na `/products` działa bez błędów.

---

## 2) Typy danych
1. Utwórz `src/app/types/product.interface.ts`:
   ```ts
   export interface Product {
     readonly id: string;
     readonly image: string;            // URL do miniaturki
     readonly name: string;
     readonly category: string;
     readonly price: number;
     readonly piece: number;            // ilość w magazynie
     readonly availableColors: string[]; // hex wartości kolorów
     readonly status: 'in-stock' | 'out-of-stock';
   }
   ```

**Kryteria akceptacji**
- Brak `any` w kontraktach danych.
- Interfejs odzwierciedla kolumny tabeli z Figmy.

---

## 3) Mock danych + serwisy (API boundary)
1. Utwórz `src/app/products/services/products.repository.ts`:
   - `getProducts(): Observable<Product[]>` — zwraca 8–10 mock produktów z `of(...).pipe(delay(600))`.
2. Utwórz `src/app/products/services/products.service.ts`:
   - Konsumuje `ProductsRepository`.
   - Stan wewnętrzny (private signals): `_products`, `_loading`, `_error`, `_searchQuery`, `_currentPage`, `_pageSize`.
   - Publiczne readonly signals: `products`, `loading`, `error`, `isEmpty`.
   - `filteredProducts = computed(...)` — filtrowanie po `_searchQuery` (po nazwie/kategorii).
   - `paginatedProducts = computed(...)` — slice danych wg strony i rozmiaru.
   - `totalCount = computed(...)` — łączna liczba (po filtrze).
   - Metody: `loadProducts()`, `search(query)`, `changePage(pageIndex, pageSize)`.

**Kryteria akceptacji**
- `ProductsPage` nie wykonuje „API calli" bezpośrednio.
- Filtrowanie i paginacja działają reaktywnie przez signals.

---

## 4) ProductsPage — rozbudowa (signals + stany widoku)
1. W `src/app/products/components/products-page/products-page.ts`:
   - Inject `ProductsService`.
   - `ngOnInit` → `service.loadProducts()`.
   - Metoda `retry()`.
2. W template dodać sekcje:
   - `@if (service.loading())` → spinner
   - `@else if (service.error())` → komunikat + retry
   - `@else if (service.isEmpty())` → empty state
   - `@else` → toolbar + tabela + paginator

**Kryteria akceptacji**
- Stany loading/error/empty renderują się poprawnie.
- UI nie „skacze" między stanami.

---

## 5) UI: Products Toolbar
1. Utwórz `src/app/products/components/products-toolbar/products-toolbar.ts`:
   - Inputs: brak (lub opcjonalnie `searchQuery`).
   - Outputs: `searchChange = output<string>()`, `addProduct = output<void>()`.
   - Zawiera:
     - `mat-form-field` z ikoną wyszukiwania i polem input
     - przycisk `mat-flat-button` „Add Product"
     - (opcjonalnie) przycisk filtrowania/sortowania jako `mat-icon-button`
   - A11y: `aria-label` na inputach i buttonach.
2. Podepnij w `ProductsPage` template.

**Kryteria akceptacji**
- Wpisanie tekstu w wyszukiwarkę filtruje tabelę (debounce ~300 ms).
- Przycisk „Add Product" emituje event (na razie bez akcji).
- Toolbar wygląda spójnie w light/dark.

---

## 6) UI: Products Table (Angular Material)
1. Utwórz `src/app/products/components/products-table/products-table.ts`:
   - Input: `products = input.required<Product[]>()`.
   - Kolumny (`displayedColumns`): `image`, `name`, `category`, `price`, `piece`, `availableColors`, `action`.
   - Kolumna **image**: miniaturka `<img>` (placeholder obrazek, nie NgOptimizedImage bo to dane dynamiczne).
   - Kolumna **availableColors**: `@for` renderujący kolorowe kropki (`<span>` z `[style.background]`).
   - Kolumna **status/piece**: badge „In Stock" (zielony) / „Out of Stock" (czerwony) — lub wartość `piece` ze statusem.
   - Kolumna **action**: `mat-icon-button` z ikonami edit + delete (na razie bez akcji).
   - `mat-sort` na kluczowych kolumnach.
2. A11y:
   - `aria-label` na tabeli.
   - `alt` text na obrazkach produktów.
   - `aria-label` na przyciskach akcji (np. „Edit Apple Watch", „Delete Apple Watch").

**Kryteria akceptacji**
- Tabela renderuje dane poprawnie.
- Kolory kropek widoczne w light i dark mode.
- Tabela nawigowalna klawiaturą.

---

## 7) UI: Paginacja (Angular Material Paginator)
1. Dodaj `mat-paginator` pod tabelą w `ProductsPage` (lub w `ProductsTable`):
   - `[length]="service.totalCount()"`, `[pageSize]="10"`, `[pageSizeOptions]="[5, 10, 25]"`.
   - Event `(page)` → `service.changePage(...)`.

**Kryteria akceptacji**
- Zmiana strony/pageSize aktualizuje widok tabeli.
- Paginator działa klawiaturą.

---

## 8) Stylowanie (SCSS + CSS custom properties)
1. Dodaj style komponentów spójne z Figmą:
   - Toolbar: flex layout, gap, border-radius.
   - Tabela: `var(--bg-card)`, `var(--border-color)`, `var(--text-primary)` itd.
   - Kolorowe kropki: `width: 16px; height: 16px; border-radius: 50%`.
   - Status badge: wzorowane na `recent-orders-table.scss`.
2. Responsywność:
   - Tabela w kontenerze z `overflow-x: auto` dla małych ekranów.
   - Toolbar stack na mobile.

**Kryteria akceptacji**
- Products wygląda spójnie z Dashboardem.
- Dark mode działa bez artefaktów.

---

## 9) A11y / AXE
1. Uruchom audyt AXE na Products.
2. Napraw typowe problemy:
   - Brakujące `aria-label` na icon buttonach.
   - Kontrast kolorów (status badge, kolorowe kropki — dodaj `aria-label` opisujący kolor).
   - Kolejność fokusu.
   - `alt` na obrazkach produktów.

**Kryteria akceptacji**
- Brak naruszeń AXE na stronie Products.

---

## 10) Testy jednostkowe
1. `products.repository.spec.ts` — sprawdź, że `getProducts()` emituje dane.
2. `products.service.spec.ts`:
   - Ładowanie danych ustawia sygnały.
   - Filtrowanie po `search()` zmniejsza listę.
   - Paginacja zwraca poprawny slice.
3. `products-table.spec.ts` — renderuje kolumny i dane.
4. `products-toolbar.spec.ts` — emituje `searchChange` i `addProduct`.
5. `products-page.spec.ts` — integracja: stany loading/error/empty.

**Kryteria akceptacji**
- Wszystkie testy przechodzą (`ng test`).
- Pokrycie kluczowej logiki (filtrowanie, paginacja, stany).

---

# Struktura plików (docelowa)

```
src/app/
├── products/
│   ├── components/
│   │   ├── products-page/
│   │   │   ├── products-page.ts
│   │   │   ├── products-page.html
│   │   │   ├── products-page.scss
│   │   │   └── products-page.spec.ts
│   │   ├── products-table/
│   │   │   ├── products-table.ts
│   │   │   ├── products-table.html
│   │   │   ├── products-table.scss
│   │   │   └── products-table.spec.ts
│   │   └── products-toolbar/
│   │       ├── products-toolbar.ts
│   │       ├── products-toolbar.html
│   │       ├── products-toolbar.scss
│   │       └── products-toolbar.spec.ts
│   ├── services/
│   │   ├── products.repository.ts
│   │   ├── products.repository.spec.ts
│   │   ├── products.service.ts
│   │   └── products.service.spec.ts
│   └── products.routes.ts
├── types/
│   └── product.interface.ts          ← NOWY
```

# Notatki implementacyjne
- **PageHero** i **PageContent** już istnieją w `shared/` — użyj ich analogicznie do Dashboardu.
- Wzoruj się na `RecentOrdersTable` i `DashboardService` pod względem wzorców (signals, repository, stany).
- Obrazki produktów: użyj placeholder URL (np. `https://placehold.co/48x48`) lub inline SVG placeholder w mock danych.
- Kolorowe kropki w kolumnie „Available Color" powinny mieć `aria-label` (np. „Red, Blue, Green") na kontenerze dla czytników ekranowych.
- Przycisk „Add Product" na razie nie wykonuje żadnej akcji — wystarczy `output()` + log w konsoli.
