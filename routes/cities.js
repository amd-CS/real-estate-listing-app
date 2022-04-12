const router = require("express").Router({ mergeParams: true });

const {
  getCities,
  getCity,
  postCity,
} = require("../controllers/cityController");

const cityValidation = require("../validation/cityValidation");

router.get("/", getCities);
router.get("/:id", getCity);
router.post("/", cityValidation, postCity);

module.exports = router;
