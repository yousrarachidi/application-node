Voici un exemple de contenu pour un fichier `README.md` en français qui pourrait aider les autres à lancer votre application sur leurs machines :

```markdown
# Notes Manager

## Description

Notes Manager est une application web qui permet aux utilisateurs de créer, mettre à jour et supprimer des notes avec un niveau d'importance spécifié. L'application est construite avec Node.js, Express, et MySQL, et est conteneurisée avec Docker.

## Prérequis

Avant de lancer ce projet, assurez-vous d'avoir les éléments suivants installés :

- Node.js (version 18.x ou supérieure)
- npm (Node Package Manager)
- Docker et Docker Compose
- Serveur MySQL (MariaDB)

## Installation

1. **Cloner le dépôt** :

   ```bash
   git clone lien du repo
   cd notes-manager
   ```

2. **Créer un fichier `.env`** à la racine du projet et le remplir avec les variables d'environnement suivantes :

   ```bash
   PORT=3000
   WEB_PORT=3001
   DB_HOST=localhost
   DB_USER=notes_user1
   DB_PASSWORD=notes_user1
   DB_NAME=notes_manager
   API_BASE_URL=http://localhost:3000
   ```

3. **Installer les dépendances** pour les parties API et Web de l'application :

   ```bash
   npm run install:all
   ```
4. installer la Bdd 
```bash
   sudo apt-get update
   sudo apt-get install mariadb-server
```
5. importation du schéma de la Bdd
```bash
   sudo mariadb -u root -p
```
```sql
   CREATE user 'notes_user1'

   SOURCE db/init.sql 

   GRANT ALL PRIVILEGES ON notes_manager.* TO 'notes_user1'@'localhost';

   FLUSH PRIVILEGES;
```
## Lancer l'application en local

### Avec Node.js

1. **Démarrer le serveur API** :

   ```bash
   npm run start:api
   ```

   Cela démarrera le serveur API sur `http://localhost:3000`.

2. **Démarrer le serveur Web** :

   Ouvrez une nouvelle fenêtre de terminal et exécutez :

   ```bash
   npm run start:web
   ```

   Cela démarrera le serveur web sur `http://localhost:3001`.

3. **Accéder à l'application** :

   Ouvrez votre navigateur et rendez-vous sur `http://localhost:3001` pour utiliser l'application Notes Manager.

## Tests

Pour exécuter les tests unitaires de l'application, utilisez :

```bash
npm test
```

## Dépannage

- **Problèmes de connexion à la base de données** : Assurez-vous que votre serveur MySQL est en cours d'exécution et que les identifiants dans votre fichier `.env` sont corrects.
- **Conflits de ports** : Assurez-vous que les ports 3000 et 3001 ne sont pas utilisés par d'autres applications sur votre machine.

## Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.


### Explication:

- **Prérequis** : Liste les logiciels nécessaires.
- **Installation** : Instructions pour configurer le projet.
- **Lancer l'application en local** : Fournit des étapes pour exécuter l'application avec Node.js.
- **Tests** : Décrit comment exécuter la suite de tests.
- **Dépannage** : Offre des conseils de base pour les problèmes courants.
- **Licence** : Mentionne la licence (que vous pouvez adapter selon vos préférences).

Ce fichier `README.md` devrait fournir un guide complet pour permettre à d'autres utilisateurs de configurer et d'exécuter votre application facilement.