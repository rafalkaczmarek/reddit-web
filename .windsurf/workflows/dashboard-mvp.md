---
description: Implementacja MVP ekranu Dashboard (Angular + Angular Material, mock danych, dark mode)
---

# Cel
Zaimplementować ekran **Dashboard** na podstawie Figmy (DashStack), w istniejącym projekcie (Angular v20+), z:
- Angular Material
- mock danych
- wywołaniami „API” wyłącznie w serwisach
- placeholderami dla wykresów
- obsługą light/dark mode
- zgodnością z WCAG AA + przejściem AXE

Zakładamy, że **Sidebar już istnieje** w projekcie.

# Założenia techniczne (ważne)
- Komponenty są **standalone** (w Angular v20+ to domyślne; nie ustawiaj `standalone: true`).
- `ChangeDetectionStrategy.OnPush` w komponentach.
- `input()` / `output()` zamiast dekoratorów.
- Stan w komponentach przez **signals** (`signal`, `computed`), bez `mutate`.
- Szablony używają **native control flow** (`@if`, `@for`).
- Nie używać `ngClass` i `ngStyle` (stosować bindingi `class.*` / `style.*`).
- Typy/interfejsy umieszczać w `src/app/types` z sufiksami `.interface.ts` / `.type.ts`.
- Importy grupować:
  1) Angular
  2) lokalne (app)
  3) third-party

# Outcome / Definition of Done
- Widok Dashboard dostępny przez routing (lazy-loaded feature).
- Dashboard renderuje:
  - `PageHero` z tytułem
  - sekcję KPI (karty)
  - placeholder sekcji wykresów
  - tabelę „recent” (Material table)
  - stany: loading, empty, error
- Dane pochodzą z mock serwisu/repozytorium i są konsumowane przez `DashboardService`.
- Dark mode działa globalnie (Material + custom tokens) i jest przełączalny (toggle).
- Brak błędów AXE na Dashboard.

# Plan implementacji (kroki)

## 1) Feature: routing + struktura Dashboard
1. Utwórz feature folder: `src/app/features/dashboard/`.
2. Dodaj routing feature:
   - `src/app/features/dashboard/dashboard.routes.ts`
   - zdefiniuj route do `DashboardPageComponent`.
3. Podepnij lazy-loaded route w głównym routingu aplikacji.

**Kryteria akceptacji**
- Wejście na ścieżkę Dashboard ładuje stronę bez błędów.
- Dashboard jest izolowany jako feature (łatwo dodać kolejne ekrany).

## 2) Typy danych (wspólne)
1. Dodaj typy do `src/app/types/` (nazwa plików może się różnić, ale trzymaj ten katalog):
   - `dashboard-kpi.interface.ts`
   - `dashboard-recent-item.interface.ts`
   - (opcjonalnie) `dashboard-summary.interface.ts`

**Kryteria akceptacji**
- Brak `any` w kontraktach danych.

## 3) Mock danych + serwisy (API boundary)
1. Dodaj repo/źródło danych (mock):
   - np. `src/app/features/dashboard/services/dashboard.repository.ts`
   - metody (przykładowo):
     - `getKpis(): Observable<DashboardKpi[]>`
     - `getRecentItems(): Observable<DashboardRecentItem[]>`
     - `getChartPlaceholder(): Observable<...>` (opcjonalnie)
   - implementacja zwraca mock dane (np. `of(data).pipe(delay(...))` dla realizmu).
2. Dodaj `DashboardService`:
   - konsumuje `DashboardRepository`
   - udostępnia dane jako `Observable` i/lub `Signal` (np. przez `toSignal`).
   - w jednym miejscu mapuje dane do formy przyjaznej dla UI.

**Kryteria akceptacji**
- `DashboardPageComponent` nie wykonuje „API calli” bezpośrednio.

## 4) DashboardPageComponent (signals + stany widoku)
1. Utwórz `DashboardPageComponent` w `src/app/features/dashboard/pages/dashboard-page/`.
2. W komponencie:
   - `protected` pola używane w template
   - stan loading/empty/error w oparciu o dane z serwisu
   - `computed()` dla view-modelu
3. W template:
   - użyj `@if`/`@for`
   - sekcje: PageHero, KPI, chart placeholder, recent table
   - stany:
     - loading: spinner/skeleton
     - empty: komunikat + CTA (jeśli sensowne)
     - error: komunikat błędu + przycisk retry

**Kryteria akceptacji**
- UI nie „skacze” znacząco pomiędzy stanami.

## 5) UI: KPI cards (Angular Material)
1. Dodaj dashboard-only komponent (opcjonalnie, rekomendowane): `KpiCardComponent` w `src/app/features/dashboard/components/kpi-card/`.
2. Użyj Material:
   - `mat-card`
   - (opcjonalnie) `mat-icon`
3. Zachowaj a11y:
   - czytelne etykiety
   - poprawna hierarchia nagłówków

**Kryteria akceptacji**
- Karty KPI wyglądają spójnie w light/dark.

## 6) UI: Placeholder wykresów
1. Dodaj sekcję wykresu jako placeholder (bez biblioteki chartów):
   - `mat-card` z tytułem + placeholder content (np. blok o stałej wysokości).
2. Zadbaj o responsywność i spójne odstępy.

**Kryteria akceptacji**
- Brak zależności od bibliotek wykresów.

## 7) UI: Recent table (Angular Material)
1. Dodaj tabelę opartą o `mat-table`.
2. Minimalnie:
   - header + rows
   - (opcjonalnie) `mat-sort`
   - (opcjonalnie) `mat-paginator`
3. A11y:
   - semantyczne nagłówki kolumn
   - opisowa nazwa tabeli (np. nagłówek sekcji)

**Kryteria akceptacji**
- Tabela działa klawiaturą i jest czytelna w dark mode.

## 8) Dark mode (Material theme + toggle)
1. Zweryfikuj aktualną konfigurację themingu Material w projekcie.
2. Dodaj/uzupełnij obsługę dwóch theme’ów:
   - light
   - dark
3. Dodaj `ThemeService` (np. `src/app/shared/services/theme.service.ts`):
   - `signal<'light' | 'dark'>`
   - zapisywanie do `localStorage`
   - inicjalizacja z `prefers-color-scheme` (jeśli brak ustawienia użytkownika)
4. Dodaj toggle w istniejącym Topbar (jeśli jest):
   - `mat-slide-toggle` lub `mat-icon-button`
   - `aria-label` obowiązkowo

**Kryteria akceptacji**
- Przełączenie motywu zmienia kolory Dashboard bez reloadu.

## 9) A11y / AXE
1. Uruchom audyt AXE na Dashboard.
2. Napraw typowe problemy:
   - brakujące `aria-label` na icon buttonach
   - kontrast kolorów
   - kolejność fokusu
   - role/landmarki

**Kryteria akceptacji**
- Brak naruszeń AXE na Dashboard.

# Notatki implementacyjne
- `PageHero` jest już w projekcie: użyj go na Dashboardzie jako standardowego nagłówka strony.
- Jeśli pojawi się potrzeba stylowania klasami, używaj `class.someName="..."` lub `[class.someName]="..."` zamiast `ngClass`.
- Unikaj logiki w template; preferuj `computed()`.
