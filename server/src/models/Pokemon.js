const Model = require("./Model");

class Pokemon extends Model {
  static get tableName() {
    return "pokemon";
  }
}

module.exports = Pokemon;
