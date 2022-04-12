const mongoose = require("mongoose");

const Schema = mongoose.Schema;

function validatePostal(postal) {
  const pattern = /^[a-zA-Z]\d[a-zA-Z]\d[a-zA-Z]\d$/;
  return pattern.test(postal);
}

const PropertySchema = new Schema({
  city: {
    type: String,
    minlength: 3,
    maxlength: 30,
    required: true,
  },

  "postal-code": {
    type: String,
    required: true,
    validate: validatePostal,
  },

  "building-type": {
    type: String,
    enum: ["House", "Townhouse", "Apartment"],
    required: true,
  },

  beds: {
    type: Number,
    min: 0,
    max: 20,
    required: true,
  },

  baths: {
    type: Number,
    min: 1,
    max: 20,
    required: true,
  },

  "build-year": {
    type: Number,
    min: 1900,
    max: 2022,
    required: true,
  },

  size: {
    type: Number,
    min: 100,
    max: 100000,
    required: true,
  },

  price: {
    type: Number,
    min: 100000,
    max: 100000000,
    required: true,
  },
});

const Property = mongoose.model("Property", PropertySchema);

module.exports = Property;
