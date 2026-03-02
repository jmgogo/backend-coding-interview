# Setup

## Pre-requisites

1. Please make sure you have a container management tool like `Docker` or `Podman` installed and running.
2. You will also have to install the [remote development](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack) vscode extension package.

## About Env

This repository provide a development environment for [Bun](https://bun.sh/) with a postgresql database service using [Dev Containers](https://containers.dev/). Bun is a fast all-in-one toolkit designed for developing, testing, running, and bundling JavaScript and TypeScript projects. Also included is a Bruno API collection for additional testing and adhoc API development. [Download Bruno here](https://www.usebruno.com/downloads) or view it as a part of your extensions when you launch the devcontainer.

## Launch

Open Docker Desktop to run the Docker daemon, a background process that manages and coordinates Docker containers on your system. On VS Code, start the development container by running `Dev Containers: Rebuild and Reopen In Container` in the command palette. It can be accessed with the keyboard shortcut `ctrl + shift + P` on your keyboard.

_Checkout the [bun docs](https://bun.sh/docs) or [devcontainer docs](https://containers.dev/overview) for more information!_

## Environment Variables

Please generate a `.env` file in the project root and in the `clever-api` folder (yes two places - I would need to refactor things to avoid the duplicate).
To do so, copy paste the `example.env` file added to the project. This will work just fine in local development.

## Install Dependencies

```bash
bun install
```

---

## Test

To run the test suite use:

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

The database service is automatically spun up when you launch the devcontainer. For advanced control, you can run the vscode task to connect via the `psql cli`. Otherwise, for feature rich data insights, you can connect through `drizzle-studio` via:

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
