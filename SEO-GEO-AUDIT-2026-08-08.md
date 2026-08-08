# Audit SEO / GEO — caresse.app

> **Photo au 2026-08-08** — État constaté sur la branche `main_v2` au commit `c6d7bcb` (`feat(melt): optimize alternative page (#37)`).
> Site live : https://caresse.app (GitHub Pages, `CNAME` → `caresse.app`).
> Aucune correction appliquée : ce document est un instantané de départ.

## Résumé

La base technique SEO est de très bon niveau : aucun lien interne cassé, aucun JSON-LD invalide, canonicals tous corrects, `<h1>` unique partout, hreflang réciproques à deux exceptions près. Le gisement de valeur est ailleurs :

1. **Le GEO est à zéro** — aucune infrastructure pour les moteurs de réponse IA.
2. **19 pages sur 86 sont hors sitemap**, dont les 16 pages légales (signal E-E-A-T).
3. **`/download/`, la page de conversion, est orpheline** (0 lien entrant).

## Périmètre mesuré

| Métrique | Valeur |
|---|---|
| Pages HTML totales | 86 |
| URLs dans `sitemap.xml` | 67 |
| Pages hors sitemap | 19 |
| Locales | FR (racine), EN (`/en/`), ES (`/es/`), PT (`/pt/`, partiel) |
| Blocs JSON-LD invalides | 0 |
| Liens internes cassés | 0 (sur ~600 `href`/`src`) |

### Répartition par locale

| Locale | Pages (hors `/legal/`) | Légales |
|---|---|---|
| FR (racine) | 24 | 4 |
| EN | 24 | 4 |
| ES | 21 | 4 |
| PT | 1 (`/pt/support/`) | 4 |

## Contrôles conformes — à ne pas régresser

| Contrôle | Résultat |
|---|---|
| Canonicals (70 pages non-légales) | 100 % corrects, aucun mismatch avec l'URL réelle |
| Liens internes cassés | 0 |
| Validité JSON-LD | 86 pages parsées, 0 erreur |
| `<h1>` par page | exactement 1, partout |
| `x-default` hreflang | présent sur toutes les pages non-légales |
| hreflang → URL existante | 0 lien mort |
| Réciprocité hreflang | correcte partout **sauf `/blog/`** (cf. P0-5) |

### Vocabulaire schema.org en place

Types présents (occurrences) : `Question` 345, `Answer` 345, `ListItem` 139, `Organization` 87, `FAQPage` 57, `BreadcrumbList` 57, `WebPage` 54, `Offer` 51, `MobileApplication` 51, `WebSite` 48, `ImageObject` 24, `SoftwareApplication` 18, `BlogPosting` 15, `Article` 9, `CollectionPage` 3, `Blog` 3, `Audience` 3.

`Organization.sameAs` déclare 6 profils : App Store, Google Play, X, Instagram, YouTube, TikTok.

---

## P0 — Fort impact

### P0-1. Aucune infrastructure GEO

| Fichier | État |
|---|---|
| `/llms.txt` | **404** |
| `/llms-full.txt` | absent |
| `/ai.txt` | absent |
| `/.well-known/ai-plugin.json` | absent |

`robots.txt` fait 3 lignes utiles et ne mentionne **aucun** crawler IA (`GPTBot`, `ClaudeBot`, `PerplexityBot`, `OAI-SearchBot`, `CCBot`, `Google-Extended`) :

```
User-agent: *

Sitemap: https://caresse.app/sitemap.xml
```

**Enjeu.** La découverte se déplace vers des requêtes conversationnelles (« quelle appli audio intime sans créer de compte ? »). Les 4 piliers de positionnement — démos sans compte FR/EN/ES, anonymous-first, personnalisation profonde avec prénoms, pay-per-session — sont précisément le type de faits différenciants qu'un LLM cite **s'il les trouve structurés et attribuables**.

**Action.** Autoriser explicitement les crawlers IA dans `robots.txt` ; créer `llms.txt` listant les URLs clés avec une phrase de contexte chacune, plus les 4 piliers énoncés en clair, **limites factuelles incluses**.

### P0-2. 19 pages hors sitemap

Manquent :

- les **16 pages légales** (`/legal/{fr,en,es,pt}/{cgu,cgv,legals,privacy}/`)
- **`/download/`**, **`/en/download/`**, **`/es/download/`**

Les 16 pages légales sont aussi les **seules du site** dépourvues de `canonical`, `meta description`, `hreflang` **et** JSON-LD. Sur une thématique intime, ces pages sont un signal de confiance (E-E-A-T) non négligeable.

### P0-3. `/download/` orpheline — 0 lien entrant

Liens internes entrants, pages FR :

| Liens | Page |
|---|---|
| 25 | `/` |
| 23 | `/alternatives/`, `/blog/`, `/couples-game/`, `/how-it-works/`, `/is-caresse-safe/` |
| 22 | `/for-adventurous-couples/`, `/for-busy-couples/`, `/for-long-term-couples/`, `/for-solo-exploration/` |
| 21 | `/for-couples/` |
| 12 | `/for-new-couples/` |
| 8 | `/vs-coelle/`, `/vs-dipsea/`, `/vs-inthemoment/`, `/vs-magicwave/`, `/vs-melba/`, `/vs-melt/` |
| 3-4 | articles de blog |
| **1** | **`/support/`** |
| **0** | **`/download/`** |

La page de conversion la plus directe n'est liée depuis aucune page du site.

### P0-4. Home sans `FAQPage`, sous-dotée en contenu

| Page | Questions structurées | Mots |
|---|---|---|
| `/` | **0** | **615** |
| `/for-couples/` | 6 | 711 |
| `/how-it-works/` | 6 | 676 |
| `/is-caresse-safe/` | 8 | 829 |
| `/alternatives/` | 5 | 1467 |
| `/vs-melt/` | 7 | 1580 |

La home reçoit le plus de liens internes (25) et est la moins armée pour les extraits enrichis et les réponses IA.

### P0-5. `hreflang="es"` manquant sur `/blog/`

`/es/blog/` pointe vers ses équivalents FR et EN, mais ni `/blog/` ni `/en/blog/` ne lui répondent :

```
blog/index.html      : manque hreflang="es" → https://caresse.app/es/blog/
en/blog/index.html   : manque hreflang="es" → https://caresse.app/es/blog/
```

Grappe non réciproque : Google peut ignorer l'association et laisser la version ES hors index. **Seule anomalie hreflang du site.**

---

## P1 — Performance (Core Web Vitals)

### P1-6. 36 Mo d'assets morts à la racine

| Fichier | Poids | Référencé dans le HTML |
|---|---|---|
| `foreground-final.webm` | 24 Mo | **non** |
| `meditation.mp3` | 12 Mo | **non** |
| `clone.m4a` | 311 Ko | **non** |

Aucun impact LCP direct (jamais chargés), mais alourdissent le repo et restent publiquement téléchargeables.

### P1-7. 12 PNG servis alors que le `.webp` existe

Les `.webp` sont **déjà présents** dans `screens/fr/` et `screens/en/` — aucune conversion à faire.

Home FR (`index.html`), `~750 Ko` l'unité :

- `screens/fr/05_android_fr.png` (ligne 686)
- `screens/fr/07_android_fr.png` (ligne 697)
- `screens/fr/08_android_fr.png` (ligne 708)
- `screens/fr/09_android_fr.png` (ligne 719)

Même problème côté EN (`05`, `07`, `08`, `09_android_en.png`) et sur les variantes en chemin absolu. Ordre de grandeur : **~2,5 Mo évitables par page**.

État de l'optimisation images sur la home : 18 `<img>`, 13 en `loading="lazy"`, 12 avec `width`/`height` explicites.

### P1-8. GitHub Pages — `cache-control: max-age=600`

En-têtes constatés sur `https://caresse.app/` :

```
HTTP/2 200
server: GitHub.com
cache-control: max-age=600
x-github-edge-region: fra
```

10 minutes sur tous les assets, non configurable sur GitHub Pages. Un CDN devant (Cloudflare gratuit) apporterait cache long, Brotli et HTTP/3 — à considérer si les CWV mobiles coincent.

---

## P2 — Affinages

- **`speakable`, `QAPage`, `HowTo` absents partout** (0 page sur 86). `/how-it-works/` est un candidat évident pour `HowTo`.
- **Fraîcheur peu déclarée** : `dateModified` sur 9 pages, `datePublished` sur 15. Critère de sélection fort pour les moteurs IA. Les 6 pages `/vs-*` gagneraient un `dateModified` visible (« comparatif à jour en 2026 »).
- **Descriptions > 160 caractères** (tronquées en SERP) : `/couples-game/` 197, `/for-couples/` 189, `/alternatives/` 185, `/how-it-works/` 184.
- **Title trop long** : `/alternatives/` 92 caractères — coupé aussi.
- **Pages `/vs-*` sous-maillées** : 8 liens entrants contre 22 pour les `/for-*`, alors que leur contenu est le plus riche du site (1580 mots pour `/vs-melt/`). Ce sont les pages qui captent l'intention comparative, la plus qualifiée.
- **PT quasi inexistant** : `/pt/support/` seul, plus 4 pages légales. Décision à prendre : compléter ou assumer.

---

## Contrainte à respecter dans toute correction

Les quotes type « Manon & Yannick », « Sophie & James » sur les pages satellites sont **illustratives, pas de vrais avis utilisateurs**. Ne pas ajouter de `Review` / `AggregateRating` autour : risque de pénalité Google et caractère trompeur. Contrainte déjà documentée dans `# CLAUDE.md` et respectée dans les recommandations ci-dessus.

---

## Ordre d'exécution conseillé

| # | Action | Réf. |
|---|---|---|
| 1 | `robots.txt` (crawlers IA) + création de `llms.txt` | P0-1 |
| 2 | Sitemap : +19 URLs, et compléter le `<head>` des pages légales | P0-2 |
| 3 | Lier `/download/` et `/support/` depuis le footer global | P0-3 |
| 4 | `hreflang="es"` sur `/blog/` FR + EN | P0-5 |
| 5 | Basculer les 12 PNG en `.webp` ; supprimer les 36 Mo d'assets morts | P1-7, P1-6 |
| 6 | `FAQPage` + étoffement de la home | P0-4 |
| 7 | `HowTo` sur `/how-it-works/` ; `dateModified` sur les `/vs-*` | P2 |

Les points 1 à 5 sont mécaniques et sans risque de régression éditoriale.

## Méthode

Audit statique des 86 fichiers HTML de la branche (parsing `hreflang`/`canonical`/JSON-LD, graphe de liens internes, comptage de mots hors `<script>`/`<style>`), complété par des requêtes HTTP sur le site live (en-têtes, `robots.txt`, présence de `llms.txt`, statut des pages légales).

**Non couvert** : données Search Console (impressions, positions, couverture réelle d'indexation), scores Lighthouse/CWV terrain, analyse de backlinks, recherche de volumes de mots-clés. Ces sources renseigneraient la priorisation mais n'étaient pas accessibles depuis le repo.
