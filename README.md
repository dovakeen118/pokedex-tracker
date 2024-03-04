# Pokédex Tracker

Stores data for Generation 1 of Pokémon from the [PokéAPI](https://pokeapi.co/).

## Overview

Basic information about each Pokémon is made available for users to learn more about their favorite Generation 1 Pokémon characters. More Pokémon data can easily be incorporated from the PokéAPI by modifying which attributes the `PokeApiSerializer` should filter for.
When viewing the detail page for a Pokémon, the Google Charts API library displays the statistics about that Pokémon.

### Technologies

- PostgreSQL
- Express
- React
- Passport

## Passport Authentication

When using this application you will need an `.env` file in the root of the `server` folder for Passport user authentication. Use the `example.env` for reference:

```env
SESSION_SECRET="123abc"
```

## Installation

Before starting the app, use `yarn` to install dependencies, create the database, and run the migrations from the `server` directory:

```sh
yarn install
cd server
createdb pokedex-tracker_development
yarn migrate:latest
```

## Seeding Pokémon Data

Pokémon information is queried from the PokéAPI and seeded into the internal Postgres database. Run the following command from the `server` folder to seed the database with the first 150 Pokémon:

```sh
yarn db:seed
```

_Note: As of writing the PokéAPI is open, does not require an API key for authentication, and does not have a rate limit. Information about Generation 1 Pokémon should never change, which is why the data is seeded for this implementation to respectfully limit request frequency._

## Usage

From the root app directory use the `yarn run dev` script to visit the application from <http://localhost:3000>

```sh
yarn run dev
```

## Future Features

- Paginate list of all Pokémon
- Include evolution information about each Pokémon (the Pokémon they evolved from, and the Pokémon they will evolve into)
- Implement snapshots for testing statistics rendered with Google Charts (https://github.com/meinaart/cypress-plugin-snapshots) (_library currently has an open issue where tests with this plugin will throw an error unless the test is run in isolation_)
