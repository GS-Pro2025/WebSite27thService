# Crear las tablas

Para crear todas las tablas a partir de los archivos de migración, ejecuta el siguiente comando:

```bash
npx sequelize-cli db:migrate
```

# Revertir migraciones

```bash
npx sequelize-cli db:migrate:undo
```

## Ejecutar la Aplicación
```bash
npm run dev
```
```bash
npx sequelize-cli migration:generate --name create-users-table
```