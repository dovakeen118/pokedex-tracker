/* eslint-disable no-console */
import { connection } from "../boot.js";

import PokemonSeeder from "./seeders/PokemonSeeder.js";

class Seeder {
  static async seed() {
    console.log("Seeding Pokemon...");
    await PokemonSeeder.seed();

    console.log("Done!");
    await connection.destroy();
  }
}

export default Seeder;
