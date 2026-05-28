# FirstApp — Angular 21 + NgRx Signals + Tailwind CSS

Application de gestion de produits construite avec les dernières technologies Angular.

![Angular](https://img.shields.io/badge/Angular-21-red?logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue?logo=typescript)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3-38bdf8?logo=tailwindcss)
![NgRx](https://img.shields.io/badge/NgRx-Signals-purple?logo=ngrx)

---

## 📋 Fonctionnalités

- ✅ Liste des produits avec pagination et recherche
- ✅ Détail d'un produit avec commentaires
- ✅ Création d'un produit avec validation
- ✅ Modification d'un produit
- ✅ Suppression d'un produit
- ✅ Liste des catégories
- ✅ Gestion des états de chargement et d'erreur

---

## 🛠 Stack technique

| Technologie | Version | Rôle |
|-------------|---------|------|
| Angular | 21 | Framework principal |
| TypeScript | 5+ | Typage statique strict |
| Tailwind CSS | 3 | Styles utilitaires |
| NgRx Signals | latest | State management |
| CVA | latest | Variantes de composants |
| DummyJSON | - | API fake REST |

---

## 🏗 Architecture

```
src/app/
├── core/
│   ├── models/          → interfaces TypeScript (IProduct, ICategory...)
│   ├── services/        → services HTTP CRUD
│   └── store/           → NgRx Signal Store
├── shared/
│   └── components/      → Button, Card, Input (CVA + Tailwind)
└── features/
    ├── products/         → liste, détail, formulaire
    └── categories/       → liste des catégories
```

---

## ⚙️ Installation

```bash
# Cloner le projet
git clone https://github.com/thomas-bruston/firstApp.git
cd firstApp

# Installer les dépendances
npm install

# Lancer le serveur de développement
ng serve

# Ouvrir http://localhost:4200
```

---

## 🔑 Concepts clés implémentés

### NgRx Signal Store
State management moderne sans boilerplate — remplace Actions/Reducers/Effects par un store déclaratif avec `withState`, `withMethods` et `withComputed`.

### Zoneless Change Detection
Angular 21 sans Zone.js — détection des changements basée sur les Signals uniquement. Bundle plus léger, performances améliorées.

### CVA — Class Variance Authority
Gestion des variantes de composants UI sans conditions dans les templates. Les composants `Button`, `Card` et `Input` exposent des `@Input()` typés (`variant`, `size`, `state`).

### Reactive Forms typés
Formulaires avec validation complète — `Validators.required`, `minLength`, `min`. Gestion des erreurs par getters TypeScript.

---

## 📁 Conventions de code

### Interfaces
```typescript
IProduct        // lecture
IProductCreate  // création — sans id
IProductUpdate  // modification — champs optionnels + id obligatoire
```

### Services
```typescript
// Toujours inject() — jamais de constructeur
private readonly http = inject(HttpClient);

// Toujours Observable<Interface> en retour
getAll(): Observable<IProductsResponse> { ... }
```

### Git
```
feat:     nouvelle fonctionnalité
fix:      correction de bug
refactor: réécriture sans changer le comportement
chore:    tâche technique
```

---

## 🌐 API

Projet utilise [DummyJSON](https://dummyjson.com) comme API fake :

```
GET    /products              → liste paginée
GET    /products/:id          → détail
POST   /products/add          → créer
PUT    /products/:id          → modifier
DELETE /products/:id          → supprimer
GET    /products/categories   → liste catégories
GET    /comments              → commentaires
```

---

## 👤 Auteur

**Thomas Bruston**
- GitHub : [@thomas-bruston](https://github.com/thomas-bruston)
- LinkedIn : [thomas-bruston](www.linkedin.com/in/thomas-bruston-0401a7315)