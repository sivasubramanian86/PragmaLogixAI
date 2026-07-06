# PragmaLogixAI — Project-Scoped Agent Rules

## Multi-Language i18n Architecture

This project implements a **modular, per-language i18n pattern** for any Next.js / React application.

### Structure

```
src/lib/
  translations.ts        ← thin aggregator: imports all languages, exports useTranslations()
  i18n/
    en.ts                ← source-of-truth base (English)
    es.ts, fr.ts, ...    ← one file per language (22 total)
```

### How to add a new string

1. Add the key + English value to `src/lib/i18n/en.ts` AND the `Strings` interface in `translations.ts`.
2. All languages automatically inherit the English fallback via `...en` spread.
3. Translate the string in each language file as a follow-up (search for `// TODO` pattern or grep for the key).

### How to add a new language

1. Create `src/lib/i18n/<code>.ts` — spread from `en`, override relevant keys.
2. Add the import to `translations.ts` and add it to `compiledTranslations`.
3. Add the language code to the `Language` union type in `src/lib/types.ts`.
4. Add the display name to `languageNames` in `translations.ts`.

### Profile labels pattern

**Do NOT maintain per-language lookup maps in individual components.**
Always use `t.profiles[profile]` — the translation object carries the localised label.

```tsx
// ✅ Correct — works for all 22 languages
<option value="adult">{t.profiles["adult"]}</option>

// ❌ Wrong — breaks for any language not in the local map
<option value="adult">{getProfileName("adult", lang)}</option>
```

### Component decomposition rule

`app/page.tsx` must stay ≤ 220 lines. Extract any view block >40 lines into:
- `components/views/<ViewName>.tsx` — for tab/section content
- `components/<Widget>.tsx` — for reusable UI widgets

### Supported languages (22)

| Code | Language       | File    |
|------|----------------|---------|
| en   | English        | en.ts   |
| es   | Español        | es.ts   |
| fr   | Français       | fr.ts   |
| de   | Deutsch        | de.ts   |
| it   | Italiano       | it.ts   |
| ja   | 日本語         | ja.ts   |
| zh   | 简体中文       | zh.ts   |
| pt   | Português      | pt.ts   |
| ru   | Русский        | ru.ts   |
| ko   | 한국어         | ko.ts   |
| hi   | हिंदी          | hi.ts   |
| ta   | தமிழ்          | ta.ts   |
| kn   | ಕನ್ನಡ          | kn.ts   |
| te   | తెలుగు         | te.ts   |
| ar   | العربية        | ar.ts   |
| tr   | Türkçe         | tr.ts   |
| nl   | Nederlands     | nl.ts   |
| sv   | Svenska        | sv.ts   |
| pl   | Polski         | pl.ts   |
| vi   | Tiếng Việt     | vi.ts   |
| th   | ภาษาไทย        | th.ts   |
| id   | Bahasa Indonesia | id.ts |

### Model selection

Only use `gemini-2.5-flash` or `gemini-2.5-pro`. Preview model IDs (`-preview-*`, `-lite-preview-*`) return 404 in `us-central1`.
