<samp>

# URL Shortener App with Next.js 15, Tailwind, Shadcn, Prisma, PostgreSQL

## Table of Content

- [URL Shortener App with Next.js 15, Tailwind, Shadcn, Prisma, PostgreSQL](#url-shortener-app-with-nextjs-15-tailwind-shadcn-prisma-postgresql)
  - [Table of Content](#table-of-content)
  - [Prisma](#prisma)
    - [Installation](#installation)
    - [Initialization](#initialization)
    - [Connect to a DB by updating .env file](#connect-to-a-db-by-updating-env-file)
    - [Create Model and schema in `schema.prisma` file](#create-model-and-schema-in-schemaprisma-file)
    - [Generate Prisma Client](#generate-prisma-client)
    - [Push Your Schema to the Database (use migration command for both dev and prod)](#push-your-schema-to-the-database-use-migration-command-for-both-dev-and-prod)
      - [How It Works:](#how-it-works)
      - [Common Commands:](#common-commands)
      - [How It Works:](#how-it-works-1)
      - [Common Usage:](#common-usage)
    - [(Optional) Explore Your Data with Prisma Studio](#optional-explore-your-data-with-prisma-studio)
    - [Install and Generate Prisma Client - To connect backend stuff to frontend](#install-and-generate-prisma-client---to-connect-backend-stuff-to-frontend)
    - [Setting Up Prisma Client in Next.js](#setting-up-prisma-client-in-nextjs)
    - [Push db](#push-db)
  - [Shadcn](#shadcn)
    - [Installation and initialization](#installation-and-initialization)
    - [Components Installation](#components-installation)

## [Prisma](https://www.cand.site/blog/prisma-nextjs-guide)

### Installation 

- Run this command: `npm i prisma`

### Initialization 

- Run this command: `npx prisma init`

- This command does two important things:
  1. Creates a new prisma directory containing a `schema.prisma` file. This file is where you'll define your database schema and models.
  2. Creates a `.env` file in the root of your project. This file is used to store environment variables, including your database connection string.

### Connect to a DB by updating .env file

- Change database string from `DATABASE_URL` variable from `.env` file

### Create Model and schema in `schema.prisma` file

- Define you schema for Model

### Generate Prisma Client 

- Run this command: `npx prisma generate`

### Push Your Schema to the Database (use migration command for both dev and prod)

1. Using `prisma migrate`
   
- prisma migrate is used to apply schema changes to the database in a structured, versioned way. This is ideal for both development and production environments because it ensures that the database schema is consistently updated and tracked over time.

#### How It Works:

- It generates migration files for schema changes in your Prisma schema (schema.prisma), and stores them in a prisma/migrations folder.
- These migrations are stored and can be applied to the database in the correct order, allowing for a history of schema changes.

#### Common Commands:

- `prisma migrate dev`: Used in development to generate and apply migrations.
- `prisma migrate deploy`: Used in production to apply migrations that have been created previously in development.
- `prisma migrate reset`: Resets the database and applies all migrations from the start, useful in development.

2. Using `prisma db push`

- prisma db push is a simpler command compared to prisma migrate. It’s used to push changes directly to the database without generating or applying migration files. It doesn't create migration history, and therefore, it should only be used in development environments or in scenarios where migration history is not important.

#### How It Works:
- Directly syncs the Prisma schema with the database by applying changes in the schema.prisma file.
- It doesn't generate migration files and doesn’t track schema changes over time. Therefore, it’s more suitable for quick, non-destructive changes during development.

#### Common Usage:

1. In Development: 

- It’s useful for quick testing or when the migrations are not necessary for your workflow.
- Changes are directly reflected in the database without keeping track of the migration history.

2. In Production:

- It is NOT recommended to use prisma db push in production as it doesn't provide a reliable way to track and version schema changes. It also lacks safety mechanisms for handling complex schema changes, like data transformations, etc.

### (Optional) Explore Your Data with Prisma Studio

- Run this command: `npx prisma studio`

### Install and Generate Prisma Client - To connect backend stuff to frontend

- Run this command: `npm install @prisma/client`
- After installation, generate Prisma Client by this command: `npx prisma generate`

### Setting Up Prisma Client in Next.js

- Create a new directory and file for database operations: `mkdir lib && touch lib/db.ts`
- In lib/db.ts, paste the following code:

```ts
import { PrismaClient } from '@prisma/client';
 
const prismaClientSingleton = () => {
  return new PrismaClient();
};
 
declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;
 
const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();
 
export default prisma;
 
if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;
```

- This code ensures that only one instance of PrismaClient is created and reused across your application, preventing the creation of multiple instances during development hot reloads. It creates a single PrismaClient instance and saves it on the globalThis object, reusing it if it already exists.

### Push db

- whenever we change anything in Prisma schema we have to push changes to db using following command: `npx prisma db push`

---

## [Shadcn](https://ui.shadcn.com/docs)

### Installation and initialization

`npx shadcn@latest init`

### Components Installation

`npx shadcn@latest add button input`

---

</samp>