const Ajv = require("ajv");
const ajv = new Ajv({
  allErrors: true,
  coerceTypes: true,
  useDefaults: "empty",
});

require("ajv-keywords")(ajv);
require("ajv-formats")(ajv);
require("ajv-errors")(ajv);

const cityValidation = (req, res, next) => {
  let ajvSchema = {
    type: "object",
    properties: {
      name: {
        type: "string",
        minLength: 3,
        maxLength: 30,
      },

      population: {
        type: "number",
        minimum: 10000,
        maximum: 10000000,
      },
    },

    required: ["name", "population"],

    additionalProperties: true,
    errorMessage: {
      required: {
        name: "Please enter a name",
        population: "Please enter population",
      },
    },
  };

  const validate = ajv.compile(ajvSchema);
  validate(req.body);

  if (validate.errors) res.status(422).json(validate.errors);
  else next();
};

module.exports = cityValidation;
