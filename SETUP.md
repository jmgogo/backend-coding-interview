# Setup

## About Env

Bun is a fast all-in-one toolkit designed for developing, testing, running, and bundling JavaScript and TypeScript projects.

This repository provide a development environment for [Bun](https://bun.sh/) using [Dev Containers](https://containers.dev/) with a postgresql database service.

## Launch

Open Docker Desktop to run the Docker daemon, a background process that manages and coordinates Docker containers on your system. On VS Code, start the development container by running `Dev Containers: Rebuild and Reopen In Container` in the command palette. It can be accessed with the keyboard shortcut `ctrl + shift + P` on your keyboard.

---

_Checkout the [bun docs](https://bun.sh/docs) or [devcontainer docs](https://containers.dev/overview) for more information!_

## Test

To run the test use:

```bash
bun run test
```

## Server

To run the server with hot-reloading:

```sh
bun run dev
```

open http://localhost:3000

## Database Utils

The database service is automatically spun up when you launch the devcontainer. For advanced control, you can run the vscode task to connect via the psql cli. For feature rich data insights, you can connect through drizzle-studio via:

```sh
bun run db:studio
```

Before loading data, you'll want to make sure that the database matches our project schema via:

```sh
bun run db:migrate
```

New migrations can be generated via changes to the schema under `db/schema/` with:

```sh
# Will prompt you to input a migration name
bun run db:generate
```

To seed the database with data from `photos.csv` run:

```sh
bun run db:seed
```

To clear data from each table in the database run:

```sh
bun run db:reset
```
