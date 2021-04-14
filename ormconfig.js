const ormConfig = {
  type: 'postgres',

  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'schedules_db',

  entities: ['./src/modules/**/infra/typeorm/entities/*.ts'],
  migrations: ['./src/shared/database/typeorm/migrations/*.ts'],

  cli: {
    migrationsDir: './src/shared/database/typeorm/migrations',
    entitiesDir: './src/modules/**/infra/typeorm/entities',
  },
};

module.exports = ormConfig;
