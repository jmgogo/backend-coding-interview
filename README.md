# Photography Backend

## Overview

This project is a lightweight TypeScript API designed to ingest and manage photo data from a `photos.csv` file. Please review [SETUP.md](./SETUP.md) for information on getting started. The architecture is intentionally setup to support speed type-safe development, performance, and maintainability, all setup within a 2–6 hour time constraint.

## Architecture & Technical Decisions

Given the time-boxed nature of the challenge, the following stack was selected based on familiarity, development speed, and long-term maintainability.

### Runtime & Language

**TypeScript** for type safety and developer ergonomics. **Bun** for fast startup and execution, built-in TypeScript support and test runner.

### Server Framework

One of my biggest concerns was how to handle authentication. And since I was already familiar with BetterAuth on Next.js, I decided to look for a backend framework that supported it.**Hono** was selected because it offers a minimal and clean API surface that seemed similar to what I was already familiar with on Express. It's documentation seemed straightforward and it's quick-start guides made setup efficient.

Notably, Hono seems to pair very nicely with Bun. Reviewing their authentication section, I was actually inspired to leverage JWTs since I didn't have to manage user credentials like a username and password.

Another big plus is Hono's Type safety. It is also easy to scaffold routes into different folders for maintainability and readability.

### Database & ORM

I had experience setting up dev environments with **PostgreSQL**, so I thought it would be the best choice to select it as my database. I also have a lot of experience with **Drizzle ORM** and I decided to leverage it for its strong TypeScript integration, SQL-first philosophy, clean schema definitions, and excellent developer experience. It also helps that I am familiar with running migrations and setting up lifecycle commands for seeding the database, resetting tables, etc...

### API Validation

Probably one of the biggest reasons I stayed in the Typescript ecosystem was **Zod**, which support runtime type validation. It's a library I've used extensively to enforce strong input validation and handling from external sources.

### Authentication Strategy

Authentication is handled using **JSON Web Tokens (JWT)**. I decided to avoid managing user credentials in the database based on the time limitations. I thought it would be a safe assumption to use JWT-based authentication to protect routes with methods that would (modify / delete) data: (POST, PUT, DELETE).

The intent was to provide a pragmatic security layer while avoiding unnecessary user management complexity within the time constraint. An additional mock route was added as `/auth/*` in case future needs warranted credential verification for any request.

### API Testing & Documentation

To kick of the project, I decided to just write some todos so I could scaffold some requirements for the `photographers/*` and `photos/*` routes. But I need a good way to test the auth process via JWT. One of my favorite tools for the job is the Bruno API client. Bruno has a built in test runner and I like to use it for local development because of its great insights into the request timeline. Probably one of the strongest reasons to use Bruno is that it is file-based, so Collections and tests are version-controlled via Git. It allows developers to easily run and validate API requests.

Most of the test I laid out are still left todo. But the intent would be to testing the API via either the **Bun Test Runner** or **Bruno**. (Note)
bun test

#### Bruno API Client

Make sure you copy the `.env` file into the `clever-api` folder which houses all the bruno files. I added the Bruno extension on vscode so other developers can test the API without leaving their editor. You'll want to make sure that you select the `local` environment I created on Bruno before making requests.

A good workflow to try is making a request to the `/login` endpoint which returns the JWT and sets it in the API client as a cookie. This `token` variable is added in all requests following in the Authorization header. There are two `POST` requests in the Bruno collection that should fail if this token is missing.

#### Bun Test Runner

To run the tests in bun. I didn't get to far here, but I did write a setup script to try to get a JWT for remaining tests.

```sh
bun test
```

## Feature Priorities

My first priority was creating a **unified development environment**. To do so, I created a devcontainer for Bun with a postgreSQL service and relevant extensions for vscode to provide minimal onboarding friction.

The next thing on my bucket list was mocking up some unit tests with Bun that would be saved for future API development.

With that outlined, I worked on setting up the backend with Drizzle, and PostgreSQL along with all the lifecycle scripts and connection configurations added in my devcontainer to manage the backend in local development. This included work to setup the database schema, running a migration, and seeding the database with the `photos.csv` file.

With data in the backend, I setup some basic routes on Hono. My next priority was adding authentication to the routes which I used Bruno to troubleshoot. I verified authentication logic and secured privileged routes. Thereafter, I refactored the folder structure on the API routes for better maintainability.

Finally, I turned some of those todo tests green. With more time, the intent would be to continue doing so moving forward.

## Assumptions

- The system does not manage user accounts.
- Email/password storage is not necessary.
- JWT protects update / destructive operations.
- Read-only (GET) routes are publicly accessible.
- The photos.csv file defines initial db schema expectations.

## Future Improvements

- Full user system with credential management and RBAC (If necessary)
- GET request pagination and filtering
- Validate test requirements and improve coverage
- Better API documentation. (Hono can generate an open API spec which is nice)
