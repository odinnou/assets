# Maillage interne — registre des cibles SEO

Ce fichier est le registre des relations **article ⇄ landing**. Le site étant du HTML
statique sans générateur, il n'existe pas de couche « propriété » : ce document tient
lieu de `primarySeoTarget` déclaratif. Toute modification du maillage se répercute ici.

## Principe

Le graphe visé :

```
requête informationnelle → article de blog → landing adaptée au problème → téléchargement
```

Règles :

- **Une cible principale par article**, une secondaire au maximum. Pas cinq.
- **Deux liens contextuels maximum** vers la cible : un dans le corps du texte, un en
  bloc final. Les liens de footer ne comptent pas.
- **L'ancre décrit le problème, pas la marque.** « une expérience guidée pour les
  couples de longue date » et non « découvrir Caresse ». L'ancre donne à Google
  l'information sémantique sur la page de destination.
- **Le lien retour est obligatoire** : chaque landing renvoie vers l'article qui la
  nourrit, via un bloc éditorial « Pour aller plus loin ». Pas de grille générique.

## Clusters

### Cluster « raviver la flamme »

| | |
|---|---|
| Requête | raviver la flamme, couple installé, routine |
| Article | `/blog/raviver-la-flamme-couple/` · `/en/blog/rekindle-relationship-spark/` · `/es/blog/reavivar-la-llama-en-pareja/` |
| Cible principale | `/for-long-term-couples/` |
| Cible secondaire | `/for-busy-couples/` |
| Lien retour depuis | `/for-long-term-couples/`, `/couples-game/` |

### Cluster « parler de ses fantasmes »

| | |
|---|---|
| Requête | parler de ses fantasmes, désirs, communication de couple |
| Article | `/blog/parler-de-ses-fantasmes/` · `/en/blog/talk-about-fantasies/` · `/es/blog/hablar-de-tus-fantasias/` |
| Cible principale | `/for-couples/` |
| Cible secondaire | `/for-adventurous-couples/` |
| Lien retour depuis | `/for-couples/`, `/for-new-couples/` |

### Cluster « exploration solo »

| | |
|---|---|
| Requête | exploration solo, culpabilité, temps pour soi |
| Article | `/blog/exploration-solo-deculpabiliser/` · `/en/blog/solo-exploration-without-guilt/` · `/es/blog/exploracion-en-solitario-sin-culpa/` |
| Cible principale | `/for-solo-exploration/` |
| Lien retour depuis | `/for-solo-exploration/` |

### Cluster « intimité et handicap visuel »

| | |
|---|---|
| Requête | intimité handicap visuel, audio, accessibilité |
| Article | `/blog/intimite-handicap-visuel-audio/` · `/en/blog/intimacy-visual-impairment-audio/` · `/es/blog/intimidad-discapacidad-visual-audio/` |
| Cible principale | `/for-blind-and-low-vision/` |
| Lien retour depuis | `/for-blind-and-low-vision/` |

### Cluster « jeu pour couple »

| | |
|---|---|
| Requête | jeu pour couple, jeu coquin, jeu sans cartes |
| Page | `/couples-game/` (transactionnelle, pas un article) |
| Cible principale | `/for-couples/` |
| Lien retour depuis | `/for-couples/` renvoie vers `/couples-game/` (déjà en place via le corps de page) |

### Cluster « démo audio » (page de destination centrale)

| | |
|---|---|
| Requête | démo audio couple, expérience audio couple, audio intime couple, guided intimacy audio, couples audio experience |
| Page | `/demo/` · `/en/demo/` · `/es/demo/` (transactionnelle : écoute immédiate) |
| Rôle | Destination unique de la promesse « écouter avant de s'inscrire », répétée jusqu'ici sur plusieurs pages sans URL propre |
| Liens entrants | Lien homepage sous la section vidéo, entrée de nav header (les 3 locales) |
| Liens sortants | `/for-couples/`, `/for-solo-exploration/`, `/alternatives/`, `/is-caresse-safe/`, `/how-it-works/` |

Les MP3 sont servis en URLs stables sous `/demos/*.mp3` (GitHub Pages renvoie
`Content-Type: audio/mpeg`), déclarés en `AudioObject` JSON-LD dans un `ItemList`, et
rattachés à l'entité `MobileApplication`. Les `.mp3` ne sont pas dans le sitemap : c'est
`/demo/` qu'on veut faire ranker.

Les CTA « Écouter les démos gratuites » des comparatifs (`/alternatives/`,
`/vs-melba/`, etc.) **restent pointés sur les stores** : ils avaient été basculés sur
`/demo/` puis remis en place sur demande. À ce stade, `/demo/` reçoit donc uniquement
les liens listés ci-dessus. Question ouverte : faut-il lui ouvrir d'autres entrées
internes, et depuis quelles pages.

## Liens retour posés (bloc « Pour aller plus loin »)

Un bloc éditorial inséré juste avant la `cta-section` de chaque landing. Une seule
carte, ancre problème, formulée dans la langue de la locale.

| Landing | Article cible |
|---|---|
| `/for-long-term-couples/` | raviver la flamme |
| `/for-couples/` | parler de ses fantasmes |
| `/for-new-couples/` | parler de ses fantasmes |
| `/for-solo-exploration/` | exploration solo |
| `/for-blind-and-low-vision/` | intimité et handicap visuel |
| `/couples-game/` | raviver la flamme |

Décliné à l'identique sur `/en/…` et `/es/…`.

## Hors périmètre volontaire

- **Titles et H1 inchangés.** La courbe étant bonne, l'objectif est de faire circuler
  l'autorité entre les URLs existantes, pas de perturber leurs signaux.
- `/for-adventurous-couples/` et `/for-busy-couples/` n'ont pas encore d'article dédié :
  ils restent cibles secondaires, sans lien retour, jusqu'à publication.
- `/blog/state-of-ai-romance-2026/` est un contenu d'autorité/presse, pas un article de
  cluster : pas de cible transactionnelle assignée.

## Mesure

Suivre dans Search Console, par cluster : impressions de l'article, clics vers la
landing cible, et position moyenne de la landing. Étendre le modèle au reste du blog
une fois le signal confirmé.
