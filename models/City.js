const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CitySchema = new Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 30,
    required: true,
  },

  population: {
    type: Number,
    min: 10000,
    max: 10000000,
    required: true,
  },

  properties: [{ type: Schema.Types.ObjectId, ref: "Property" }],
});

const City = mongoose.model("City", CitySchema);

module.exports = City;
