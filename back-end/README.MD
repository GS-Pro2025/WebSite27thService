# Crear las tablas

Para crear todas las tablas a partir de los archivos de migración, ejecuta el siguiente comando:

```bash
npx sequelize-cli db:migrate
```

# Revertir migraciones

```bash
npx sequelize-cli db:migrate:undo
```

# Crear los servicios 
```bash
npm run seed:services

```
## Ejecutar la Aplicación
```bash
npm run dev
```
```bash
npx sequelize-cli migration:generate --name create-users-table
npx sequelize-cli migration:generate --name create-comments-table
```

# Borrar y crear la BD
```bash
DROP DATABASE IF EXISTS 27th_db;
CREATE DATABASE IF NOT EXISTS 27th_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE 27th_db;
```