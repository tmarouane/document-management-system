# Système de Gestion Documentaire d'Entreprise

Application web moderne et performante pour la gestion complète des documents d'entreprise, permettant l'organisation, le stockage, la recherche, le partage et la collaboration sur des documents tout en garantissant la sécurité et la conformité des données.

## Fonctionnalités Principales

### Phase 1 (MVP)
- **Gestion des utilisateurs et permissions**
  - Authentification et autorisation sécurisées
  - Gestion des rôles (admin, gestionnaire, éditeur, lecteur)
  - Organisation en groupes et départements
- **Gestion documentaire de base**
  - Upload/download de documents
  - Organisation en dossiers/sous-dossiers
  - Métadonnées essentielles (titre, description, tags, auteur)
  - Versionnage simple
- **Interface intuitive**
  - Dashboard personnalisé
  - Navigation par arborescence
  - Recherche simple
  - Prévisualisation des documents

### Phase 2
- Fonctionnalités collaboratives (commentaires, workflows d'approbation)
- Recherche avancée en texte intégral
- Dashboard amélioré avec widgets personnalisables
- API publique documentée

### Phase 3
- IA pour classification automatique de documents
- OCR pour documents numérisés
- Conformité et gouvernance (politiques de rétention, journalisation d'audit)

## Technologies

### Frontend
- React avec Material UI
- Gestion d'état avec Redux
- TypeScript pour la sécurité du typage
- Tests avec Jest et React Testing Library

### Backend
- Node.js avec NestJS
- API RESTful documentée avec Swagger
- TypeScript
- Tests avec Jest

### Base de données & Stockage
- PostgreSQL pour les métadonnées
- MinIO (compatible S3) pour le stockage des fichiers
- Elasticsearch pour l'indexation et la recherche avancée

### Authentification & Sécurité
- JWT pour l'authentification
- OAuth 2.0
- Support SAML pour SSO (Phase 2)

## Prérequis techniques
- Node.js >= 18.x
- PostgreSQL >= 14.x
- Docker et Docker Compose pour l'environnement de développement
- MinIO (ou service S3 compatible)
- Elasticsearch 8.x

## Installation et démarrage

### Avec Docker (recommandé)
```bash
# Cloner le dépôt
git clone https://github.com/tmarouane/document-management-system.git
cd document-management-system

# Installer les dépendances du projet
npm install

# Démarrer l'environnement avec Docker Compose
docker-compose up -d

# Initialiser la base de données
npm run db:migrate

# Démarrer l'application en développement
npm run dev
```

### Installation manuelle
Voir la documentation détaillée dans `docs/installation.md`

## Structure du projet
```
├── client/               # Frontend React
├── server/               # Backend NestJS
├── docs/                 # Documentation
├── docker/               # Configurations Docker
├── scripts/              # Scripts utilitaires
└── docker-compose.yml    # Configuration des services
```

## Documentation
- [Guide d'installation](docs/installation.md)
- [Documentation API](docs/api.md)
- [Guide administrateur](docs/admin-guide.md)
- [Guide utilisateur](docs/user-guide.md)
- [Architecture technique](docs/architecture.md)

## Licence
Propriétaire - Tous droits réservés
