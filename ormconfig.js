if (process.env.NODE_ENV === 'development') {
    module.exports = {
        "type": "mysql",
        "host": process.env.DB_HOST,
        "port": process.env.DB_PORT,
        "username": process.env.DB_USERNAME,
        "password": process.env.DB_PASSWORD,
        "database": process.env.DB_DATABASE,
        "entities": ["src/entities/*.ts"],
        "migrations": ["src/database/migrations/*.ts"],
        "cli": {
            "migrationsDir": "src/database/migrations",
            "entitiesDir": "src/entities"
        }
    }
    return
}
if (process.env.NODE_ENV === 'production'){
    module.exports = {
        "type": "mysql",
        "url": process.env.CLEARDB_DATABASE_URL,
        "entities": ["dist/entities/*.ts"],
        "migrations": ["dist/database/migrations/*.ts"],
        "cli": {
            "migrationsDir": ["src/database/migrations/"],
            "entitiesDir": "src/entities"
        }
    }
    return
}
