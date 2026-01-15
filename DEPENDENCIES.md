# 📦 Dépendances du Projet O'Rubri

## Résumé des Dépendances Principales

Toutes les dépendances nécessaires pour le projet O'Rubri sont **déjà installées** dans le projet.

---

## 🎨 FRONTEND DEPENDENCIES

### UI & Composants
| Package | Version | Usage |
|---------|---------|-------|
| `react` | ^18.3.1 | Framework React |
| `react-dom` | ^18.3.1 | Rendu DOM |
| `@radix-ui/*` | ^1.x | 20+ composants accessibles |
| `shadcn/ui` | (composants) | Composants préconfigurés |
| `lucide-react` | ^0.462.0 | Icônes SVG |

### Navigation & Routing
| Package | Version | Usage |
|---------|---------|-------|
| `react-router-dom` | ^6.26.2 | Navigation entre pages |

### Formulaires & Validation
| Package | Version | Usage |
|---------|---------|-------|
| `react-hook-form` | ^7.53.0 | Gestion formulaires |
| `@hookform/resolvers` | ^3.9.0 | Validation avec Zod |
| `zod` | ^3.23.8 | Schéma validation |

### HTTP & Data
| Package | Version | Usage |
|---------|---------|-------|
| `axios` | ^1.13.2 | Requêtes HTTP API |
| `@tanstack/react-query` | ^5.56.2 | Gestion état asynchrone |

### Dates & Temps
| Package | Version | Usage |
|---------|---------|-------|
| `date-fns` | ^3.6.0 | Manipulation des dates |
| `react-day-picker` | ^8.10.1 | Calendar picker |

### Styling
| Package | Version | Usage |
|---------|---------|-------|
| `tailwindcss` | ^3.4.11 | Framework CSS |
| `tailwind-merge` | ^2.5.2 | Merge classes Tailwind |
| `tailwindcss-animate` | ^1.0.7 | Animations CSS |
| `class-variance-authority` | ^0.7.1 | Composant styling |
| `clsx` | ^2.1.1 | Condition className |

### Notifications & Toasts
| Package | Version | Usage |
|---------|---------|-------|
| `sonner` | ^1.5.0 | Toast notifications |

### Misc
| Package | Version | Usage |
|---------|---------|-------|
| `cmdk` | ^1.0.0 | Commande palette |
| `embla-carousel-react` | ^8.3.0 | Carrousel images |
| `react-resizable-panels` | ^2.1.3 | Panneaux redimensionnables |
| `recharts` | ^2.12.7 | Graphiques |
| `vaul` | ^0.9.3 | Drawer animations |
| `next-themes` | ^0.3.0 | Thème dark/light |
| `input-otp` | ^1.2.4 | Input OTP |

---

## ⚙️ BACKEND DEPENDENCIES

### Framework Web
| Package | Version | Usage |
|---------|---------|-------|
| `express` | ^4.19.2 | Framework web backend |

### Middleware
| Package | Version | Usage |
|---------|---------|-------|
| `body-parser` | ^1.20.2 | Parsing requêtes JSON |
| `cors` | ^2.8.5 | Gestion CORS |

---

## 🛠️ DEV DEPENDENCIES

### Runtime TypeScript
| Package | Version | Usage |
|---------|---------|-------|
| `ts-node` | ^10.9.2 | Exécution TypeScript |
| `typescript` | ^5.5.3 | Langage TypeScript |
| `nodemon` | ^3.1.4 | Reload automatique |

### Types
| Package | Version | Usage |
|---------|---------|-------|
| `@types/react` | ^18.3.3 | Types React |
| `@types/react-dom` | ^18.3.0 | Types ReactDOM |
| `@types/node` | ^22.5.5 | Types Node |
| `@types/express` | ^4.17.21 | Types Express |
| `@types/body-parser` | ^1.19.5 | Types Body Parser |
| `@types/cors` | ^2.8.17 | Types CORS |

### Build Tools
| Package | Version | Usage |
|---------|---------|-------|
| `vite` | ^6.3.4 | Build tool (frontend) |
| `@vitejs/plugin-react-swc` | ^3.9.0 | Plugin React/SWC |

### Linting & Code Quality
| Package | Version | Usage |
|---------|---------|-------|
| `eslint` | ^9.9.0 | Linting JavaScript |
| `@eslint/js` | ^9.9.0 | Config ESLint |
| `eslint-plugin-react-hooks` | ^5.1.0-rc.0 | Rules React Hooks |
| `eslint-plugin-react-refresh` | ^0.4.9 | Rules React Refresh |
| `typescript-eslint` | ^8.0.1 | TypeScript ESLint |
| `globals` | ^15.9.0 | Variables globales ESLint |

### CSS Processing
| Package | Version | Usage |
|---------|---------|-------|
| `tailwindcss` | ^3.4.11 | Framework CSS |
| `postcss` | ^8.4.47 | Traitement CSS |
| `autoprefixer` | ^10.4.20 | Préfixes navigateurs |

### Other Dev Tools
| Package | Version | Usage |
|---------|---------|-------|
| `@dyad-sh/react-vite-component-tagger` | ^0.8.0 | Tagging components |
| `@tailwindcss/typography` | ^0.5.15 | Plugin typography |

---

## 📋 Scripts Disponibles

```json
{
  "dev": "vite",                    // Dev server frontend
  "build": "vite build",             // Build production
  "build:dev": "vite build --mode development",
  "lint": "eslint .",                // ESLint check
  "preview": "vite preview",         // Preview build
  "server": "nodemon --watch src/server --exec ts-node src/server/server.ts"
}
```

---

## ✅ Vérification des Dépendances

Pour vérifier que tout est bien installé :

```bash
# Lister les packages
pnpm list

# Vérifier la conformité
pnpm audit

# Mettre à jour si nécessaire
pnpm update
```

---

## 🎯 Dépendances Critiques pour O'Rubri

| Composant | Dépendance Clé | Rôle |
|-----------|----------------|------|
| Pages (Home, Menu, Events) | `react-router-dom` | Navigation |
| Réservation (formulaire) | `react-hook-form` + `zod` | Validation |
| Dates/Calendrier | `date-fns` | Sélection dates |
| Appels API | `axios` | Communication backend |
| Design/Couleurs | `tailwindcss` | Styling |
| Composants UI | `shadcn/ui` | Interface |
| Notifications | `sonner` | Messages succès/erreur |
| Backend | `express` | API REST |

---

## 🚀 Installation & Démarrage

```bash
# Installation des dépendances
pnpm install

# Frontend développement
pnpm dev                 # http://localhost:5173

# Backend développement  
pnpm run server         # http://localhost:3001

# Build production
pnpm build

# Check code quality
pnpm lint
```

---

## 📝 Notes Importantes

1. **Toutes les dépendances sont déjà configurées** dans `package.json`
2. **Pas besoin d'installations supplémentaires** pour le projet O'Rubri
3. **Les versions sont compatibles** entre elles
4. **TypeScript est fully configuré** pour le projet
5. **ESLint et Prettier** sont prêts à l'usage

---

## 🔄 Mise à Jour des Dépendances

Pour mettre à jour une dépendance spécifique :

```bash
pnpm update [package-name]@latest
```

Pour mettre à jour toutes les dépendances :

```bash
pnpm update -i --latest
```

---

## 🐛 Dépannage

Si vous rencontrez une erreur de module manquant :

```bash
# Réinstaller node_modules
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

---

**Statut : ✅ Toutes les dépendances sont présentes et à jour**
