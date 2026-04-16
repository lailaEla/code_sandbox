# 🚀 Invision Pixels — Site Corporate Premium

Site web corporate B2B premium pour **Invision Pixels**, agence de services IT, outsourcing et transformation digitale basée au Maroc, servant les marchés UK & Europe.

---

## ✅ Fonctionnalités implémentées

### Design & Animations
- **Parallaxe multi-couches** : fond héro, blobs animés, sections de fond
- **Parallaxe souris** : effet 3D interactif sur le héro au survol
- **Particules canvas** : réseau de particules animées dans le héro
- **Animations AOS** : apparition progressive des éléments au scroll
- **Scroll Progress Bar** : barre de progression en haut de la page
- **Typed Text Effect** : texte badge qui change dynamiquement
- **Page Loader** : animation de chargement élégante
- **Tilt 3D** sur les cartes services, why-cards et témoignages

### Sections du site (One-Page)
1. **Navbar** fixe avec scroll detection + menu mobile responsive
2. **Hero** : headline impactant, stats animées, carte flottante, badges
3. **Clients Band** : défilement infini des logos partenaires
4. **Services** : 6 cartes services IT avec icônes, tags et hover effects
5. **Pourquoi le Maroc** : layout sticky avec 5 avantages clés
6. **Tech Stack** : grille de 12 technologies avec couleurs officielles
7. **Processus** : 4 étapes timeline avec connecteurs
8. **Témoignages** : 3 cartes + 4 compteurs animés
9. **CTA Band** : section d'appel à l'action parallaxe
10. **Contact** : formulaire complet avec validation et sauvegarde API
11. **Footer** : 4 colonnes + réseaux sociaux

### Fonctionnalités JavaScript
- Compteurs animés (500+, 60%, 48h, 200+, 97%, etc.)
- Formulaire de contact avec validation et sauvegarde en base
- Navigation active par section (highlight au scroll)
- Back-to-top button
- Smooth scroll sur tous les liens d'ancre

---

## 📁 Structure des fichiers

```
index.html          — Page principale (one-page)
css/
  style.css         — Styles complets (variables, composants, responsive)
js/
  main.js           — JS : parallaxe, animations, formulaire, navbar
README.md
```

---

## 🗂️ API & Données

### Table : `contact_submissions`
| Champ | Type | Description |
|-------|------|-------------|
| id | text | Identifiant unique |
| firstName | text | Prénom |
| lastName | text | Nom |
| email | text | Email professionnel |
| company | text | Nom de l'entreprise |
| service | text | Service souhaité |
| message | rich_text | Description du projet |

**Endpoint** : `POST tables/contact_submissions`

---

## 🎨 Palette de couleurs

| Variable | Couleur | Usage |
|----------|---------|-------|
| `--primary` | `#0B5C61` | Teal foncé principal |
| `--accent` | `#1CC8A0` | Vert menthe accent |
| `--gold` | `#e8a020` | Or pour étoiles/accents |
| `--dark` | `#0d1117` | Fond sombre sections |
| `--white` | `#ffffff` | Fond clair sections |

---

## 📱 Responsive

- **Desktop** : > 1024px — layout complet
- **Tablet** : 768-1024px — grilles 2 colonnes
- **Mobile** : < 768px — menu burger, colonnes empilées

---

## 🔜 Prochaines étapes recommandées

- [ ] Ajouter des photos réelles de l'équipe (section About)
- [ ] Page de détail pour chaque service
- [ ] Intégration d'un chatbot / live chat
- [ ] Section Blog avec articles IT
- [ ] Dashboard admin pour voir les soumissions de formulaire
- [ ] Intégration CRM (HubSpot, Salesforce)
- [ ] Animations Lottie pour les icônes de services
- [ ] Version multilingue (FR/EN/AR)

---

## 🌐 URLs

- **Site principal** : `index.html`
- **API contact** : `tables/contact_submissions`

---

*Conçu avec inspiration de la structure BairesDev et l'univers de marque Invision Pixels.*
