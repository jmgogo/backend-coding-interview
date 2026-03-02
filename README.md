# Photography Backend

## Overview

This project is a lightweight TypeScript API designed to ingest and manage photo data from a `photos.csv` file. Please review [SETUP.md](./SETUP.md) for instructions on getting started. The architecture is intentionally structured to support fast, type-safe development, performance, and maintainability—all within a 2–6 hour time constraint.

## Architecture & Technical Decisions

Given the time-boxed nature of the challenge, the following stack was selected based on familiarity, development speed, and long-term maintainability.

### Runtime & Language

**TypeScript** was chosen for type safety and developer ergonomics.
**Bun** was selected for fast startup and execution, built-in TypeScript support, and its integrated test runner.

### Server Framework

One of my biggest concerns was handling authentication. Since I was already familiar with BetterAuth on Next.js, I looked for a backend framework that supported it. This lead me to **Hono**, which offers a minimal and clean API surface, similar to what I was already familiar with in Express. Its documentation is straightforward, and its quick-start guides made setup efficient.

Another major advantage is Hono's type safety. It is easy to scaffold routes for improved maintainability and readability. And it also helps that Hono pairs very well with Bun.

After reviewing Hono's authentication section, I was inspired to leverage JWTs since I did not need to manage user credentials such as usernames and passwords. I wanted to avoid using a third-party provider for the sake of this project and adding some environment secrets to manage the authentication process with JWT seemed like the best way to handle things.

### Database & ORM

I have most of my experience setting up environments with **PostgreSQL**, so I selected it as the database for my development environment. I also have extensive experience with **Drizzle ORM** and chose to leverage it for its strong TypeScript integration, SQL-first philosophy, clean schema definitions, and excellent developer experience. Additionally, I am comfortable running migrations and setting up lifecycle commands for seeding the database, resetting tables, and related tasks.

### API Validation

One of the primary reasons I stayed within the TypeScript ecosystem was **Zod**, which supports runtime type validation. It is a library I have used extensively to enforce strong input validation and proper handling of external data.

### Authentication Strategy

Authentication is handled using **JSON Web Tokens (JWTs)**. As mentioned previously, due to time constraints, I chose to avoid managing user credentials in the database. It felt like a reasonable assumption to use JWT-based authentication to protect routes that modify or delete data (POST, PUT, DELETE).

The intent was to provide a pragmatic security layer while avoiding unnecessary user management complexity within the time constraint. An additional mock route was added at `/auth/*` in case future requirements include credential verification.

### API Testing & Documentation

To kick off the project, I began by writing TODOs to scaffold requirements for the `photographers/*` and `photos/*` routes. The next thing I worked on was the JWT authentication flow. One of my preferred tools for API development is the Bruno client. Bruno has a built-in test runner and provides excellent insights into the request timeline during local development. A major advantage of Bruno is that it is file-based, meaning collections and tests are version-controlled via Git. This makes it easy for developers to run and validate API requests.

Most of the tests I outlined are still marked as TODO. The intention is to test the API using either the **Bun test runner** or **Bruno**.

```sh
bun test
```

#### Bruno API Client

Note: Make sure to copy the `.env` file into the `clever-api` folder, which houses all Bruno files. I also added the Bruno extension for VS Code so developers can test the API without leaving their editor. Before making requests, ensure that the `local` environment I created in Bruno is selected.

A recommended workflow is to first make a request to the `/login` endpoint, which returns a JWT and sets it in the API client as a cookie. This `token` variable is then included in subsequent requests via the Authorization header. There are two `POST` requests in the Bruno collection that should fail if this token is missing.

#### Bun Test Runner

To run the tests:

```sh
bun test
```

Note: I did not get very far with automated tests, but I did write a setup script intended to retrieve a JWT for the remaining test cases.

## Feature Priorities

My first priority was creating a **unified development environment**. To accomplish this, I created a devcontainer configured with Bun, a PostgreSQL service, and relevant VS Code extensions to minimize onboarding friction.

Next, I mocked up some unit tests as requirements with Bun to support future Test Driven API development.

With that foundation in place, I set up the backend using Drizzle and PostgreSQL, along with lifecycle scripts and connection configurations integrated into the devcontainer for local development. This included defining the database schema, running migrations, and seeding the database with data from the `photos.csv` file.

Once the data layer was established, I implemented basic routes using Hono. My next priority was adding authentication to the routes, using Bruno to troubleshoot and validate the JWT flow. I verified the authentication logic and secured privileged routes (POST, PUT, DELETE ). Afterward, I refactored the API route folder structure to improve maintainability.

Finally, I converted some of the TODO tests into passing tests. With additional time, I would continue expanding test coverage. 😉

## Assumptions

- The system does not manage user accounts.
- Email and password storage is not required.
- JWTs protect update and destructive operations.
- Read-only (GET) routes are publicly accessible.
- The `photos.csv` file defines initial database schema expectations.

## Future Improvements

- Implement a full user system with credential management and RBAC (if necessary).
- Add pagination and filtering to GET requests.
- Validate test requirements and improve coverage.
- Improve API documentation (Hono can generate an OpenAPI specification).
