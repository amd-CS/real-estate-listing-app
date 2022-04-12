const Ajv = require("ajv");
const ajv = new Ajv({
  allErrors: true,
  coerceTypes: true,
  useDefaults: "empty",
});

require("ajv-keywords")(ajv);
require("ajv-formats")(ajv);
require("ajv-errors")(ajv);

const postalPattern = /^[a-zA-Z]\d[a-zA-Z] ?\d[a-zA-Z]\d$/;
ajv.addFormat("postal-code", {
  validate: (code) => postalPattern.test(code),
});

ajv.addKeyword({
  keyword: "removeSpace",
  modifying: true,
  schema: true,
  validate: (schema, data, parentSchema, dataCtx) => {
    if (schema) {
      dataCtx.parentData[dataCtx.parentDataProperty] = data.replaceAll(" ", "");
    }
    return true;
  },
});

const propertyValidation = (req, res, next) => {
  let ajvSchema = {
    type: "object",
    properties: {
      city: {
        type: "string",
        minLength: 3,
        maxLength: 30,
      },

      "building-type": {
        type: "string",
        enum: ["House", "Townhouse", "Apartment"],
      },

      "postal-code": {
        type: "string",
        format: "postal-code",
        removeSpace: true,
      },

      beds: {
        type: "number",
        minimum: 0,
        maximum: 20,
      },

      baths: {
        type: "number",
        minimum: 1,
        maximum: 20,
      },

      "build-year": {
        type: "number",
        minimum: 1900,
        maximum: 2022,
      },

      size: {
        type: "number",
        minimum: 100,
        maximum: 100000,
      },

      price: {
        type: "number",
        minimum: 100000,
        maximum: 100000000,
      },
    },

    required: [
      "city",
      "building-type",
      "postal-code",
      "beds",
      "baths",
      "build-year",
      "size",
      "price",
    ],

    additionalProperties: true,
    errorMessage: {
      required: {
        city: "Please enter a city",
        "building-type": "Please enter a building type",
        "postal-code": "Please enter a postal code",
        beds: "Please enter beds",
        baths: "Please enter baths",
        "build-year": "Please enter a build year",
        size: "Please enter a size",
        price: "Please enter a price",
      },
    },
  };

  const validate = ajv.compile(ajvSchema);
  validate(req.body);

  if (validate.errors) res.status(422).json(validate.errors);
  else next();
};

module.exports = propertyValidation;
