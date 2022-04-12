const router = require("express").Router({ mergeParams: true });

const {
  getProperties,
  getProperty,
  postProperty,
} = require("../controllers/propertyController");

const propertyValidation = require("../validation/propertyValidation");

router.get("/", getProperties);
router.get("/:id", getProperty);
router.post("/", propertyValidation, postProperty);

module.exports = router;
