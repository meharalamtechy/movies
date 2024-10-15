# Node.js Project
Dummy project for add movies list, using login creadentials.
This Node.js project uses Knex.js for database migrations and seeding.
This project uses postgreSQL for database.

## Setup

1. **Clone Repository**: `git clone https://github.com/yourusername/yourproject.git`
2. **Install Dependencies**: `npm install`
3. **Configure Database**: Update `./db/knexfile.js` with your database connection settings.

## Scripts

- **Start Server**: `npm start`
- **Run Migrations**: `npm run migrate:latest`
- **Create Migration**: `npm run migrate:new --name=<migration_name>`
- **Rollback Migrations**: `npm run migrate:rollback`
- **Seed Data**: `npm run seed:data`

## Note
- 1. First, create a new database (e.g., MoviesDb) in PostgreSQL, and then follow the instructions mentioned above.
- 2. **Run Migrations**: `npm run migrate:latest` (used for create migration in db and run this command in db folder)
- 3. **Seed Data**: `npm run seed:data` (used for create user in users table and run this command in db folder)
- 4. **Start Server**: `npm start` (used for run project)